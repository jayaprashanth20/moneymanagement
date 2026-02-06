# from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
# from sqlalchemy.orm import sessionmaker, declarative_base

# import os
# from dotenv import load_dotenv

# load_dotenv()  # 👈 VERY IMPORTANT

# DATABASE_URL = os.getenv("DATABASE_URL")

# if not DATABASE_URL:
#     raise ValueError("DATABASE_URL is not set")




# engine = create_async_engine(DATABASE_URL, echo=False)

# AsyncSessionLocal = sessionmaker(
#     engine, class_=AsyncSession, expire_on_commit=False
# )

# Base = declarative_base()

# async def get_db():
#     async with AsyncSessionLocal() as session:
#         yield session

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

import os
from dotenv import load_dotenv

# ================= ENV =================
load_dotenv()  # loads .env locally; ignored on Render

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set")

# 🛡️ Protect against newline / space issues (Render common bug)
DATABASE_URL = DATABASE_URL.strip()

# ================= ENGINE =================
engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    pool_size=5,
    max_overflow=10,
    pool_pre_ping=True,   # prevents stale connection crashes
)

# ================= SESSION =================
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
    autocommit=False,
)

# ================= BASE =================
Base = declarative_base()

# ================= DEPENDENCY =================
async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
