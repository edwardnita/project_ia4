# from googleapiclient.discovery import build
# from datetime import datetime, timezone
#
# def get_next_event_location():
#     # Replace 'YOUR_API_KEY' with your actual API key
#     api_key = 'AIzaSyDKtS7afYJTMUsmv_CXHbY_8C1Wyl7kLdk'
#     calendar_id = 'radualaur09022003@gmail.com'  # 'primary' is the default calendar ID for the user's primary calendar
#
#     # Build the Google Calendar API service
#     service = build('calendar', 'v3', developerKey=api_key)
#
#     # Get the current time in UTC
#     now = datetime.utcnow().isoformat() + 'Z'
#
#     try:
#         # List upcoming events
#         events_result = service.events().list(
#             calendarId=calendar_id,
#             timeMin=now,
#             showDeleted=False,
#             singleEvents=True,
#             maxResults=1,
#             orderBy='startTime',
#         ).execute()
#
#         events = events_result.get('items', [])
#
#         if events:
#             next_event = events[0]
#             location = next_event.get('location', 'Location not specified')
#             print(f'Location of the next event: {location}')
#         else:
#             print('No upcoming events found.')
#
#
#     except Exception as e:
#         print(f'Error: {e}')
#
# # Call the function with your API key
# get_next_event_location()
from googleapiclient.discovery import build
from datetime import datetime, timedelta, timezone

# locatia evenimentului
# api_key_eu = 'AIzaSyDKtS7afYJTMUsmv_CXHbY_8C1Wyl7kLdk'
api_key = 'AIzaSyAD1KCCoKf_NpcFpJ1Q0Y5AINHeMRgExpo'

def get_events_in_time_range(start_time, end_time):
    # Replace 'YOUR_API_KEY' with your actual API key

    calendar_id = 'radualaur09022003@gmail.com'  # 'primary' is the default calendar ID for the user's primary calendar

    # Build the Google Calendar API service
    service = build('calendar', 'v3', developerKey=api_key)

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
        print(events)
        if events:
            for event in events:
                location = event.get('location', 'Location not specified')
                start_time = event['start'].get('dateTime', event['start'].get('date'))
                print(f"Event: {event['summary']} ({start_time}), Location: {location}")
        else:
            print('No events found in the specified time range.')

    except Exception as e:
        print(f'Error: {e}')

# Define the time range (e.g., next 7 days)
start_time = datetime.utcnow()
end_time = start_time + timedelta(days=7)

# Call the function with your API key and time range
get_events_in_time_range(start_time, end_time)
