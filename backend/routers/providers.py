from fastapi import APIRouter
from typing import Optional
from pydantic import BaseModel

router = APIRouter()

MOCK_PROVIDERS = [
    {
        "id": "p1",
        "name": "City Tutor Network",
        "category": "Tutor",
        "area": "Clifton",
        "city": "Karachi",
        "rating": 4.9,
        "total_jobs": 143,
        "is_available": True,
        "price_min": 800,
        "price_max": 2000,
        "distance": 1.4,
        "price_unit": "per session",
        "featured": True,
        "initials": "CT",
        "color_bg": "#E1F5EE",
        "color_text": "#0F6E56",
    },
    {
        "id": "p2",
        "name": "Rehman Electricals",
        "category": "Electrician",
        "area": "G-13",
        "city": "Islamabad",
        "rating": 4.8,
        "total_jobs": 98,
        "is_available": True,
        "price_min": 600,
        "price_max": 1200,
        "distance": 0.8,
        "price_unit": "per visit",
        "featured": False,
        "initials": "RE",
        "color_bg": "#EEEDFE",
        "color_text": "#534AB7",
    },
    {
        "id": "p3",
        "name": "Ali AC Services",
        "category": "AC Technician",
        "area": "G-13",
        "city": "Islamabad",
        "rating": 4.7,
        "total_jobs": 212,
        "is_available": True,
        "price_min": 800,
        "price_max": 1500,
        "distance": 2.1,
        "price_unit": "per visit",
        "featured": False,
        "initials": "AA",
        "color_bg": "#E6F1FB",
        "color_text": "#185FA5",
    },
    {
        "id": "p4",
        "name": "Master Plumbers Pk",
        "category": "Plumber",
        "area": "DHA",
        "city": "Karachi",
        "rating": 4.6,
        "total_jobs": 177,
        "is_available": True,
        "price_min": 500,
        "price_max": 1000,
        "distance": 3.2,
        "price_unit": "per visit",
        "featured": False,
        "initials": "MP",
        "color_bg": "#FAEEDA",
        "color_text": "#854F0B",
    },
    {
        "id": "p5",
        "name": "Karim AC Repair",
        "category": "AC Technician",
        "area": "F-10",
        "city": "Islamabad",
        "rating": 4.5,
        "total_jobs": 89,
        "is_available": False,
        "price_min": 900,
        "price_max": 1800,
        "distance": 4.1,
        "price_unit": "per visit",
        "featured": False,
        "initials": "KC",
        "color_bg": "#FAECE7",
        "color_text": "#993C1D",
    },
    {
        "id": "p6",
        "name": "HomeClean Pro",
        "category": "Cleaner",
        "area": "DHA",
        "city": "Lahore",
        "rating": 4.4,
        "total_jobs": 64,
        "is_available": True,
        "price_min": 600,
        "price_max": 1200,
        "distance": 5.0,
        "price_unit": "per session",
        "featured": False,
        "initials": "HP",
        "color_bg": "#EAF3DE",
        "color_text": "#3B6D11",
    },
]


@router.get("/providers/cities")
async def get_cities():
    return list(set(p["city"] for p in MOCK_PROVIDERS))


@router.get("/providers/areas")
async def get_areas(city: Optional[str] = None):
    if city and city.lower() != "all cities":
        areas = list(set(p["area"] for p in MOCK_PROVIDERS if p["city"].lower() == city.lower()))
    else:
        areas = list(set(p["area"] for p in MOCK_PROVIDERS))
    return areas


@router.get("/providers")
async def list_providers():
    return MOCK_PROVIDERS


@router.get("/providers/search")
async def search_providers(
    service: Optional[str] = None,
    city: Optional[str] = None,
    area: Optional[str] = None,
    q: Optional[str] = None,
    sort: str = "Rating",
    available_only: bool = False,
):
    results = list(MOCK_PROVIDERS)

    if service and service.lower() != "all":
        results = [p for p in results if p["category"].lower() == service.lower()]

    if city and city.lower() != "all cities":
        results = [p for p in results if p["city"].lower() == city.lower()]

    if area and area.lower() != "all areas":
        results = [p for p in results if p["area"].lower() == area.lower()]

    if q:
        q_low = q.lower()
        results = [p for p in results if q_low in p["name"].lower() or q_low in p["category"].lower()]

    if available_only:
        results = [p for p in results if p["is_available"]]

    if sort == "Distance":
        results.sort(key=lambda x: x["distance"])
    elif sort == "Price":
        results.sort(key=lambda x: x["price_min"])
    else:
        results.sort(key=lambda x: x["rating"], reverse=True)

    return results


