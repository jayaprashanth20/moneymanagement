from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import date
from app.database import get_db
from app.schemas import ExpenseBulkCreate, ExpenseUpdate
from app.crud import expense

router = APIRouter(prefix="/expenses", tags=["Expenses"])

# ADD (bulk)
@router.post("")
async def add_expenses(payload: ExpenseBulkCreate, db: AsyncSession = Depends(get_db)):
    count = await expense.create_expenses(db, payload.items)
    return {"message": f"{count} expenses added"}

# GET (dynamic date / month)
@router.get("")
async def fetch_expenses(
    start_date: date = Query(...),
    end_date: date = Query(...),
    db: AsyncSession = Depends(get_db)
):
    return await expense.get_expenses(db, start_date, end_date)

# UPDATE
# @router.put("/{expense_id}")
# async def update_expense(
#     expense_id: int,
#     payload: ExpenseUpdate,
#     db: AsyncSession = Depends(get_db)
# ):
#     await expense.update_expense(db, expense_id, payload.dict(exclude_unset=True))
#     return {"message": "Expense updated"}
@router.put("/{expense_id}")
async def update_expense(
    expense_id: int,
    payload: ExpenseUpdate,
    db: AsyncSession = Depends(get_db)
):
    updated_id = await expense.update_expense(
        db,
        expense_id,
        payload.dict(exclude_unset=True)
    )

    if not updated_id:
        return {"message": "Expense not found"}

    return {"message": "Expense updated"}

# DELETE
# @router.delete("/{expense_id}")
# async def delete_expense(expense_id: int, db: AsyncSession = Depends(get_db)):
#     await expense.delete_expense(db, expense_id)
#     return {"message": "Expense deleted"}
@router.delete("/{expense_id}")
async def delete_expense(
    expense_id: int,
    db: AsyncSession = Depends(get_db)
):
    deleted_id = await expense.delete_expense(db, expense_id)

    if not deleted_id:
        return {"message": "Expense not found"}

    return {"message": "Expense deleted"}


# TOTAL (based on filter)
@router.get("/total")
async def total(
    start_date: date,
    end_date: date,
    db: AsyncSession = Depends(get_db)
):
    return {"total": await expense.total_expense(db, start_date, end_date)}

# CATEGORY SPLIT
@router.get("/category-summary")
async def category(
    start_date: date,
    end_date: date,
    db: AsyncSession = Depends(get_db)
):
    return await expense.category_summary(db, start_date, end_date)

# GRAND TOTAL
@router.get("/grand-total")
async def lifetime_total(db: AsyncSession = Depends(get_db)):
    return {"grand_total": await expense.grand_total(db)}

# MONTHLY BAR CHART
@router.get("/monthly-summary")
async def monthly(db: AsyncSession = Depends(get_db)):
    return await   expense.monthly_summary(db)
