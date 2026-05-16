from fastapi import APIRouter

router = APIRouter()


@router.get("/stats/overview")
async def get_stats_overview():
    """
    Returns platform stats. MVP: hardcoded values.
    Future: query from bookings and providers tables.
    """
    return {
        "total_bookings": 5000,
        "total_providers": 200,
        "cities_count": 3,
    }
