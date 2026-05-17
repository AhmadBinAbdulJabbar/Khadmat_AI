from fastapi import APIRouter

router = APIRouter()

SERVICES_LIST = [
    "AC Technician",
    "Plumber",
    "Electrician",
    "Tutor",
    "Cleaner",
    "Security",
    "Carpenter",
    "Painter",
]


@router.get("/services")
async def get_services():
    return SERVICES_LIST
