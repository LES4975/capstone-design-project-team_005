from flask import Flask, request, jsonify
import io
import torch
from PIL import Image
import torchvision.transforms as T
import mysql.connector
from ultralytics import YOLO

app = Flask(__name__)

# YOLOv8 모델 불러오기
model = YOLO('best.pt')

# MySQL 연결 설정
db_config = {
    'user': 'root',
    'password': 'capstone02005',
    'host': 'localhost',
    'database': 'emotion_db'
}

# 예측 함수
def predict(image):
    transform = T.Compose([T.ToTensor()])
    img = transform(image).unsqueeze(0)  # 배치 차원 추가
    results = model(img)
    return results
    
    
# MySQL에 결과 저장 함수
def save_results_to_db(predictions):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        add_emotion = ("INSERT INTO emotions (emotion_data) VALUES (%s)")
        emotion_json = json.dumps(predictions)
        cursor.execute(add_emotion, (emotion_json,))
        conn.commit()
        cursor.close()
        conn.close()
        print("Emotion data inserted successfully.")
    except mysql.connector.Error as err:
        print(f"Error: {err}")

@app.route('/mood-tunes', methods=['POST'])
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
    
    # 결과를 MySQL에 저장
    save_results_to_db(predictions)
    
    return jsonify(predictions)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
