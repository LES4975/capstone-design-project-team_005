from flask import Flask, request, jsonify
import io
import torch
from PIL import Image
import torchvision.transforms as T
from ultralytics import YOLO

app = Flask(__name__)

# YOLOv8 모델 불러오기
model = YOLO('best.pt')

# 예측 함수
def predict(image):
    transform = T.Compose([T.ToTensor()])
    img = transform(image).unsqueeze(0)  # 배치 차원 추가
    results = model(img)
    return results

@app.route('/predict', methods=['POST'])
def predict_endpoint():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file in request'}), 400
    
    file = request.files['image']
    img_bytes = file.read()
    img = Image.open(io.BytesIO(img_bytes))

    # 예측 수행
    results = predict(img)
    
    # 결과 반환 (결과를 JSON 형태로 반환)
    predictions = results.pandas().xyxy[0].to_dict(orient='records')  # 예측 결과를 딕셔너리 형태로 변환
    return jsonify(predictions)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
