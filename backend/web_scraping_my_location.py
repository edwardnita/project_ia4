import requests
from bs4 import BeautifulSoup
from time import sleep

# Send a GET request to the website
url = "https://www.gps-coordinates.net/my-location"
response = requests.get(url)
sleep(4)
soup = BeautifulSoup(response.content, 'html.parser')
sleep(4)
print(soup.text)
address = soup.find(id_='addr').text
print(address)
