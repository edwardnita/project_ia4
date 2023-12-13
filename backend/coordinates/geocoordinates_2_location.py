#transforma coordonatele in locatie
from geopy.geocoders import Nominatim

# calling the nominatim tool
geoLoc = Nominatim(user_agent="GetLoc")

# passing the coordinates
locname = geoLoc.reverse("44.43655014038086, 26.099349975585938")

# printing the address/location name
print(locname)