@router.get("/providers/{id}")
async def get_provider(id: str):
    for p in MOCK_PROVIDERS:
        if p["id"] == id:
            return p
    return {"error": "Not found"}


class AvailabilityUpdate(BaseModel):
    is_available: bool

@router.patch("/providers/{id}/availability")
async def toggle_availability(id: str, req: AvailabilityUpdate):
    for p in MOCK_PROVIDERS:
        if p["id"] == id:
            p["is_available"] = req.is_available
            return p
    return {"error": "Not found"}


@router.get("/provider/dashboard")
async def provider_dashboard(provider_id: str):
    return {
        "today_jobs": { "total": 3, "pending": 1, "confirmed": 2 },
        "month_earnings": 38400,
        "rating": 4.7,
        "total_reviews": 212,
        "total_completed": 212
    }


@router.get("/provider/jobs/stats")
async def provider_jobs_stats(provider_id: str):
    return {
        "new_requests": 2,
        "confirmed_today": 3,
        "total_completed": 212
    }


@router.get("/provider/jobs")
async def provider_jobs(provider_id: str, status: Optional[str] = None, search: Optional[str] = None, limit: int = 5):
    jobs = [
        {
            "id": "req_1",
            "title": "AC service request",
            "type": "new",
            "customer": "Ahmed Usman",
            "customerInitials": "AU",
            "phone": "0300-xxx-xxxx",
            "location": "G-13/2",
            "time": "Today 10:00 AM",
            "price": "PKR 1,200 est.",
            "dateLabel": "Est. price",
            "avatarBg": "#EEEDFE",
            "avatarColor": "#3C3489"
        },
        {
            "id": "req_2",
            "title": "AC gas refill",
            "type": "confirmed",
            "customer": "Sara Khan",
            "customerInitials": "SK",
            "phone": "0302-xxx-xxxx",
            "location": "G-13/4",
            "time": "Today 2:00 PM",
            "price": "PKR 1,500",
            "dateLabel": "Confirmed",
            "avatarBg": "#FAEEDA",
            "avatarColor": "#633806"
        },
        {
            "id": "req_3",
            "title": "AC installation",
            "type": "completed",
            "customer": "Bilal Ahmed",
            "customerInitials": "BA",
            "phone": "completed",
            "location": "F-10/1",
            "time": "Yesterday 11:00 AM",
            "price": "PKR 2,200",
            "dateLabel": "Paid",
            "avatarBg": "#E6F1FB",
            "avatarColor": "#185FA5"
        }
    ]
    
    if status and status.lower() != "all":
        jobs = [j for j in jobs if j["type"] == status.lower()]
    
    if search:
        search_lower = search.lower()
        jobs = [j for j in jobs if search_lower in j["customer"].lower()]
        
    return jobs[:limit]


@router.post("/provider/jobs/{id}/request-review")
async def request_review(id: str):
    return {"success": True, "message": "Review requested"}


@router.get("/provider/notifications/count")
async def get_notification_count(provider_id: str):
    return {"unread": 3}


@router.get("/provider/schedule")
async def get_provider_schedule(provider_id: str, week_start: str = None):
    # Mock return matching task structure
    return {
        "week_start": week_start or "2026-05-19",
        "days": {
            "2026-05-19": [
                {"time": "09:00", "service": "AC repair", "status": "completed", "customer": "Completed"}
            ],
            "2026-05-20": [
                {"time": "14:00", "service": "Filter replace", "status": "confirmed", "customer": "Omar S."}
            ],
            "2026-05-21": [
                {"time": "08:00", "service": "AC filter clean", "status": "confirmed", "customer": "Ahmed U."},
                {"time": "10:00", "service": "Request", "status": "new", "customer": "Ahmed U."},
                {"time": "14:00", "service": "Gas refill", "status": "confirmed", "customer": "Sara K."}
            ],
            "2026-05-22": [
                {"time": "09:00", "service": "AC check", "status": "new", "customer": "Pending"},
                {"time": "12:00", "service": "AC service", "status": "confirmed", "customer": "Sara K."}
            ],
            "2026-05-23": [
                {"time": "10:00", "service": "AC install", "status": "confirmed", "customer": "Maryam K."},
                {"time": "16:00", "service": "AC unit check", "status": "confirmed", "customer": "Bilal A."}
            ]
        }
    }


