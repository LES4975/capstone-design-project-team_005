import csv
from urllib.parse import quote_plus

from fastapi import FastAPI, HTTPException, UploadFile, File, Request
from starlette.middleware.cors import CORSMiddleware

from ai.utils import (
    transform_image,
    load_model,
    get_prediction,
    read_labeled_songs_file,
    find_songs_by_emotion,
)
from ai.schemas import ImageResponse

#-----------챗봇 라이브러리와 키
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv
import logging
from difflib import SequenceMatcher
from typing import Optional

load_dotenv()
client = OpenAI(api_key=os.getenv("CHATBOT_KEY"))
#-------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/predict/emotion", response_model=ImageResponse)
async def predict_emotion(image: UploadFile = File(...)):
    """
    이미지 입력을 받아, 예측된 감정을 반환합니다.
    """
    model = load_model("model/3rd_best.pt")
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
    model = load_model("model/3rd_best.pt")
    image = transform_image(await image.read())
    emotion = get_prediction(model, image)

    if emotion == "unknown":
        emotion = "happy"

    labeled_songs_dataset = read_labeled_songs_file("music_list.txt")
    recommended_songs = find_songs_by_emotion(emotion, labeled_songs_dataset)

    return {"emotion": emotion, "songs": recommended_songs}

#---------------------------------
#챗봇 파트

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: list[Message]


class ChatResponse(BaseModel):
    response: str
    special_component: Optional[str] = None

#시나리오 csv 파일 읽기
def load_responses_from_csv(csv_file):
    responses = {}
    with open(csv_file, 'r', newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            question = row['question']
            answer = row['answer']
            responses[question] = answer
    return responses

responses = load_responses_from_csv('questions.csv')

@app.post("/chatbot", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        max_ratio = 0
        selected_answer = None
        emotions = ['[기쁨]', '[슬픔]', '[분노]', '[불안]']
        for key in responses:
            matcher = SequenceMatcher(None, key.lower(), request.message.lower())
            ratio = matcher.ratio()
            if ratio > max_ratio:
                max_ratio = ratio
                selected_answer = responses[key]
        
        # 특정 컴포넌트 출력을 위한 변수
        special_component = None

        # selected_answer의 각 원소가 emotions 리스트에 포함되는지 확인
        for emotion in emotions:
            if emotion in selected_answer:
                # 특정 컴포넌트 생성 또는 할당
                special_component = emotion
                break  # 하나 이상 해당될 경우 중단

        if max_ratio >= 0.8:  # 예측된 정확도 임계값
            if "좋아요" in selected_answer and "음악들을 표시하겠습니다" in selected_answer:
                special_component = "playlist"
            return ChatResponse(response=selected_answer, special_component=special_component)
            return ChatResponse(response=selected_answer)
        else:
            response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages = request.history + [
                {
                    "role": "system",
                    "content": "당신은 MoodTunes의 챗봇입니다. 사용자가 기능을 사용하고 싶다고 질문하면 해당하는 기능을 제공하거나, 사용자의 요청이나 피드백을 수용할 수 있습니다. 되도록 사용자의 질문에 대해 짧고 간결하고 친절하게 대답해주세요."
                },
                {
                   "role": "user",
                    "content": request.message
                }
            ],
            max_tokens=300,
            temperature=0
        )
        response_text = response.choices[0].message.content

        # 특정 컴포넌트가 있는 경우 함께 반환
        if special_component:
            return ChatResponse(response=response_text, special_component=special_component)
        else:
            return ChatResponse(response=response_text)
        
    except Exception as e:
        logging.error(f"Error during chat processing: {e}")
        raise HTTPException(status_code=500, detail=str(e))

    # 예외 처리기 추가
@app.exception_handler(Exception)
async def validation_exception_handler(request: Request, exc: Exception):
    logging.error(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred. Please try again later."},
    )
    
# 애플리케이션 실행 명령어: uvicorn main:app --reload