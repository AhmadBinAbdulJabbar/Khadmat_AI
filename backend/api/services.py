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
    """
    Returns list of available service categories.
    Future: SELECT DISTINCT category FROM providers
    """
    return SERVICES_LIST
