from fastapi import APIRouter, HTTPException
from gotrue.errors import AuthApiError

from config.supabase import supabase
from models.auth import LoginRequest, SignupRequest

router = APIRouter()


@router.post("/login")
async def login(req: LoginRequest):
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

    try:
        response = supabase.auth.sign_up(
            {
                "email": req.email,
                "password": req.password,
                "options": {
                    "data": {
                        "first_name": req.first_name,
                        "last_name": req.last_name,
                        "phone": req.phone,
                        "city": req.city,
                        "role": req.role,
                        "professions": req.professions,
                        "experience": req.experience,
                        "price_range": req.price_range,
                    }
                },
            }
        )
    except AuthApiError as e:
        raise HTTPException(status_code=400, detail=str(e))

    user = response.user

    # Supabase returns identities=[] when the email already exists
    if user and not user.identities:
        raise HTTPException(status_code=409, detail="An account with this email already exists.")

    return {
        "success": True,
        "message": "Account created. Please check your email and click the confirmation link before logging in.",
        "user": {
            "id": str(user.id),
            "email": user.email,
        },
    }


@router.post("/google")
async def google_callback(access_token: str):
    """
    Called by the frontend after Supabase JS completes the Google OAuth redirect.
    Frontend passes the access_token from supabase.auth.getSession().
    We verify it and return a clean user object.
    """
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
