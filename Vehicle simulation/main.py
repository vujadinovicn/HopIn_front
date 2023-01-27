import schedule
import time
from api.active_vehicles import vehicles_in_ride, get_active_vehicles_json
from api.driver_login import login

def simulate_ride():
    for vehicle in vehicles_in_ride:
        vehicle.simulate_ride()

schedule.every(2).seconds.do(get_active_vehicles_json)
schedule.every(2).seconds.do(simulate_ride)

login()

while True:
    schedule.run_pending()
    time.sleep(1)