class CurrentLocation():

    def __init__(self, address, latitude, longitude):
        self.__address = address
        self.__latitude = latitude
        self.longitude = longitude

    @property
    def address(self):
        return self.__address

    @address.setter
    def address(self, address):
        self.__address = address


    @property
    def latitude(self):
        return self.__latitude

    @latitude.setter
    def latitude(self, latitude):
        self.__latitude = latitude


    @property
    def longitude(self):
        return self.__longitude

    @longitude.setter
    def longitude(self, longitude):
        self.__longitude = longitude

    def __str__(self):
        return "address: " + self.address + ", latitude: " + str(self.latitude) + ", longitude: " + str(self.longitude)