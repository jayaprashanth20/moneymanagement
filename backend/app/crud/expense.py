# from sqlalchemy.ext.asyncio import AsyncSession
# from sqlalchemy import select, func, update, delete
# from app.models import Expense

# # CREATE (bulk)
# async def create_expenses(db: AsyncSession, items):
#     expenses = [Expense(**item.dict()) for item in items]
#     db.add_all(expenses)
#     await db.commit()
#     return len(expenses)

# # READ (date range)
# async def get_expenses(db, start_date=None, end_date=None):
#     stmt = select(Expense)

#     if start_date and end_date:
#         stmt = stmt.where(
#             Expense.expense_date.between(start_date, end_date)
#         )

#     stmt = stmt.order_by(Expense.expense_date.desc())

#     result = await db.execute(stmt)
#     return result.scalars().all()


# async def update_expense(db, expense_id, data):
#     stmt = (
#         update(Expense)
#         .where(Expense.id == expense_id)
#         .values(**data)
#         .returning(Expense.id)
#     )
#     result = await db.execute(stmt)
#     await db.commit()
#     return result.scalar()   # None if not found


# # DELETE
# async def delete_expense(db, expense_id):
#     stmt = (
#         delete(Expense)
#         .where(Expense.id == expense_id)
#         .returning(Expense.id)
#     )
#     result = await db.execute(stmt)
#     await db.commit()
#     return result.scalar()   # None if not found

# # TOTAL
# async def total_expense(db, start_date, end_date):
#     stmt = select(func.sum(Expense.amount)).where(
#         Expense.expense_date.between(start_date, end_date)
#     )
#     result = await db.execute(stmt)
#     return result.scalar() or 0

# # CATEGORY SUMMARY
# async def category_summary(db, start_date, end_date):
#     stmt = (
#         select(Expense.category, func.sum(Expense.amount).label("total"))
#         .where(Expense.expense_date.between(start_date, end_date))
#         .group_by(Expense.category)
#     )
#     result = await db.execute(stmt)
#     return result.all()

# # GRAND TOTAL
# async def grand_total(db):
#     result = await db.execute(select(func.sum(Expense.amount)))
#     return result.scalar() or 0

# # MONTHLY SUMMARY (BAR CHART)
# async def monthly_summary(db):
#     stmt = (
#         select(
#             func.date_trunc("month", Expense.expense_date).label("month"),
#             func.sum(Expense.amount).label("total")
#         )
#         .group_by("month")
#         .order_by("month")
#     )
#     result = await db.execute(stmt)
#     return result.all()
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, update, delete
from datetime import datetime, time
from app.models import Expense


# ===============================
# CREATE (bulk)
# ===============================
async def create_expenses(db: AsyncSession, items):
    expenses = [Expense(**item.dict()) for item in items]
    db.add_all(expenses)
    await db.commit()
    return len(expenses)


# ===============================
# READ (date range)
# ===============================
async def get_expenses(db: AsyncSession, start_date=None, end_date=None):
    stmt = select(Expense)

    if start_date and end_date:
        start_dt = datetime.combine(start_date, time.min)
        end_dt = datetime.combine(end_date, time.max)

        stmt = stmt.where(
            Expense.expense_date.between(start_dt, end_dt)
        )

    stmt = stmt.order_by(Expense.expense_date.desc())

    result = await db.execute(stmt)
    return result.scalars().all()


# ===============================
# UPDATE
# ===============================
async def update_expense(db: AsyncSession, expense_id, data):
    stmt = (
        update(Expense)
        .where(Expense.id == expense_id)
        .values(**data)
        .returning(Expense.id)
    )

    result = await db.execute(stmt)
    await db.commit()
    return result.scalar()   # None if not found


# ===============================
# DELETE
# ===============================
async def delete_expense(db: AsyncSession, expense_id):
    stmt = (
        delete(Expense)
        .where(Expense.id == expense_id)
        .returning(Expense.id)
    )

    result = await db.execute(stmt)
    await db.commit()
    return result.scalar()   # None if not found


# ===============================
# TOTAL (date range)
# ===============================
async def total_expense(db: AsyncSession, start_date, end_date):
    start_dt = datetime.combine(start_date, time.min)
    end_dt = datetime.combine(end_date, time.max)

    stmt = select(func.sum(Expense.amount)).where(
        Expense.expense_date.between(start_dt, end_dt)
    )

    result = await db.execute(stmt)
    return result.scalar() or 0


# ===============================
# CATEGORY SUMMARY
# ===============================
async def category_summary(db: AsyncSession, start_date, end_date):
    start_dt = datetime.combine(start_date, time.min)
    end_dt = datetime.combine(end_date, time.max)

    stmt = (
        select(
            Expense.category,
            func.sum(Expense.amount).label("total")
        )
        .where(Expense.expense_date.between(start_dt, end_dt))
        .group_by(Expense.category)
    )

    result = await db.execute(stmt)
    rows = result.all()

    return [
        {"category": row[0], "total": row[1]}
        for row in rows
    ]

# async def category_summary(db: AsyncSession, start_date, end_date):
#     start_dt = datetime.combine(start_date, time.min)
#     end_dt = datetime.combine(end_date, time.max)

#     stmt = (
#         select(
#             Expense.category,
#             func.sum(Expense.amount).label("total")
#         )
#         .where(Expense.expense_date.between(start_dt, end_dt))
#         .group_by(Expense.category)
#     )

#     result = await db.execute(stmt)
#     return result.all()


# ===============================
# GRAND TOTAL (lifetime)
# ===============================
async def grand_total(db: AsyncSession):
    result = await db.execute(
        select(func.sum(Expense.amount))
    )
    return result.scalar() or 0


# ===============================
# MONTHLY SUMMARY (BAR CHART)
# ===============================
async def monthly_summary(db: AsyncSession):
    stmt = (
        select(
            func.date_trunc("month", Expense.expense_date).label("month"),
            func.sum(Expense.amount).label("total")
        )
        .group_by("month")
        .order_by("month")
    )

    result = await db.execute(stmt)
    rows = result.all()

    return [
        {
            "month": row[0].strftime("%Y-%m"),
            "total": row[1]
        }
        for row in rows
    ]

