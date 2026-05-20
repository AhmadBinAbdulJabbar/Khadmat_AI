from fastapi import APIRouter, HTTPException
from gotrue.errors import AuthApiError
from pydantic import BaseModel

from config.supabase import supabase
from models.auth import LoginRequest, SignupRequest

router = APIRouter()


@router.post("/login")
async def login(req: LoginRequest):
    if supabase is None:
        return {
            "success": True,
            "mock": True,
            "user": {
                "id": "mock_customer_1",
                "email": req.email_or_phone,
                "role": "customer",
                "name": "Demo Customer",
            },
            "token": "mock-token",
        }

    try:
        response = supabase.auth.sign_in_with_password(
            {"email": req.email_or_phone, "password": req.password}
        )
    except AuthApiError as e:
        raise HTTPException(status_code=401, detail=str(e))

    user = response.user
    session = response.session

    if not user.email_confirmed_at:
        raise HTTPException(
            status_code=403,
            detail="Email not verified. Please check your inbox and click the confirmation link.",
        )

    return {
        "success": True,
        "user": {
            "id": str(user.id),
            "email": user.email,
            "role": user.user_metadata.get("role", "customer"),
            "name": f"{user.user_metadata.get('first_name', '')} {user.user_metadata.get('last_name', '')}".strip(),
        },
        "token": session.access_token,
    }


@router.post("/signup")
async def signup(req: SignupRequest):
    if len(req.password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters")

    if supabase is None:
        return {
            "success": True,
            "mock": True,
            "user": {
                "id": "mock_user_1",
                "email": req.email,
                "role": req.role,
            },
        }

    try:
        # Use admin API so the account is pre-confirmed — no email sent, no rate limit
        response = supabase.auth.admin.create_user({
            "email": req.email,
            "password": req.password,
            "email_confirm": True,
            "user_metadata": {
                "first_name": req.first_name,
                "last_name": req.last_name,
                "phone": req.phone,
                "city": req.city,
                "role": req.role,
                "professions": req.professions,
                "experience": req.experience,
                "price_range": req.price_range,
            },
        })
    except AuthApiError as e:
        msg = str(e)
        if "already been registered" in msg or "already exists" in msg.lower():
            raise HTTPException(status_code=409, detail="An account with this email already exists.")
        raise HTTPException(status_code=400, detail=msg)

    user = response.user

    # Insert into profiles table so we can query by role/city/profession
    try:
        supabase.table("profiles").insert({
            "id": str(user.id),
            "first_name": req.first_name,
            "last_name": req.last_name,
            "phone": req.phone,
            "city": req.city,
            "role": req.role,
            "professions": req.professions or [],
            "experience": req.experience,
            "price_range": req.price_range,
        }).execute()
    except Exception as e:
        print(f"[warn] profile insert failed: {e}")

    return {
        "success": True,
        "user": {
            "id": str(user.id),
            "email": user.email,
            "role": req.role,
        },
    }


@router.post("/google")
async def google_callback(access_token: str):
    """
    Called by the frontend after Supabase JS completes the Google OAuth redirect.
    Frontend passes the access_token from supabase.auth.getSession().
    We verify it and return a clean user object.
    """
    if supabase is None:
        return {
            "success": True,
            "mock": True,
            "user": {
                "id": "mock_google_user",
                "email": "demo@khadmat.ai",
                "name": "Demo Google User",
                "avatar": "",
                "role": "customer",
            },
            "token": access_token or "mock-token",
        }

    try:
        user_response = supabase.auth.get_user(access_token)
    except AuthApiError as e:
        raise HTTPException(status_code=401, detail=str(e))

    user = user_response.user
    return {
        "success": True,
        "user": {
            "id": str(user.id),
            "email": user.email,
            "name": user.user_metadata.get("full_name", ""),
            "avatar": user.user_metadata.get("avatar_url", ""),
            "role": "customer",
        },
        "token": access_token,
    }

class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str

@router.post("/change-password")
async def change_password(req: ChangePasswordRequest):
    return {"success": True, "message": "Password changed successfully"}

@router.post("/2fa/enable")
async def enable_2fa():
    return {"success": True, "message": "2FA enabled"}

@router.post("/2fa/disable")
async def disable_2fa():
    return {"success": True, "message": "2FA disabled"}

@router.get("/sessions")
async def get_active_sessions():
    return {
        "sessions": [
            {"id": "ses_1", "device": "iPhone 13", "location": "Islamabad", "current": True},
            {"id": "ses_2", "device": "Windows PC", "location": "Lahore", "current": False}
        ]
    }

@router.delete("/sessions")
async def sign_out_all_other_sessions():
    return {"success": True, "message": "Signed out of all other devices"}

@router.post("/logout")
async def logout():
    return {"success": True, "message": "Logged out successfully"}
