from dtos.vehicle import Vehicle
from dtos.location import Location
from dtos.ride import Ride

def parse_response_to_vehicle(response):
    vehicle_id = response["vehicleId"]
    driver_id = response["driverId"]
    location = parse_response_to_location(response)
    active_vehicle = Vehicle(vehicle_id, driver_id, location)
    return active_vehicle

def parse_response_to_location(response, active_ride = False):
    if active_ride:
        address = response["address"]
        latitude = response["latitude"]
        longitude = response["longitude"]
    else:
        address = response["currentLocation"]["address"]
        latitude = response["currentLocation"]["latitude"]
        longitude = response["currentLocation"]["longitude"]
    location = Location(address, latitude, longitude)
    return location

def parse_response_to_ride(response):
    id = response["id"]
    locations = response["locations"]
    departure = parse_response_to_location(locations[0]["departure"], True)
    destination = parse_response_to_location(locations[0]["destination"], True)
    scheduled_time = response["scheduledTime"]
    status = response["status"]
    ride = Ride(id, departure, destination, scheduled_time, status)
    return ride