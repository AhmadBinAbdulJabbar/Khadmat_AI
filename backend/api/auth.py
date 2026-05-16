from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional
import uuid

router = APIRouter()


class LoginRequest(BaseModel):
    email_or_phone: str
    password: str


class SignupRequest(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    city: str
    password: str
    role: str = "customer"
    professions: Optional[list[str]] = None
    experience: Optional[str] = None
    price_range: Optional[str] = None


@router.post("/login")
async def login(req: LoginRequest):
    """
    MVP: simulated login. Returns mock user session.
    Future: validate against Supabase Auth.
    """
    # For MVP, accept any credentials
    return {
        "success": True,
        "user": {
            "id": str(uuid.uuid4()),
            "email": req.email_or_phone,
            "role": "customer",
            "name": "Test User",
        },
        "token": f"mock-jwt-{uuid.uuid4().hex[:16]}",
    }


@router.post("/signup")
async def signup(req: SignupRequest):
    """
    MVP: simulated signup. Returns mock user.
    Future: create user in Supabase Auth + users table.
    """
    if len(req.password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters")

    user_id = str(uuid.uuid4())
    return {
        "success": True,
        "user": {
            "id": user_id,
            "first_name": req.first_name,
            "last_name": req.last_name,
            "email": req.email,
            "phone": req.phone,
            "city": req.city,
            "role": req.role,
        },
        "token": f"mock-jwt-{uuid.uuid4().hex[:16]}",
    }
