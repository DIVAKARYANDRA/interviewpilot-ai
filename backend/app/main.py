from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth_api import router as auth_router
from app.api.interview_api import router as interview_router

from app.database.db import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="InterviewPilot AI",
    description="AI Powered Interview Coach",
    version="1.0.0"
)

# -----------------------------
# CORS Configuration
# -----------------------------
origins = [
    "http://localhost:5173",
    "https://interviewpilot-ai-umber.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Routers
# -----------------------------
app.include_router(auth_router)
app.include_router(interview_router)

# -----------------------------
# Health
# -----------------------------
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