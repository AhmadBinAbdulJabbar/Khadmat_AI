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


@router.get("/provider/jobs")
async def provider_jobs(provider_id: str, status: Optional[str] = None, limit: int = 5):
    return [
        {
            "id": "req_1",
            "title": "AC service request",
            "type": "new",
            "customer": "Ahmed Usman",
            "location": "G-13/2",
            "time": "Today 10:00 AM",
            "price": "PKR 1,200 est."
        },
        {
            "id": "req_2",
            "title": "AC gas refill",
            "type": "confirmed",
            "customer": "Sara Khan",
            "location": "G-13/4",
            "time": "Today 2:00 PM",
            "price": "PKR 1,500"
        },
        {
            "id": "req_3",
            "title": "AC installation",
            "type": "completed",
            "customer": "Bilal Ahmed",
            "location": "F-10/1",
            "time": "Yesterday 11:00 AM",
            "price": "PKR 2,200"
        }
    ]


@router.get("/provider/notifications/count")
async def get_notification_count(provider_id: str):
    return {"unread": 3}
