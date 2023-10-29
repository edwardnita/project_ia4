import requests

# Replace with your actual latitude, longitude, and API key
lat = '45'
lon = '25'
api_key = '09047bbead0c6a581c47bd8941a0b548'

# Construct the API URL with the provided parameters
url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}'

# Send a GET request to the API
response = requests.get(url)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    data = response.json()
    # You can now work with the data in the 'data' variable
    print(data)
else:
    print(f"Request failed with status code {response.status_code}")