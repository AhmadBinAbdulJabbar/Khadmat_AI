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

