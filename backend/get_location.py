import requests

url = 'https://timezoneapi.io/api/ip/?token=aOymUlzMGzRoPNvcFmhe'

response = requests.get(url)

print(response.json())