import googlemaps
import datetime
import polyline
import requests
from random import randrange

gmaps = googlemaps.Client(key="AIzaSyADf7wmEupGmb08OGVJR1eNhvtvF6KYuiM")

start_and_end_points = [
    (45.235866, 19.807387),     # Djordja Mikeša 2
    (45.247309, 19.796717),     # Andje Rankovic 2
    (45.259711, 19.809787),     # Veselina Maslese 62
    (45.261421, 19.823026),     # Jovana Hranilovica 2
    (45.265435, 19.847805),     # Bele njive 24
    (45.255521, 19.845071),     # Njegoseva 2
    (45.249241, 19.852152),     # Stevana Musica 20
    (45.242509, 19.844632),     # Boska Buhe 10A
    (45.254366, 19.861088),     # Strosmajerova 2
    (45.223481, 19.847990)      # Gajeva 2
]

taxi_stops = [
    (45.265254, 19.830832),   # Stajaliste na Z stanici
    (45.253574, 19.862451),   # Stajaliste na djavi
    (45.235773, 19.827446),   # Stajaliste Ive Andrica Telep
    (45.259048, 19.837329),   # Stajaliste na Zitnom trgu
    (45.246540, 19.849282)    # Stajaliste kod menze
]

class VehicleInRide():

    def __init__(self, vehicle):
        random_taxi_stop_index = randrange(0, len(taxi_stops))
        self.previous_taxi_stop_index = random_taxi_stop_index
        random_taxi_stop = taxi_stops[random_taxi_stop_index]
        self.vehicle = vehicle
        self.driving_to_start_point = False
        self.driving_the_route = False
        self.driving_to_taxi_stop = True
        self.departure = self.vehicle.get_coordinates()
        #self.destination = start_and_end_points.pop(randrange(0, len(start_and_end_points)))
        self.destination = random_taxi_stop
        self.get_new_coordinates()


    def update_vehicle_coordinates(self):
        if len(self.coordinates) > 0:
            new_coordinates = self.coordinates.pop(0)
            requests.put("http://localhost:4321/api/vehicle/" + str(self.vehicle.vehicle_id) + "/location", json={
                'address': "random", 
                'latitude': new_coordinates[0],
                'longitude': new_coordinates[1]
            })
            self.vehicle.current_location.latitude = new_coordinates[0]
            self.vehicle.current_location.longitude = new_coordinates[1]
        elif len(self.coordinates) == 0 and self.driving_to_start_point:
            self.departure = self.destination
            while (self.departure[0] == self.destination[0]):
                self.destination = start_and_end_points.pop(randrange(0, len(start_and_end_points)))
            self.get_new_coordinates()
            self.driving_to_start_point = False
            self.driving_the_route = True
        elif len(self.coordinates) == 0 and self.driving_the_route:
            random_taxi_stop = taxi_stops[randrange(0, len(taxi_stops))]
            start_and_end_points.append(self.departure)
            self.departure = self.destination
            self.destination = random_taxi_stop
            self.get_new_coordinates()
            self.driving_the_route = False
            self.driving_to_taxi_stop = True
        elif len(self.coordinates) == 0 and self.driving_to_taxi_stop:
            random_taxi_stop_index = randrange(0, len(taxi_stops))
            if random_taxi_stop_index == self.previous_taxi_stop_index:
                random_taxi_stop_index = (random_taxi_stop_index + 1) % len(taxi_stops)
            random_taxi_stop = taxi_stops[random_taxi_stop_index]
            #start_and_end_points.append(self.departure)
            # self.departure = random_taxi_stop
            self.departure = self.vehicle.get_coordinates()
            self.destination = random_taxi_stop
            self.get_new_coordinates()

            #obrni posle
            self.driving_to_taxi_stop = True
            self.driving_to_start_point = False

    def get_new_coordinates(self):
        departure_to_string = ', '.join(str(coordinate) for coordinate in self.departure)
        destination_to_string = ', '.join(str(coordinate) for coordinate in self.destination)
        print(destination_to_string)

        directions_result = gmaps.directions(departure_to_string,
                                            destination_to_string,
                                            mode="transit",
                                            arrival_time=datetime.datetime.now() + datetime.timedelta(minutes=5))

        decoded_polyline = polyline.decode(directions_result[0]["legs"][0]["steps"][0]['polyline']["points"], 5)
        self.coordinates = []
        for coordinate in decoded_polyline:
            self.coordinates.append(coordinate)