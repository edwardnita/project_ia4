#transforma coordonatele in locatie
from geopy.geocoders import Nominatim

# calling the nominatim tool
geoLoc = Nominatim(user_agent="GetLoc")

# passing the coordinates
locname = geoLoc.reverse("44.274474, 25.528208")

# printing the address/location name
print(locname)
