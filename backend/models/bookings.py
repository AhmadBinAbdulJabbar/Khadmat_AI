from pydantic import BaseModel


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
