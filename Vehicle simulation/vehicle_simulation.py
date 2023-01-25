import requests
import schedule
import time
from vehicle import Vehicle
from vehicle_in_ride import VehicleInRide
from response_parsers import parse_response_to_vehicle
from location import CurrentLocation

active_vehicles = []
vehicles_in_ride = []

def get_active_vehicles_json():
    get_active_vehicles_request = requests.get(url="http://localhost:4321/api/driver/active-vehicles")
    active_vehicles_json = get_active_vehicles_request.json()

    add_vehicles_to_lists(active_vehicles_json)
    remove_vehicles_from_lists(active_vehicles_json)

    for vehicle in active_vehicles:
        print(vehicle)
    print("#################")

def add_vehicles_to_lists(active_vehicles_json):
    for i in range(len(active_vehicles_json)):
        active_vehicle_json = active_vehicles_json[i]
        if not is_vehicle_already_in_active_vehicles(active_vehicle_json, active_vehicles):
            new_vehicle = parse_response_to_vehicle(active_vehicle_json)
            active_vehicles.append(new_vehicle)
            vehicles_in_ride.append(VehicleInRide(new_vehicle))

def remove_vehicles_from_lists(active_vehicles_json):
    deactivated_vehicles_id = get_deactivated_vehicles_id(active_vehicles, active_vehicles_json)
    for id in deactivated_vehicles_id:
        index = get_index_by_id_from_active_vehicles(id, active_vehicles)
        del active_vehicles[index]
        del vehicles_in_ride[index]

def is_vehicle_already_in_active_vehicles(vehicle_json, active_vehicles):
    id = vehicle_json["id"]
    for active_vehicle in active_vehicles:
        if id == active_vehicle.id:
            return True
    return False

def get_deactivated_vehicles_id(active_vehicles, active_vehicles_json):
    old_active_vehicles_id = [vehicle.id for vehicle in active_vehicles]
    new_active_vehicles_id = [vehicle["id"] for vehicle in active_vehicles_json]
    return set(old_active_vehicles_id)-set(new_active_vehicles_id)

def get_index_by_id_from_active_vehicles(id, active_vehicles):
    index = 0
    for vehicle in active_vehicles:
        if not vehicle.id == id:
            index += 1
        else:
            return index

def simulate():
    for vehicle in vehicles_in_ride:
        vehicle.update_vehicle_coordinates()

schedule.every(2).seconds.do(get_active_vehicles_json)
schedule.every(2).seconds.do(simulate)

get_active_vehicles_json()
while True:
    schedule.run_pending()
    time.sleep(1)

#currentList: [1, 2, 3]
#responseJson: [1,2,3,4] -> new list: [1,2,3,4]
#responseJson: [1,3,4]