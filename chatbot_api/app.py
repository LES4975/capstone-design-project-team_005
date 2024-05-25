# app.py
from flask import Flask
from flask import request, jsonify
from openai import OpenAI
import os
from config import Config
from models import db, User, Conversation


app = Flask(__name__)
# app.py에서 설정 파일을 불러옵니다.
app.config.from_object(Config)

# 데이터베이스 초기화
db.init_app(app)

with app.app_context():
    db.create_all()


chatbot_api=app.config['CHATBOT_KEY']
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY", chatbot_api))

@app.route('/')
def home():
    return "Hello, Flask!"

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    username = data.get('username')
    user_input = data.get('message')

    # 사용자가 존재하는지 확인
    user = User.query.filter_by(username=username).first()

    # 이전 대화 불러오기
    previous_conversations = Conversation.query.filter_by(user_id=user.id).all()
    conversation_history = "\n".join([f"User: {conv.message}\nBot: {conv.response}" for conv in previous_conversations])

    # 역할 및 content 지정
    role = "system"
    content = "당신은 moodTunes의 챗봇입니다. 사용자가 기능을 사용하고 싶다고 질문하면 해당하는 기능을 제공하거나, 사용자의 요청이나 피드백을 수용할 수 있습니다. 되도록 사용자의 질문에 대해 짧고 간결하고 친절하게 대답해주세요."

    # 처음 대화에서는 챗봇의 역할을 system으로 설정
    if previous_conversations:
        role = "assistant"
        content = user_input


    # 새로운 대화 처리
    prompt = f"{conversation_history}\nUser: {user_input}\nBot:"
    response = client.chat.completions.create(
        model ="gpt-3.5-turbo",
        messages=[
            {
                "role":role,
                "content":content
            }
        ],
        max_tokens=150,
        temperature=0.3
    )
    response_text = response.choices[0].message.content.strip()

    # 대화 저장
    new_conversation = Conversation(user_id=user.id, message=user_input, response=response_text)
    db.session.add(new_conversation)
    db.session.commit()

    return jsonify({"response": response_text})

# def handle_scenario(user_input):
#     if "날씨" in user_input:
#         return "현재 날씨는 맑고 기온은 20도입니다."
#     elif "뉴스" in user_input:
#         return "오늘의 주요 뉴스 헤드라인: 경제가 회복되고 있습니다."
#     elif "안녕하세요" in user_input or "안녕" in user_input:
#         return "안녕하세요! 무엇을 도와드릴까요?"
#     else:
#         return get_chatgpt_response(user_input)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)