@router.get("/provider/settings/working-days")
async def get_working_days(provider_id: str):
    return {"working_days": ["Mon", "Tue", "Wed", "Thu", "Fri"]}


class WorkingDaysUpdate(BaseModel):
    working_days: list[str]

@router.patch("/provider/settings/working-days")
async def update_working_days(provider_id: str, req: WorkingDaysUpdate):
    # In a real app, update DB here
    return {"success": True, "working_days": req.working_days}


class BlockScheduleRequest(BaseModel):
    provider_id: str
    date: str
    time_start: str
    time_end: str
    reason: Optional[str] = None

@router.post("/provider/schedule/block")
async def block_schedule(req: BlockScheduleRequest):
    # In a real app, insert into schedule_blocks table
    return {"success": True, "message": "Time slot blocked successfully"}


def check_schedule_conflicts(provider_id: str, date: str, time_start: str, duration_mins: int):
    # Utility function to check if the provider is free at the given time
    # In a real app, query DB for overlapping bookings and blocks
    return {"available": True}


@router.get("/provider/earnings/summary")
async def provider_earnings_summary(provider_id: str):
    return {
        "available_balance": 12800,
        "last_payout": { "amount": 25600, "date": "2026-05-15" },
        "this_month": { "total": 38400, "jobs": 32 },
        "last_month": { "total": 31200, "jobs": 27 },
        "this_year": { "total": 214000, "jobs": 212 }
    }


@router.get("/provider/earnings/chart")
async def provider_earnings_chart(provider_id: str, months: int = 6):
    return {
        "chart": [
            { "month": "Dec", "total": 22000 },
            { "month": "Jan", "total": 18000 },
            { "month": "Feb", "total": 28000 },
            { "month": "Mar", "total": 31000 },
            { "month": "Apr", "total": 31000 },
            { "month": "May", "total": 38400 }
        ][:months]
    }


@router.get("/provider/earnings/transactions")
async def provider_earnings_transactions(provider_id: str, page: int = 1, limit: int = 5):
    return {
        "transactions": [
            {"id": "txn_1", "service": "AC filter clean", "customer_name": "Ahmed Usman", "date": "2026-05-21", "amount": 1200, "status": "pending"},
            {"id": "txn_2", "service": "AC gas refill", "customer_name": "Sara Khan", "date": "2026-05-20", "amount": 1500, "status": "paid"},
            {"id": "txn_3", "service": "AC installation", "customer_name": "Bilal Ahmed", "date": "2026-05-19", "amount": 2200, "status": "paid"},
            {"id": "txn_4", "service": "AC repair", "customer_name": "Omar Siddiqui", "date": "2026-05-17", "amount": 900, "status": "paid"},
            {"id": "txn_5", "service": "Filter replace", "customer_name": "Zara Hassan", "date": "2026-05-16", "amount": 800, "status": "paid"}
        ],
        "total": 32,
        "page": page
    }


class WithdrawRequest(BaseModel):
    provider_id: str
    amount: float
    bank_account_id: Optional[str] = None

@router.post("/provider/earnings/withdraw")
async def provider_earnings_withdraw(req: WithdrawRequest):
    return {"success": True, "message": f"Withdrawal of PKR {req.amount} requested successfully."}


from fastapi.responses import Response

@router.get("/provider/earnings/report")
async def provider_earnings_report(provider_id: str, format: str = "pdf"):
    # Mock PDF generation
    return Response(content=b"%PDF-1.4 mock pdf content", media_type="application/pdf", headers={"Content-Disposition": "attachment; filename=transactions_report.pdf"})


