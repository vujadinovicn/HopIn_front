from dtos.location import Location

class Vehicle():

    def __init__(self, vehicle_id,  driver_id, current_location: Location):
        self.__vehicle_id = vehicle_id
        self.__driver_id = driver_id
        self.__current_location = current_location

    @property
    def vehicle_id(self):
        return self.__vehicle_id

    @vehicle_id.setter
    def vehicle_id(self, vehicle_id):
        self.__vehicle_id = vehicle_id

    @property
    def driver_id(self):
        return self.__driver_id

    @driver_id.setter
    def driver_id(self, driver_id):
        self.__driver_id = driver_id

    @property
    def current_location(self):
        return self.__current_location

    @current_location.setter
    def current_location(self, current_location):
        self.__current_location = current_location

    def __str__(self):
        return "vehicle id: " + str(self.vehicle_id) + "driver id: " + str(self.driver_id) + ", current location: " + str(self.current_location)