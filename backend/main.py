from fastapi import FastAPI, UploadFile, File

from ai.utils import transform_image, load_model
from ai.schemas import ImageResponse

app = FastAPI()


@app.post('/predict', response_model=ImageResponse)
async def predict(image: UploadFile = File(...)):
    model = load_model('model/best.pt')

    image_bytes = await image.read()
    image = transform_image(image_bytes)

    # 예측
    results = model(image)

    # 예측된 클래스 이름과 신뢰도 추출
    predictions = results[0].boxes.data  # YOLOv8의 결과는 첫 번째 요소의 'boxes' 속성에 있습니다
    if len(predictions) > 0:
        top_prediction = predictions[0]  # 첫 번째 예측을 가장 높은 신뢰도로 간주
        top_class_id = int(top_prediction[-1])  # 클래스 ID는 마지막 열에 있음
        top_class_name = model.names[top_class_id]  # 클래스 이름 가져오기
    else:
        top_class_name = "unknown"

    response = {
        'emotion': top_class_name
    }

    return response