@router.get("/provider/profile")
async def get_provider_profile(user_id: Optional[str] = None):
    from fastapi import HTTPException
    if not user_id:
        raise HTTPException(status_code=400, detail="user_id is required")

    # Try profiles table first
    row = None
    try:
        result = supabase.table("profiles").select("*").eq("id", user_id).single().execute()
        row = result.data
    except Exception:
        pass

    # Fall back to auth user metadata
    auth_user_obj = None
    email = ""
    meta = {}
    try:
        resp = supabase.auth.admin.get_user_by_id(user_id)
        auth_user_obj = resp.user
        email = auth_user_obj.email or ""
        meta = auth_user_obj.user_metadata or {}
    except Exception:
        pass

    if not row and not auth_user_obj:
        raise HTTPException(status_code=404, detail="Profile not found")

    return {
        "user": {
            "first_name": (row or {}).get("first_name") or meta.get("first_name", ""),
            "last_name":  (row or {}).get("last_name")  or meta.get("last_name", ""),
            "email":      email,
            "phone":      (row or {}).get("phone")      or meta.get("phone", ""),
            "city":       (row or {}).get("city")       or meta.get("city", ""),
        },
        "profile": {
            "professions":   (row or {}).get("professions")   or meta.get("professions") or [],
            "experience":    (row or {}).get("experience")    or meta.get("experience", ""),
            "price_range":   (row or {}).get("price_range")   or meta.get("price_range", ""),
            "bio":           (row or {}).get("bio", ""),
            "service_areas": (row or {}).get("service_areas") or [],
            "photo_url":     (row or {}).get("photo_url"),
        }
    }


@router.put("/provider/profile")
async def update_provider_profile(user_id: Optional[str] = None, req: dict = {}):
    from fastapi import HTTPException
    if not user_id:
        raise HTTPException(status_code=400, detail="user_id is required")

    allowed = {"first_name", "last_name", "phone", "city", "professions", "experience", "price_range", "bio", "service_areas"}
    update_fields = {k: v for k, v in req.items() if k in allowed}

    try:
        # Upsert so it works even if the profiles row doesn't exist yet
        supabase.table("profiles").upsert({
            "id": user_id,
            "role": "worker",
            **update_fields,
        }).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"success": True, "message": "Profile updated"}


from fastapi import UploadFile, File

@router.post("/provider/profile/photo")
async def upload_provider_photo(file: UploadFile = File(...)):
    # In a real app, upload to storage bucket
    return {"success": True, "photo_url": f"https://mock-storage.com/{file.filename}"}


@router.get("/provider/reviews")
async def get_provider_reviews(
    provider_id: str, 
    page: int = 1, 
    limit: int = 5,
    rating: Optional[int] = None,
    filter: Optional[str] = None,
    sort: Optional[str] = "newest"
):
    reviews = [
        {
            "id": "rev_1",
            "customer_name": "Ahmed Usman",
            "customer_initials": "AU",
            "service_type": "AC filter clean",
            "date": "2026-05-21",
            "rating": 5,
            "text": "Bahut acha kaam kiya! Punctual tha aur AC bilkul theek ho gaya. Definitely recommend karunga.",
            "provider_reply": None,
            "tags": ["Punctual", "Professional", "Fair price"],
            "helpful_count": 12,
            "created_at": "2026-05-21T10:00:00Z"
        },
        {
            "id": "rev_2",
            "customer_name": "Sara Khan",
            "customer_initials": "SK",
            "service_type": "AC gas refill",
            "date": "2026-05-20",
            "rating": 5,
            "text": "Very professional. Came on time, explained everything clearly. Price was fair. Will book again.",
            "provider_reply": "Shukria Sara ji! It was a pleasure serving you.",
            "tags": ["On time", "Transparent pricing"],
            "helpful_count": 8,
            "created_at": "2026-05-20T10:00:00Z"
        },
        {
            "id": "rev_3",
            "customer_name": "Bilal Ahmed",
            "customer_initials": "BA",
            "service_type": "AC installation",
            "date": "2026-05-19",
            "rating": 4,
            "text": "Good work overall. Took a bit longer than expected but the quality was solid. No complaints.",
            "provider_reply": None,
            "tags": ["Quality work", "Slightly slow"],
            "helpful_count": 5,
            "created_at": "2026-05-19T10:00:00Z"
        }
    ]
    
    if rating:
        reviews = [r for r in reviews if r["rating"] == rating]
    if filter == "unanswered":
        reviews = [r for r in reviews if r["provider_reply"] is None]
        
    if sort == "lowest":
        reviews.sort(key=lambda x: x["rating"])
    elif sort == "oldest":
        reviews.sort(key=lambda x: x["created_at"])
    else: # newest
        reviews.sort(key=lambda x: x["created_at"], reverse=True)

    return {
        "summary": {
            "average": 4.7,
            "total": 212,
            "breakdown": { "5": 165, "4": 30, "3": 11, "2": 4, "1": 2 },
            "ranking": "Top 5% of providers"
        },
        "reviews": reviews,
        "total": 212,
        "page": page
    }


