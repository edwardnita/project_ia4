from flask import Flask, request
from flask_cors import CORS, cross_origin
import os
import requests
from googleapiclient.discovery import build
from datetime import datetime, timedelta, timezone
import json
from pymongo import MongoClient

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

client = MongoClient("mongodb+srv://ionescupv:OLRHv9RPXuwFRc5V@cluster0.9rq96wp.mongodb.net/")
db = client["greenwave"]
events_collection = db.get_collection("events")
cursor = events_collection.find({})

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

google_maps_api_key = 'AIzaSyBldDYok7bcrTFcndz-M97OrKS1jJE4e1I'

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
            minute = hour_and_minutes_object.minute
            if minute < 10:
                minute = f"0{minute}"
            hour_and_minutes = f"{hour_and_minutes_object.hour}:{minute}"
            new_event_info = {
                "name": event['summary'],
                "location": location,
                "hour": hour_and_minutes,
                "temperature": event_temperature,
                "index": 6 - event_index
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
location_index = 1
if 70 < location_aqi < 91:
    location_index = 2
elif 90 < location_aqi < 131:
    location_index = 3
elif 130 < location_aqi < 201:
    location_index = 4
elif 200 < location_aqi:
    location_index = 5

homeInfo = {
    "user_name": "Eduard",
    "location_home": f"{city}, {country}",
    "index_home": 6 - location_index,
    "cards": events_info
}


def generate(prompt):
    for document in cursor:
        if prompt.__contains__(document["keyword"]):
            return document["event_name"]
    return "nu facem nimik, stam linistiti"


def timestamp_to_hour_and_minutes(timestamp):
    dt_object = datetime.fromtimestamp(timestamp)
    idk_hour_and_minutes = str(dt_object)[11:16]
    return idk_hour_and_minutes


def cel_mai_mic_indice_la_ora(vector):
    cel_mai_mic_indice = 6
    ora_oportuna = "12:00"

    # Parcurgem perechile de la ora specificată
    for pereche in vector:
        # Dacă nu avem încă o pereche sau indicele curent este mai mic decât cel mai mic indice găsit până acum
        if pereche[1] < cel_mai_mic_indice:
            cel_mai_mic_indice = pereche[1]
            ora_oportuna = pereche[0]

    return (ora_oportuna, cel_mai_mic_indice)


@app.route("/home", methods=["GET"])
@cross_origin()
def get_current_location():
    return homeInfo


@app.route("/search", methods=["POST"])
@cross_origin()
def get_info_for_city():
    frontend_input = request.get_json()["message"]

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

    get_city_aqi_api_key = 'AIzaSyBldDYok7bcrTFcndz-M97OrKS1jJE4e1I'
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

    get_city_aqi_response = requests.post(get_city_aqi_url, data=json.dumps(get_city_aqi_data),
                                          headers=get_city_aqi_headers)
    city_aqi = get_city_aqi_response.json()["indexes"][0]["aqi"]
    city_index = 1

    if 70 < city_aqi < 91:
        city_index = 2
    elif 90 < city_aqi < 131:
        city_index = 3
    elif 130 < city_aqi < 201:
        city_index = 4
    elif 200 < city_aqi:
        city_index = 5

    return {
        "index": 6 - city_index,
        "temperature": city_temperature,
        "city_name": frontend_input
    }


@app.route("/chat", methods=["POST"])
@cross_origin()
def get_optimal_hour():
    frontend_input = request.get_json()["message"]
    activity = generate(frontend_input)
    for calendar_event in events_info:
        if calendar_event["name"] == activity:
            calendar_loc_to_geo_api_url = "http://api.positionstack.com/v1/forward"
            calendar_loc_to_geo_params = {
                "access_key": "28cb994c15f9b6a59d1671a4d1e0461a",
                "query": calendar_event["location"]
            }
            calendar_loc_to_geo_response = requests.get(calendar_loc_to_geo_api_url, params=calendar_loc_to_geo_params)
            calendar_lat = calendar_loc_to_geo_response.json()["data"][0]["latitude"]
            calendar_lon = calendar_loc_to_geo_response.json()["data"][0]["longitude"]
            get_laur_url = f'http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat={calendar_lat}&lon={calendar_lon}&appid=09047bbead0c6a581c47bd8941a0b548'
            laur_response = requests.get(get_laur_url)
            vector = []
            list_of_predictions = laur_response.json()["list"]

            print(list_of_predictions)

            item = (timestamp_to_hour_and_minutes(list_of_predictions[2]["dt"]), list_of_predictions[2]["main"]["aqi"])
            vector.append(item)

            item = (timestamp_to_hour_and_minutes(list_of_predictions[4]["dt"]), list_of_predictions[4]["main"]["aqi"])
            vector.append(item)

            item = (timestamp_to_hour_and_minutes(list_of_predictions[6]["dt"]), list_of_predictions[6]["main"]["aqi"])
            vector.append(item)

            item = (timestamp_to_hour_and_minutes(list_of_predictions[8]["dt"]), list_of_predictions[8]["main"]["aqi"])
            vector.append(item)
            reply = cel_mai_mic_indice_la_ora(vector)
            return {"time": reply[0], "index": 6 - int(reply[1]), "keyword": activity}
    return {"time": "12:00", "index": 5,  "keyword": "cioaca"}


if __name__ == "__main__":
    app.run(debug=True)
