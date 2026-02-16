from fastapi import APIRouter, UploadFile, File
import shutil
import os

from backend.services.transcriber import transcribe_video
from backend.services.ai_pipeline import process_transcript

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.post("/process-video")
async def process_video(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Step 1: Transcribe
    transcript = transcribe_video(file_path)

    # Step 2: AI processing
    ai_output = process_transcript(transcript)

    return {
        "transcript": transcript,
        "ai_output": ai_output
    }
