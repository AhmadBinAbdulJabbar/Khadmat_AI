from fastapi import APIRouter, HTTPException
from typing import Optional

from config.supabase import supabase

router = APIRouter()


def _get_auth_user(user_id: str):
    try:
        resp = supabase.auth.admin.get_user_by_id(user_id)
        return resp.user
    except Exception:
        return None


@router.get("/profile")
async def get_customer_profile(user_id: Optional[str] = None):
    if not user_id:
        raise HTTPException(status_code=400, detail="user_id is required")

    # Try profiles table first
    profile_row = None
    try:
        result = supabase.table("profiles").select("*").eq("id", user_id).single().execute()
        profile_row = result.data
    except Exception:
        pass

    # Fall back to auth user for email / metadata
    auth_user = _get_auth_user(user_id)
    if not profile_row and not auth_user:
        raise HTTPException(status_code=404, detail="Profile not found")

    meta = auth_user.user_metadata if auth_user else {}
    email = (auth_user.email if auth_user else "") or ""

    return {
        "user": {
            "first_name": (profile_row or {}).get("first_name") or meta.get("first_name", ""),
            "last_name":  (profile_row or {}).get("last_name")  or meta.get("last_name", ""),
            "email":      email,
            "phone":      (profile_row or {}).get("phone")      or meta.get("phone", ""),
            "city":       (profile_row or {}).get("city")       or meta.get("city", ""),
        }
    }


@router.put("/profile")
async def update_customer_profile(user_id: Optional[str] = None, data: dict = {}):
    if not user_id:
        raise HTTPException(status_code=400, detail="user_id is required")

    allowed = {"first_name", "last_name", "phone", "city"}
    update_fields = {k: v for k, v in data.items() if k in allowed}

    try:
        # Upsert so it works even if the row doesn't exist yet
        supabase.table("profiles").upsert({
            "id": user_id,
            **update_fields,
            "role": "customer",
        }).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"success": True, "message": "Profile updated"}


@router.post("/profile/photo")
async def upload_customer_photo(file=None):
    return {"success": True, "photo_url": "https://mock-storage.com/photo.jpg"}
