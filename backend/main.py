from flask import Flask, request
from flask_cors import CORS, cross_origin
import os
import requests
from googleapiclient.discovery import build
from datetime import datetime, timedelta, timezone
import json

app = Flask(__name__)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = 'sunt-smecher'
os.environ["OPENAI_API_KEY"] = "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"

ipstack_api_key = 'ce79228efa431817ef45934ed5dfad00'
ipstack_url = f'http://api.ipstack.com/check?access_key={ipstack_api_key}'
city = 'Bucuresti'
country = 'Romania'
location_lat = '44'
location_lon = '26'

try:
    response = requests.get(ipstack_url)
    data = response.json()
    print("hi mom")
    if 'latitude' in data and 'longitude' in data:
        location_lat = data['latitude']
        location_lon = data['longitude']
        city = data['city']
        country = data['country_name']

        print(f'Your current location: {location_lat}, {location_lon} in {city}, {country}')
    else:
        print('Unable to retrieve location information.')

except Exception as e:
    print(f'Error: {e}')

google_maps_api_key = 'AIzaSyAD1KCCoKf_NpcFpJ1Q0Y5AINHeMRgExpo'

start_time = datetime.utcnow()
end_time = start_time + timedelta(days=7)

calendar_id = 'radualaur09022003@gmail.com'  # 'primary' is the default calendar ID for the user's primary calendar

    # Build the Google Calendar API service
service = build('calendar', 'v3', developerKey=google_maps_api_key)

events = []
events_info = []

try:
        # List events within the specified time range
    events_result = service.events().list(
        calendarId=calendar_id,
        timeMin=start_time.isoformat() + 'Z',
        timeMax=end_time.isoformat() + 'Z',
        showDeleted=False,
        singleEvents=True,
        orderBy='startTime',
    ).execute()

    events = events_result.get('items', [])

    if events:
        for event in events:
            location = event.get('location', 'Location not specified')
            start_time = event['start'].get('dateTime', event['start'].get('date'))
            print(f"Event: {event['summary']} ({start_time}), Location: {location}")
            position_stack_api_url = "http://api.positionstack.com/v1/forward"
            params = {
                "access_key": "28cb994c15f9b6a59d1671a4d1e0461a",
                "query": location
            }
            event_location = requests.get(position_stack_api_url, params=params).json()
            event_lat = event_location["data"][0]["latitude"]
            event_lon = event_location["data"][0]["longitude"]
            event_data = {
                "universalAqi": True,
                "location": {
                    "latitude": event_lat,
                    "longitude": event_lon
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
            event_headers = {
                'Content-Type': 'application/json'
            }
            event_url = f'https://airquality.googleapis.com/v1/currentConditions:lookup?key={google_maps_api_key}'
            event_aqi_response = requests.post(event_url, data=json.dumps(event_data), headers=event_headers)
            event_aqi = event_aqi_response.json()["indexes"][0]["aqi"]
            event_index = 1
            if 50 < event_aqi < 101:
                event_index = 2
            elif 100 < event_aqi < 201:
                event_index = 3
            elif 200 < event_aqi < 301:
                event_index = 4
            elif 300 < event_aqi:
                event_index = 5
            get_temperature_api_key = '09047bbead0c6a581c47bd8941a0b548'
            get_temperature_url = f'https://api.openweathermap.org/data/2.5/weather?lat={event_lat}&lon={event_lon}&appid={get_temperature_api_key}'
            get_temperature_response = requests.get(get_temperature_url)
            event_temperature = get_temperature_response.json()["main"]["temp"] - 273
            hour_and_minutes_object = datetime.fromisoformat(start_time[:-1])
            hour_and_minutes = f"{hour_and_minutes_object.hour}:{hour_and_minutes_object.minute}"
            new_event_info = {
                "name": event['summary'],
                "location": location,
                "hour": hour_and_minutes,
                "temperature": event_temperature,
                "index": event_index
            }
            events_info.append(new_event_info)
    else:
        print('No events found in the specified time range.')

except Exception as e:
    print(f'Error: {e}')

position_stack_api_url = "http://api.positionstack.com/v1/forward"
params = {
    "access_key": "28cb994c15f9b6a59d1671a4d1e0461a",
    "query": city
}

# Send the GET request
response = requests.get(position_stack_api_url, params=params)
data = {}

if response.status_code == 200:
    # Parse the JSON response
    data = response.json()
    # You can now work with the data returned by the API
    print(data)
else:
    # Handle the request error
    print(f"Request failed with status code {response.status_code}")
    print(response.text)

index_home = 0

location_info_url = f'https://airquality.googleapis.com/v1/currentConditions:lookup?key={google_maps_api_key}'
location_info_input = {
    "universalAqi": True,
    "location": {
        "latitude": location_lat,
        "longitude": location_lon
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

response = requests.post(location_info_url, data=json.dumps(location_info_input), headers=headers)
location_info_response_data = response.json()
location_aqi = location_info_response_data["indexes"][0]["aqi"]

homeInfo = {
    "user_name": "Eduard",
    "location_home": f"{city}, {country}",
    "index_home": location_aqi,
    "cards": events_info
}


@app.route("/home", methods=["GET"])
@cross_origin()
def get_current_location():
    return homeInfo


@app.route("/getInfoForCity", methods=["POST"])
@cross_origin()
def get_info_for_city():
    frontend_input = request.get_json()["city_name"]

    # Define your API access key and query parameters
    get_info_for_city_params = {
        "access_key": "28cb994c15f9b6a59d1671a4d1e0461a",
        "query": frontend_input
    }

    # Send the GET request
    get_info_for_city_response = requests.get(position_stack_api_url, params=get_info_for_city_params)
    city_lat = get_info_for_city_response.json()["data"][0]["latitude"]
    city_lon = get_info_for_city_response.json()["data"][0]["longitude"]

    weather_api_key = '09047bbead0c6a581c47bd8941a0b548'

    # Construct the API URL with the provided parameters
    weather_url = f'https://api.openweathermap.org/data/2.5/weather?lat={city_lat}&lon={city_lon}&appid={weather_api_key}'

    # Send a GET request to the API
    weather_response = requests.get(weather_url)
    city_temperature = weather_response.json()["main"]["temp"] - 273

    get_city_aqi_api_key = 'AIzaSyAD1KCCoKf_NpcFpJ1Q0Y5AINHeMRgExpo'
    get_city_aqi_url = f'https://airquality.googleapis.com/v1/currentConditions:lookup?key={get_city_aqi_api_key}'

    get_city_aqi_data = {
        "universalAqi": True,
        "location": {
            "latitude": city_lat,
            "longitude": city_lon
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

    get_city_aqi_headers = {
        'Content-Type': 'application/json'
    }

    get_city_aqi_response = requests.post(get_city_aqi_url, data=json.dumps(get_city_aqi_data), headers=get_city_aqi_headers)
    city_aqi = get_city_aqi_response.json()["indexes"][0]["aqi"]
    city_index = 1
    if 50 < city_aqi < 101:
        city_index = 2
    elif 100 < city_aqi < 201:
        city_index = 3
    elif 200 < city_aqi < 301:
        city_index = 4
    elif 300 < city_aqi:
        city_index = 5
    return {
        "index": city_index,
        "temperature": city_temperature
    }


if __name__ == "__main__":
    app.run(debug=True)
