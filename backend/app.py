from src.models.report import report
from src.models.questionAnswer import Solver
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


class questionrequest(BaseModel):
    transcript : str
    question : str

@app.post("/questionAnswer")
async def get_answer(request: questionrequest):
    answer = Solver()
    solution = answer.generate_response(request.transcript,request.question)
    return {"Answer" : solution}