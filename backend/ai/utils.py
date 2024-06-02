from functools import lru_cache
from io import BytesIO

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