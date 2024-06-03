# 파일 경로
from backend.ai.utils import find_songs_by_emotion, read_labeled_songs_file

file_path = "backend/music_list.txt"

# 곡과 감정이 라벨링된 데이터셋 읽어오기
labeled_songs_dataset = read_labeled_songs_file(file_path)

# 사용자 입력 받기
emotion = input("Enter your emotion (happy, angry, sad, anxious): ")

# 입력된 감정에 대한 곡 제목 5개 출력
recommended_songs = find_songs_by_emotion(emotion, labeled_songs_dataset)
print("Recommended songs for", emotion, ":", recommended_songs)
