from fastapi import FastAPI, UploadFile, File

from ai.utils import transform_image, load_model, get_prediction
from ai.schemas import ImageResponse

app = FastAPI()


@app.post('/predict', response_model=ImageResponse)
async def predict(image: UploadFile = File(...)):
    model = load_model('model/best.pt')
    image = transform_image(await image.read())
    emotion = get_prediction(model, image)

    return {'emotion': emotion}
