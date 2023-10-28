# #transforma locatia in coordonate
# import requests
#
# api_key = '09047bbead0c6a581c47bd8941a0b548'
# city_name = 'Videle'
# url = f'http://api.openweathermap.org/geo/1.0/direct?q={city_name}&limit=2&appid={api_key}'
#
# response = requests.get(url)
#
# data = response.json()
#
# lat = data[0]['lat']
# lon = data[0]['lon']
#
# print(f"latitude is {lat}")
# print(f"longitude is {lon}")


import requests

# Define the API URL
api_url = "http://api.positionstack.com/v1/forward"

# Define your API access key and query parameters
params = {
    "access_key": "28cb994c15f9b6a59d1671a4d1e0461a",
    "query": "Predeal"
}

# Send the GET request
response = requests.get(api_url, params=params)

# Check if the request was successful
if response.status_code == 200:
    # Parse the JSON response
    data = response.json()
    # You can now work with the data returned by the API
    print(data)
else:
    # Handle the request error
    print(f"Request failed with status code {response.status_code}")
    print(response.text)