from vehicle import Vehicle
from location import CurrentLocation

def parse_response_to_vehicle(response):
    id = response["id"]
    address = response["currentLocation"]["address"]
    latitude = response["currentLocation"]["latitude"]
    longitude = response["currentLocation"]["longitude"]
    location = CurrentLocation(address, latitude, longitude)
    active_vehicle = Vehicle(id, location)
    return active_vehicle