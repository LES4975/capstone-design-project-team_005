from urllib.parse import quote_plus

from fastapi import FastAPI, UploadFile, File

from ai.utils import (
    transform_image,
    load_model,
    get_prediction,
    read_labeled_songs_file,
    find_songs_by_emotion,
)
from ai.schemas import ImageResponse

app = FastAPI()


@app.post("/predict/emotion", response_model=ImageResponse)
async def predict_emotion(image: UploadFile = File(...)):
    """
    이미지 입력을 받아, 예측된 감정을 반환합니다.
    """
    model = load_model("model/best.pt")
    image = transform_image(await image.read())
    emotion = get_prediction(model, image)

    return {"emotion": emotion}


@app.get("/predict/music")
async def predict_music(emotion: str):
    """
    감정을 입력받아, 추천 곡을 반환합니다.
    """
    labeled_songs_dataset = read_labeled_songs_file("music_list.txt")
    recommended_songs = find_songs_by_emotion(emotion, labeled_songs_dataset)

    return {"songs": recommended_songs}


@app.post("/predict/final")
async def predict_final(image: UploadFile = File(...)):
    """
    이미지 입력을 받아, 추천 곡과 예측된 감정을 반환합니다.
    """
    model = load_model("model/best.pt")
    image = transform_image(await image.read())
    emotion = get_prediction(model, image)

    labeled_songs_dataset = read_labeled_songs_file("music_list.txt")
    recommended_songs = find_songs_by_emotion(emotion, labeled_songs_dataset)

    return {"emotion": emotion, "songs": recommended_songs}
