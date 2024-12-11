from src.models.report import report
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class reportrequest(BaseModel):
    text : str


@app.post("/report")
async def get_dashboard(request: reportrequest):
    analysis = report()
    summary = analysis.geminiairesponse(request.text)
    return {'report' : summary}