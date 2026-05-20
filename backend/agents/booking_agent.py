import uuid
from datetime import datetime
from typing import Dict


def create_booking(intent: Dict[str, object], provider: Dict[str, object]) -> Dict[str, object]:
    today = datetime.utcnow().strftime("%Y%m%d")
    booking_ref = f"BK-{today}-{uuid.uuid4().hex[:3].upper()}"

    return {
        "booking_ref": booking_ref,
        "status": "CONFIRMED",
        "provider_id": provider["id"],
        "provider_name": provider["name"],
        "service_type": intent["service_type"],
        "scheduled_time": f"{intent['time']} {provider['time']}",
        "slot": provider["time"],
        "location": intent["location"],
        "price_estimate": provider["price"],
        "confirmation_message": (
            f"Confirmed: {provider['name']} for {intent['service_type']} "
            f"at {provider['time']} in {intent['location']}."
        ),
    }
