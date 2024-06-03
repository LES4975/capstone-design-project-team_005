from functools import lru_cache
from io import BytesIO
from urllib.parse import quote_plus

import torch
from PIL import Image
from ultralytics import YOLO


def transform_image(image_bytes):
    """
    이미지 바이트를 PIL 이미지로 변환합니다.
    """
    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    return image


@lru_cache
def load_model(model_path):
    """
    모델을 로드합니다.
    """
    model = YOLO(model_path)
    return model


def get_prediction(model, image):
    """
    주어진 이미지에 대한 예측을 수행하고, 가장 높은 신뢰도를 가진 클래스의 이름을 반환합니다.
    """
    results = model(image)
    predictions = results[0].boxes.data
    if len(predictions) > 0:
        top_prediction = predictions[0]
        top_class_id = int(top_prediction[-1])
        top_class_name = model.names[top_class_id]
    else:
        top_class_name = "unknown"

    return top_class_name


def read_labeled_songs_file(file_path):
    """
    파일로부터 곡과 감정이 라벨링된 데이터셋을 읽어옵니다.
    """
    labeled_songs = {}
    with open(file_path, "r" , encoding='utf-8') as file:
        for line in file:
            song, emotion = line.strip().split(",", 1)
            if emotion.lower() in labeled_songs:
                labeled_songs[emotion.lower()].append(song)
            else:
                labeled_songs[emotion.lower()] = [song]

    return labeled_songs


def find_songs_by_emotion(emotion, labeled_songs):
    """
    주어진 감정에 대한 곡을 찾아 반환합니다.
    """
    songs = labeled_songs.get(emotion.lower())
    if songs:
        song_links = {}
        for song in songs[:5]:  # 최대 5개의 곡을 반환
            song_query = quote_plus(song)
            youtube_link = f"https://www.youtube.com/results?search_query={song_query}"
            song_links[song] = youtube_link
        return song_links
    else:
        return "Sorry, I couldn't find songs for that emotion."
