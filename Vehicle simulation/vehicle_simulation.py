import requests
import schedule
import time
from vehicle import Vehicle
from response_parsers import parse_response_to_vehicle
from location import CurrentLocation

active_vehicles = []

def get_active_vehicles_json():
    active_vehicles_request = requests.get(url="http://localhost:4321/api/driver/active-vehicles")
    active_vehicles_json = active_vehicles_request.json()
    for i in range(len(active_vehicles_json)):
        active_vehicle = parse_response_to_vehicle(active_vehicles_json[i])
        active_vehicles.append(active_vehicle)

# schedule.every(2).seconds.do(get_active_vehicles_json)

# while True:
    # schedule.run_pending()
    # time.sleep(1)

get_active_vehicles_json()
for vehicle in active_vehicles:
    print(vehicle)