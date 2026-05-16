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
