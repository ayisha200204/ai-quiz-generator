from backend.services.transcriber import transcribe_video
from fastapi import FastAPI, File
#import shutil
import os
#import uuid
from backend.routers import ai_pipeline


app = FastAPI(title="AI Study Companion")

UPLOAD_DIR = "backend/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


app.include_router(ai_pipeline.router)

@app.get("/")
def home():
    return {"message": "Backend is running cleanly 💙"}


