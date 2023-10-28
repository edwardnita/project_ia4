# imi da locatia curenta
import requests

api_key = 'ce79228efa431817ef45934ed5dfad00'
def get_location():
    # Replace 'YOUR_API_KEY' with your actual ipstack API key

    ipstack_url = f'http://api.ipstack.com/check?access_key={api_key}'

    try:
        response = requests.get(ipstack_url)
        data = response.json()

        if 'latitude' in data and 'longitude' in data:
            latitude = data['latitude']
            longitude = data['longitude']
            city = data['city']
            country = data['country_name']

            print(f'Your current location: {latitude}, {longitude} in {city}, {country}')
        else:
            print('Unable to retrieve location information.')

    except Exception as e:
        print(f'Error: {e}')

# Call the function with your ipstack API key
get_location()

# import requests
#
# url = 'https://timezoneapi.io/api/ip/?token=aOymUlzMGzRoPNvcFmhe'
#
# response = requests.get(url)
#
# print(response.json())