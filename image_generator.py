# import required libraries
import openai


openai.api_key = "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"

response = openai.Image.create(
  prompt="pollution level 4",
  n=1,
  size="1024x1024"
)
image_url = response['data'][0]['url']
print(image_url)