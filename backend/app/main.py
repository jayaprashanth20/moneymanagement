
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import expense

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        
        "https://moneymanagement-1.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def root():
    return {"status": "API is running"}

app.include_router(expense.router)
