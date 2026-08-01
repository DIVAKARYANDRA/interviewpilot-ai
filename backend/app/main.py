from fastapi import FastAPI
from app.api.auth_api import router as auth_router
from app.database.db import Base
from app.database.db import engine
from app.api.interview_api import router as interview_router

Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="InterviewPilot AI",
    description="AI Powered Interview Coach",
    version="1.0.0"
)
app.include_router(auth_router)
app.include_router(interview_router)

@app.get("/")
def root():
    return {
        "message": "InterviewPilot AI Running 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }