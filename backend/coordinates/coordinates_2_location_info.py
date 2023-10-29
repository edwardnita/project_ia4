# date despre poluarea intr-o locatie primind coordonatele
import requests
import json

# Define the URL and payload
api_key = 'AIzaSyAD1KCCoKf_NpcFpJ1Q0Y5AINHeMRgExpo'
url = f'https://airquality.googleapis.com/v1/currentConditions:lookup?key={api_key}'

data = {
    "universalAqi": True,
    "location": {
        "latitude": 37.419734,
        "longitude": -122.0827784
    },
    "extraComputations": [
        "HEALTH_RECOMMENDATIONS",
        "DOMINANT_POLLUTANT_CONCENTRATION",
        "POLLUTANT_CONCENTRATION",
        "LOCAL_AQI",
        "POLLUTANT_ADDITIONAL_INFO"
    ],
    "languageCode": "en"
}

headers = {
    'Content-Type': 'application/json'
}

# Make the POST request
response = requests.post(url, data=json.dumps(data), headers=headers)

# Check the response
if response.status_code == 200:
    # Request was successful
    response_data = response.json()
    print(response_data)
else:
    # Request failed
    print(f"Request failed with status code: {response.status_code}")
    print(response.text)