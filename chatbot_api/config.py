import os
from dotenv import load_dotenv
load_dotenv()

# config.py
class Config:
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY')
    DEBUG = True
    chatbot_api = os.getenv('CHATBOT_KEY')