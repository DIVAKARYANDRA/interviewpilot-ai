from fastapi import FastAPI

app = FastAPI(
    title="InterviewPilot AI",
    description="AI-powered voice interview coach",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "Welcome to InterviewPilot AI 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }