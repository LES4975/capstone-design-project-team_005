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
