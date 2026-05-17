from fastapi import APIRouter

router = APIRouter()


@router.get("/stats/overview")
async def get_stats_overview():
    return {
        "total_bookings": 5000,
        "total_providers": 200,
        "cities_count": 3,
    }
