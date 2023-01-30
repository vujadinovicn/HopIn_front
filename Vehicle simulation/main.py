import schedule
import time
from api.active_vehicles import vehicles_in_ride, get_active_vehicles_json
from api.driver_login import login
from simulation.schedule_methods import schedule_fixed_rate

def simulate_ride():
    for vehicle in vehicles_in_ride:
        vehicle.simulate_ride()

schedule.every(schedule_fixed_rate).seconds.do(get_active_vehicles_json)
schedule.every(schedule_fixed_rate).seconds.do(simulate_ride)

login()

while True:
    schedule.run_pending()
    time.sleep(1)