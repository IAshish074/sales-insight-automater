from fastapi import FastAPI, UploadFile, File, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import pandas as pd
from .ai_engine import generate_summary
from .email_service import send_email
from .security import validate_file

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="Sales Insight Automator")

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"], # allow frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/analyze")
@limiter.limit("5/minute")
async def analyze_sales(
        request: Request,
        file: UploadFile = File(...),
        email: str = Form(...)
):
    try:
        validate_file(file)

        if file.filename.endswith(".csv"):
            df = pd.read_csv(file.file)
        else:
            df = pd.read_excel(file.file)

        data = df.to_string()
        
        summary = generate_summary(data)
        
        send_email(email, summary)

        return {
            "status": "success",
            "message": "Summary generated and email sent",
            "summary": summary
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }