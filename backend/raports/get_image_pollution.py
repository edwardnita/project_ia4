from google.cloud import vision
from google.cloud.vision import types

def detect_main_subject(image_path):
    client = vision.ImageAnnotatorClient()

    with open(image_path, 'rb') as image_file:
        content = image_file.read()

    image = types.Image(content=content)

    response = client.label_detection(image=image)
    labels = response.label_annotations

    if labels:
        main_subject = labels[0].description
        return main_subject
    else:
        return "Nu s-a putut identifica un subiect principal."

# Exemplu de utilizare
image_path = 'calea/imaginii/ta.jpg'
result = detect_main_subject(image_path)
print(f"Subiectul principal identificat este: {result}")
