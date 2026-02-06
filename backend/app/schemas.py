from pydantic import BaseModel
from datetime import date
from typing import List, Optional

class ExpenseBase(BaseModel):
    name: str
    category: str
    amount: float
    payment_type: str = "Online"
    expense_date: date

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseUpdate(BaseModel):
    name: Optional[str]
    category: Optional[str]
    amount: Optional[float]
    payment_type: Optional[str]
    expense_date: Optional[date]

class ExpenseBulkCreate(BaseModel):
    items: List[ExpenseCreate]

class ExpenseResponse(ExpenseBase):
    id: int

    class Config:
        orm_mode = True
