from fastapi import APIRouter

router = APIRouter()

@router.get("/dashboard")
async def customer_dashboard(user_id: str = None):
    # Returns combined mock data for the customer dashboard
    return {
        "user": {
            "name": "Muhammad Umair",
            "email": "umairbwp202@gmail.com",
            "location": "Islamabad, Pakistan",
            "initials": "MU",
            "date": "Thursday, 21 May 2026"
        },
        "stats": {
            "total_bookings": 12,
            "total_spent": 14200,
            "reviews_given": 8,
            "avg_rating": 4.6,
            "saved_providers": 4
        },
        "upcoming_booking": {
            "title": "AC Technician \u2014 Ali AC Services",
            "time": "Today at 10:00 AM \u00b7 G-13, Islamabad",
            "price": "PKR 1,200",
            "provider_initials": "AA"
        },
        "recent_bookings": [
            {
                "service": "AC Technician",
                "provider": "Ali AC Services \u00b7 21 May",
                "price": "PKR 1,200",
                "status": "Confirmed"
            },
            {
                "service": "Electrician",
                "provider": "Rehman Electricals \u00b7 12 May",
                "price": "PKR 900",
                "status": "Completed"
            },
            {
                "service": "Plumber",
                "provider": "Master Plumbers \u00b7 5 May",
                "price": "PKR 650",
                "status": "Completed"
            },
            {
                "service": "Cleaner",
                "provider": "HomeClean Pro \u00b7 28 Apr",
                "price": "PKR 800",
                "status": "Cancelled"
            }
        ],
        "saved_providers": [
            {
                "name": "Ali AC Services",
                "category": "AC Technician \u00b7 \u2B50 4.7",
                "initials": "AA"
            },
            {
                "name": "Rehman Electricals",
                "category": "Electrician \u00b7 \u2B50 4.8",
                "initials": "RE"
            },
            {
                "name": "Master Plumbers Pk",
                "category": "Plumber \u00b7 \u2B50 4.6",
                "initials": "MP"
            },
            {
                "name": "City Tutor Network",
                "category": "Tutor \u00b7 \u2B50 4.9",
                "initials": "CT"
            }
        ]
    }
