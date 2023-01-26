import googlemaps
import datetime
import polyline
import requests

from random import randrange
from ride import Ride
from response_parsers import parse_response_to_ride

gmaps = googlemaps.Client(key="AIzaSyADf7wmEupGmb08OGVJR1eNhvtvF6KYuiM")

taxi_stops = [
    (45.265254, 19.830832),   # Stajaliste na Z stanici
    (45.253574, 19.862451),   # Stajaliste na djavi
    (45.235773, 19.827446),   # Stajaliste Ive Andrica Telep
    (45.259048, 19.837329),   # Stajaliste na Zitnom trgu
    (45.246540, 19.849282)    # Stajaliste kod menze
]

taxi_stop_waiting_in_seconds = 15

class VehicleInRide():

    def __init__(self, vehicle):
        self.vehicle = vehicle
        self.current_ride = None
        self.wait_on_taxi_stop_counter = 0
        self.previous_taxi_stop_index = 0

        is_vehicle_in_ride, current_ride_json = self.is_vehicle_in_ride()
        if is_vehicle_in_ride:
            self.set_attributes_for_current_ride(current_ride_json)
            print("Driving the ride...: " + self.get_address_from_coordinates(self.current_ride.departure.get_coordinates()) + " -> " + self.get_address_from_coordinates(self.current_ride.destination.get_coordinates()))
        else:
            print("Driving between taxi stops...")
            self.set_attributes_for_ride_between_taxi_stops()

        self.departure = self.vehicle.current_location.get_coordinates()
        self.get_new_coordinates_from_points_of_polyline()

    def set_driving_flags(self, driving_to_start_point, driving_the_route, driving_to_taxi_stop):
        self.driving_to_start_point = driving_to_start_point
        self.driving_the_route = driving_the_route
        self.driving_to_taxi_stop = driving_to_taxi_stop

    def set_attributes_for_current_ride(self, current_ride_json):
        self.current_ride = parse_response_to_ride(current_ride_json)
        if (self.current_ride.status == "ACCEPTED"):
            self.set_attributes_for_accepted_ride()
        else: 
            self.set_attributes_for_started_ride()

    def set_attributes_for_accepted_ride(self):
        self.set_driving_flags(driving_to_start_point=True, driving_the_route=False, driving_to_taxi_stop=False)
        self.destination = self.current_ride.departure.get_coordinates()

    def set_attributes_for_started_ride(self):
        self.set_driving_flags(driving_to_start_point=False, driving_the_route=True, driving_to_taxi_stop=False)
        self.destination = self.current_ride.destination.get_coordinates()

    def set_attributes_for_ride_between_taxi_stops(self):
        self.set_driving_flags(driving_to_start_point=False, driving_the_route=False, driving_to_taxi_stop=True)
        self.destination = self.select_random_taxi_stop()

    def select_random_taxi_stop(self):
        random_taxi_stop_index = randrange(0, len(taxi_stops))
        if random_taxi_stop_index == self.previous_taxi_stop_index:
                random_taxi_stop_index = (random_taxi_stop_index + 1) % len(taxi_stops)
        self.previous_taxi_stop_index = random_taxi_stop_index
        random_taxi_stop = taxi_stops[random_taxi_stop_index]
        print("Going to taxi stop: " + self.get_address_from_coordinates(random_taxi_stop))
        return random_taxi_stop

    def is_vehicle_in_ride(self):
        response = requests.get("http://localhost:4321/api/ride/driver/" + str(self.vehicle.driver_id) + "/accepted-started")
        if response.status_code == 200:
            return True, response.json()
        return False, None

    def simulate_ride(self):
        is_vehicle_in_ride, current_ride_json = self.is_vehicle_in_ride()

        if is_vehicle_in_ride and self.current_ride == None:
            self.set_attributes_for_current_ride(current_ride_json)
            self.departure = self.vehicle.current_location.get_coordinates()
            self.get_new_coordinates_from_points_of_polyline()
            print("New ride came! Have to turn around...: " + self.get_address_from_coordinates(self.current_ride.departure.get_coordinates()) + " -> " + self.get_address_from_coordinates(self.current_ride.destination.get_coordinates()))
        
        self.update_vehicle_coordinates()

    def update_vehicle_coordinates(self):
        if len(self.coordinates) > 0:
            new_coordinates = self.coordinates.pop(0)
            address = self.get_address_from_coordinates(new_coordinates)
            requests.put("http://localhost:4321/api/vehicle/" + str(self.vehicle.vehicle_id) + "/location", json={
                'address': address, 
                'latitude': new_coordinates[0],
                'longitude': new_coordinates[1]
            })
            self.vehicle.current_location.set_coordinates(new_coordinates)
            return

        elif len(self.coordinates) == 0 and self.driving_to_start_point:
            print("Came to departure!" + "\n" + "Going to destination...")
            self.set_new_departure_and_destination(departure=self.destination, destination=self.current_ride.destination.get_coordinates())
            self.set_driving_flags(driving_to_start_point=False, driving_the_route=True, driving_to_taxi_stop=False)
            self.get_new_coordinates_from_points_of_polyline()

        elif len(self.coordinates) == 0 and self.driving_the_route:
            print("Came to destination!")
            self.current_ride = None
            self.set_new_departure_and_destination(departure=self.destination, destination=self.select_random_taxi_stop())
            self.set_driving_flags(driving_to_start_point=False, driving_the_route=False, driving_to_taxi_stop=True)
            self.get_new_coordinates_from_points_of_polyline()

        elif len(self.coordinates) == 0 and self.driving_to_taxi_stop:   
            if not self.is_wait_on_taxi_stop_finished():
                print("Currently on wait on taxi stop... Wait for " + str(taxi_stop_waiting_in_seconds - self.wait_on_taxi_stop_counter) + "s...")
                return
            self.set_new_departure_and_destination(departure=self.vehicle.current_location.get_coordinates(), destination=self.select_random_taxi_stop())
            self.set_driving_flags(driving_to_start_point=False, driving_the_route=False, driving_to_taxi_stop=True)
            self.get_new_coordinates_from_points_of_polyline()


    def set_new_departure_and_destination(self, departure, destination):
        self.departure = departure
        self.destination = destination

    def is_wait_on_taxi_stop_finished(self):
        self.wait_on_taxi_stop_counter += 1
        if self.wait_on_taxi_stop_counter == taxi_stop_waiting_in_seconds:
            self.wait_on_taxi_stop_counter = 0
            return True
        return False

    def get_new_coordinates_from_points_of_polyline(self):
        departure_to_string = ', '.join(str(coordinate) for coordinate in self.departure)
        destination_to_string = ', '.join(str(coordinate) for coordinate in self.destination)
        directions_result = gmaps.directions(departure_to_string,
                                            destination_to_string,
                                            mode="transit",
                                            arrival_time=datetime.datetime.now() + datetime.timedelta(minutes=5))

        decoded_polyline = polyline.decode(directions_result[0]["legs"][0]["steps"][0]['polyline']["points"], 5)
        self.coordinates = []
        for coordinate in decoded_polyline:
            self.coordinates.append(coordinate)

    def get_address_from_coordinates(self, new_coordinates):
        reverse_geocode_result = gmaps.reverse_geocode(new_coordinates)
        return reverse_geocode_result[0]["formatted_address"]
