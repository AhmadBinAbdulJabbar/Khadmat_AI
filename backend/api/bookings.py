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
