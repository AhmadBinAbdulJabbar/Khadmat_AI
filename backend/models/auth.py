from pydantic import BaseModel
from typing import Optional


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
