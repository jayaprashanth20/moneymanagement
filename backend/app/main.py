# from fastapi import FastAPI
# from app.database import engine, Base
# from app.routers import expense
# from fastapi.middleware.cors import CORSMiddleware
# app = FastAPI(title="Money Tracker API")
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # frontend
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
# @app.on_event("startup")
# async def startup():
#     async with engine.begin() as conn:
#         await conn.run_sync(Base.metadata.create_all)

# app.include_router(expense.router)


# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from app.database import engine, Base
# from app.routers import expense

# app = FastAPI(title="Money Tracker API")

# # 🔥 CORS FIX (THIS IS WHAT YOU MISSED)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:5173",
#         "http://127.0.0.1:5173"
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.on_event("startup")
# async def startup():
#     async with engine.begin() as conn:
#         await conn.run_sync(Base.metadata.create_all)

# app.include_router(expense.router)
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

app.include_router(expense.router)
