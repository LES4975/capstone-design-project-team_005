from flask import Flask, request, jsonify
import torch
from PIL import Image
from io import BytesIO

app = Flask(__name__)

# 모델 로드
model_path = 'model\3rd_best.pt'
model = torch.hub.load('ultralytics/yolov8', 'custom', path=model_path)

def transform_image(image_bytes):
    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    return image

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    
    image_file = request.files['image']
    image_bytes = image_file.read()
    image = transform_image(image_bytes)
    
    # 예측
    results = model(image)
    
    # 예측된 클래스 이름과 ID 추출
    predictions = results.pandas().xyxy[0]
    classes = predictions['name'].tolist()
    
    # 이미지 ID (예: 파일 이름)
    image_id = image_file.filename
    
    response = {
        'id': image_id,
        'classes': classes
    }
    
    return jsonify(response)

# response json 형식 :
# {
#     "id": "image.jpg",
#     "classes": ["cat", "dog"]
# }

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)