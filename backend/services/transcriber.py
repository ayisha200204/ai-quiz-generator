import whisper
from moviepy.editor import VideoFileClip
import os
import uuid

UPLOAD_DIR = "backend/uploads"
AUDIO_DIR = "backend/uploads"

model = whisper.load_model("base")  # small model, stable


def extract_audio(video_path: str) -> str:
    audio_path = os.path.join(AUDIO_DIR, f"{uuid.uuid4()}.wav")
    
    video = VideoFileClip(video_path)
    video.audio.write_audiofile(audio_path)
    video.close()
     
    return audio_path


def transcribe_video(video_path: str) -> str:
    audio_path = extract_audio(video_path)
    result = model.transcribe(audio_path)
    return result["text"]
