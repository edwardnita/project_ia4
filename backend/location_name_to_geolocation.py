import requests

api_key = '09047bbead0c6a581c47bd8941a0b548'
city_name = 'Videle'
url = f'http://api.openweathermap.org/geo/1.0/direct?q={city_name}&limit=2&appid={api_key}'

response = requests.get(url)

data = response.json()

lat = data[0]['lat']
lon = data[0]['lon']

print(f"latitude is {lat}")
print(f"longitude is {lon}")
