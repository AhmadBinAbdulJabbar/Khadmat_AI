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

@router.get("/bookings")
async def customer_bookings(user_id: str = None):
    # Mock data based on the design template
    return {
        "bookings": [
            {
                "id": "b1",
                "service_type": "AC Technician",
                "provider_name": "Ali AC Services",
                "city": "Islamabad",
                "area": "G-13",
                "price": "PKR 1,200",
                "status": "Confirmed",
                "date": "Thu 21 May 2026",
                "time": "10:00 AM",
                "full_address": "G-13/2, Islamabad",
                "provider_rating": "4.7",
                "booking_ref": "BK-20250521-001",
                "payment_status": "Pending"
            },
            {
                "id": "b2",
                "service_type": "Electrician",
                "provider_name": "Rehman Electricals",
                "city": "Islamabad",
                "area": "G-13",
                "price": "PKR 900",
                "status": "Completed",
                "date": "Mon 12 May 2026",
                "time": "2:00 PM",
                "full_address": "G-13, Islamabad",
                "provider_rating": "4.8",
                "booking_ref": "BK-20250512-008",
                "payment_status": "Paid"
            },
            {
                "id": "b3",
                "service_type": "Plumber",
                "provider_name": "Master Plumbers Pk",
                "city": "Karachi",
                "area": "DHA",
                "price": "PKR 650",
                "status": "Completed",
                "date": "Fri 9 May 2026",
                "time": "9:00 AM",
                "full_address": "DHA, Karachi",
                "provider_rating": "4.6",
                "booking_ref": "BK-20250509-005",
                "payment_status": "Paid"
            },
            {
                "id": "b4",
                "service_type": "Cleaner",
                "provider_name": "HomeClean Pro",
                "city": "Lahore",
                "area": "DHA",
                "price": "PKR 600-1,200",
                "status": "Cancelled",
                "date": "Tue 6 May 2026",
                "time": "9:00 AM",
                "full_address": "DHA, Lahore",
                "provider_rating": "4.8",
                "booking_ref": "BK-20250506-003",
                "payment_status": "Refund pending"
            }
        ]
    }
