from location import Location

class Ride():

    def __init__(self, id, departure: Location, destination: Location, scheduled_time, status):
        self.__id = id
        self.__departure = departure
        self.__destination = destination
        self.__scheduled_time = scheduled_time
        self.__status = status
    
    @property
    def id(self):
        return self.__id

    @id.setter
    def id(self, id):
        self.__id = id

    @property
    def departure(self):
        return self.__departure

    @departure.setter
    def departure(self, departure):
        self.__departure = departure

    @property
    def destination(self):
        return self.__destination

    @destination.setter
    def destination(self, destination):
        self.__destination = destination

    @property
    def scheduled_time(self):
        return self.__scheduled_time

    @scheduled_time.setter
    def scheduled_time(self, scheduled_time):
        self.__scheduled_time = scheduled_time

    @property
    def status(self):
        return self.__status

    @status.setter
    def status(self, status):
        self.__status = status

    def __str__(self):
        return "departure: " + str(self.departure) + " destination: " + str(self.destination) + " time: " + self.scheduled_time + " status: " + self.status 