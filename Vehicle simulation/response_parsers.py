from vehicle import Vehicle
from location import CurrentLocation

def parse_response_to_vehicle(response):
    vehicle_id = response["vehicleId"]
    driver_id = response["driverId"]
    address = response["currentLocation"]["address"]
    latitude = response["currentLocation"]["latitude"]
    longitude = response["currentLocation"]["longitude"]
    location = CurrentLocation(address, latitude, longitude)
    active_vehicle = Vehicle(vehicle_id, driver_id, location)
    return active_vehicle