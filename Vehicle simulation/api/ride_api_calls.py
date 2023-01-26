import requests

def is_vehicle_in_ride(driverId):
        response = requests.get("http://localhost:4321/api/ride/driver/" + str(driverId) + "/accepted-started")
        if response.status_code == 200:
            return True, response.json()
        return False, None

def has_ride_started(rideId):
        response = requests.get("http://localhost:4321/api/ride/" + str(rideId))
        if response.status_code == 200 and response.json()["status"] == "STARTED":
            return True
        return False

def is_ride_finished(rideId):
    response = requests.get("http://localhost:4321/api/ride/" + str(rideId))
    if response.status_code == 200 and response.json()["status"] == "FINISHED":
        return True
    return False