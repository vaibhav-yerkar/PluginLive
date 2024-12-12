from src.models.report import VideoAnalysis
from src.models.questionAnswer import Solver
from fastapi import FastAPI, HTTPException, Request,UploadFile,File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from tempfile import NamedTemporaryFile
import shutil
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/report")
async def get_dashboard(video: UploadFile = File(...)):
    if not video:
        raise HTTPException(status_code=400, detail="No video file uploaded.")

    # Save the uploaded file to a temporary file
    with NamedTemporaryFile(delete=False, suffix=".mp4") as tmp:
        shutil.copyfileobj(video.file, tmp)
        tmp_path = tmp.name

    try:
        analysis = VideoAnalysis()
        summary = analysis.response(tmp_path)  # Pass the temporary file path
        return {'report': summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Clean up the temporary file
        os.remove(tmp_path)