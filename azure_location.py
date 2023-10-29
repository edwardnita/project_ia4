from geopy.geocoders import Nominatim


def get_location():
    # Initialize the geolocator
    geolocator = Nominatim(user_agent="my_location_app")

    try:
        # Get the location based on the IP address
        location = geolocator.geocode("my location", timeout=10)

        if location:
            latitude, longitude = location.latitude, location.longitude
            print(f"Latitude: {latitude}, Longitude: {longitude}")
        else:
            print("Location not found.")
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    get_location()
