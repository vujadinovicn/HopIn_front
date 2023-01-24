class Vehicle():

    def __init__(self, id, current_location):
        self.__id = id
        self.__current_location = current_location

    @property
    def id(self):
        return self.__id

    @id.setter
    def id(self, id):
        self.__id = id

    @property
    def current_location(self):
        return self.__current_location

    @current_location.setter
    def current_location(self, current_location):
        self.__current_location = current_location

    def __str__(self):
        return "id: " + str(self.id) + ", current location: " + str(self.current_location)