@router.get("/provider/reviews/metrics")
async def get_provider_review_metrics(provider_id: str):
    return {
        "would_recommend": 96,
        "punctuality": 4.9,
        "value_for_money": 4.8
    }


class ReplyRequest(BaseModel):
    reply_text: str

@router.post("/provider/reviews/{review_id}/reply")
async def reply_to_review(review_id: str, req: ReplyRequest):
    return {"success": True, "message": "Reply posted successfully", "reply": req.reply_text}


@router.post("/reviews/{review_id}/helpful")
async def mark_review_helpful(review_id: str):
    return {"success": True, "message": "Marked as helpful"}


class ProviderAIChatRequest(BaseModel):
    message: str
    provider_id: str

@router.post("/provider/ai-chat")
async def provider_ai_chat(req: ProviderAIChatRequest):
    text = req.message.lower()
    
    if "requests" in text or "nayi" in text:
        return {
            "success": True,
            "type": "jobs",
            "message": "Aaj aapke paas 2 nayi requests hain:",
            "data": [
                {
                    "id": "req_1",
                    "service": "AC service request",
                    "customer": "Ahmed Usman",
                    "location": "G-13/2",
                    "distance": "2.1 km",
                    "time": "Today 10:00 AM",
                    "price": "PKR 1,200",
                    "is_new": True
                },
                {
                    "id": "req_2",
                    "service": "AC gas refill",
                    "customer": "Zara Hassan",
                    "location": "F-8/3",
                    "distance": "4.2 km",
                    "time": "Tomorrow 9:00 AM",
                    "price": "PKR 1,500",
                    "is_new": True
                }
            ]
        }
    elif "kamai" in text or "earnings" in text:
        return {
            "success": True,
            "type": "earnings",
            "message": "Is hafte (19–25 May) ki kamai:",
            "data": {
                "total_earned": "PKR 8,400",
                "jobs_done": 7,
                "today_pending": "PKR 1,200",
                "increase_percentage": "+18%"
            }
        }
    elif "accept" in text:
        return {
            "success": True,
            "type": "accepted",
            "message": "Request accepted!",
            "data": {
                "customer": "Ahmed Usman",
                "service": "AC service request",
                "booking_id": "BK-20250521-001",
                "time": "Today 10:00 AM",
                "location": "G-13/2"
            }
        }
    else:
        return {
            "success": True,
            "type": "text",
            "message": "Main samajh nahi paya. Kya aap tafseel se bta sakte hain?"
        }

@router.post("/provider/jobs/{job_id}/request-review")
async def request_review(job_id: str, channel: str = "wa", timing: str = "now"):
    return {
        "success": True,
        "message": f"Review request for job {job_id} sent via {channel} at {timing}"
    }

@router.get("/provider/jobs/{job_id}/details")
async def get_job_details(job_id: str):
    # Mock data that would populate ViewDetailsConfirmedModal or ViewCompletedJobModal
    return {
        "success": True,
        "job": {
            "id": job_id,
            "title": "AC service — filter clean",
            "status": "confirmed",
            "customer": {
                "name": "Sara Khan",
                "phone": "0302-xxx-xxxx",
                "rating": 4.9,
                "bookings": 7
            },
            "location": "G-13/4, Islamabad",
            "time": "Today · 2:00 PM",
            "price": "PKR 1,500",
            "platform_fee": 75,
            "net_earning": 1425,
            "notes": "AC filter needs cleaning. Has been 6 months since last service."
        }
    }
