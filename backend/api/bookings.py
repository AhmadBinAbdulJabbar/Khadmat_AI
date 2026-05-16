from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import uuid

router = APIRouter()

class BookingRequest(BaseModel):
    service_type: str
    description: str
    location: str
    date: str
    time: str
    phone: str

class BookingStatusUpdate(BaseModel):
    status: str

class RatingRequest(BaseModel):
    rating: int
    review_text: str

@router.post("/bookings")
async def create_booking(req: BookingRequest):
    """
    MVP: Create a new manual booking
    """
    if not req.service_type or not req.location or not req.phone:
        raise HTTPException(status_code=400, detail="Missing required fields")

    booking_id = str(uuid.uuid4())
    return {
        "success": True,
        "booking": {
            "id": booking_id,
            "service_type": req.service_type,
            "status": "pending",
            "message": "Booking received! An AI agent is finding the best provider for you."
        }
    }

@router.get("/bookings")
async def list_bookings(user_id: str = None, status: str = None, page: int = 1, limit: int = 4, search: str = None):
    """
    MVP: List user bookings with pagination and filters
    """
    return {
        "bookings": [
            {
                "id": "b1",
                "booking_ref": "BK-20260521-001",
                "service_type": "AC Technician",
                "provider_name": "Ali AC Services",
                "area": "G-13",
                "city": "Islamabad",
                "scheduled_time": "Thu 21 May 2026 10:00 AM",
                "status": "CONFIRMED",
                "price_estimate": "PKR 800-1500",
                "reminder": "Reminder set 9 AM"
            },
            {
                "id": "b2",
                "booking_ref": "BK-20260512-008",
                "service_type": "Plumber",
                "provider_name": "Master Plumbers Pk",
                "area": "DHA",
                "city": "Karachi",
                "scheduled_time": "Mon 12 May 2026 11:00 AM",
                "status": "COMPLETED",
                "price_estimate": "PKR 650"
            },
            {
                "id": "b3",
                "booking_ref": "BK-20260509-005",
                "service_type": "Electrician",
                "provider_name": "Rehman Electricals",
                "area": "G-13",
                "city": "Islamabad",
                "scheduled_time": "Fri 9 May 2026 2:00 PM",
                "status": "COMPLETED",
                "price_estimate": "PKR 900"
            },
            {
                "id": "b4",
                "booking_ref": "BK-20260506-003",
                "service_type": "Cleaner",
                "provider_name": "HomeClean Pro",
                "area": "DHA",
                "city": "Lahore",
                "scheduled_time": "Tue 6 May 2026 9:00 AM",
                "status": "CANCELLED",
                "price_estimate": "PKR 600-1200"
            }
        ],
        "total": 12,
        "page": page,
        "limit": limit,
        "pages": 3
    }

@router.get("/bookings/stats")
async def booking_stats(user_id: str = None):
    """
    MVP: Get booking stats
    """
    return {
        "total": 12,
        "confirmed": 3,
        "completed": 8,
        "cancelled": 1,
        "pending": 0
    }

@router.get("/bookings/{id}")
async def get_booking(id: str):
    """
    MVP: Get booking by ID
    """
    return {
        "id": id,
        "booking_ref": f"BK-20260521-{str(uuid.uuid4())[:3].upper()}",
        "service_type": "AC Technician",
        "provider": {
            "id": "p1",
            "name": "Ali AC Services",
            "category": "AC Technician",
            "area": "G-13",
            "city": "Islamabad",
            "rating": 4.7,
            "phone": "0300-1234567",
            "distance": 2.1
        },
        "scheduled_time": "2026-05-21T10:00:00",
        "area": "G-13",
        "status": "CONFIRMED",
        "price_estimate": "PKR 800 – 1,500",
        "reminder": {
            "trigger_at": "2026-05-21T09:00:00",
            "message": "Your AC technician appointment is in 1 hour"
        },
        "created_at": "2026-05-20T12:00:00"
    }

@router.patch("/bookings/{id}/status")
async def update_booking_status(id: str, req: BookingStatusUpdate):
    """
    MVP: Update booking status
    """
    return {
        "success": True,
        "booking_id": id,
        "status": req.status
    }

@router.post("/bookings/{id}/rate")
async def rate_booking(id: str, req: RatingRequest):
    """
    MVP: Rate a completed booking
    """
    return {
        "success": True,
        "message": "Rating submitted successfully"
    }
