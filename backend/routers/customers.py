from fastapi import APIRouter, HTTPException, Request
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

    profile_row = None
    try:
        result = supabase.table("profiles").select("*").eq("id", user_id).single().execute()
        profile_row = result.data
    except Exception as e:
        print(f"[DEBUG] profiles table lookup failed for {user_id}: {e}")

    auth_user = _get_auth_user(user_id)
    if not profile_row and not auth_user:
        raise HTTPException(status_code=404, detail=f"Profile not found for user {user_id}")

    meta = auth_user.user_metadata if auth_user else {}
    email = (auth_user.email if auth_user else "") or ""

    return {
        "user": {
            "first_name": (profile_row or {}).get("first_name") or meta.get("first_name", ""),
            "last_name":  (profile_row or {}).get("last_name")  or meta.get("last_name", ""),
            "email":      email,
            "phone":      (profile_row or {}).get("phone")      or meta.get("phone", ""),
            "city":       (profile_row or {}).get("city")       or meta.get("city", "Islamabad"),
        }
    }


@router.put("/profile")
async def update_customer_profile(user_id: Optional[str] = None, request: Request = None):
    if not user_id:
        raise HTTPException(status_code=400, detail="user_id is required")

    try:
        data = await request.json()
    except Exception:
        data = {}

    allowed = {"first_name", "last_name", "phone", "city"}
    update_fields = {k: v for k, v in data.items() if k in allowed}

    saved = False

    # Try profiles table
    try:
        supabase.table("profiles").upsert({
            "id": user_id,
            **update_fields,
            "role": "customer",
        }).execute()
        saved = True
    except Exception as e:
        print(f"[DEBUG] profiles upsert failed: {e}")

    # Always also update auth user metadata so data persists even without profiles table
    try:
        supabase.auth.admin.update_user_by_id(user_id, {"user_metadata": update_fields})
        saved = True
    except Exception as e:
        print(f"[DEBUG] auth metadata update failed: {e}")

    if not saved:
        raise HTTPException(status_code=500, detail="Failed to save profile data")

    return {"success": True, "message": "Profile updated"}


@router.post("/profile/photo")
async def upload_customer_photo():
    return {"success": True, "photo_url": "https://mock-storage.com/photo.jpg"}
