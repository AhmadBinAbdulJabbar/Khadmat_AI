from typing import Dict, List


PROVIDERS = [
    {
        "id": "p_ac_ali",
        "name": "Ali AC Services",
        "category": "AC Technician",
        "area": "G-13",
        "city": "Islamabad",
        "rating": 4.7,
        "total_jobs": 212,
        "is_available": True,
        "price": "PKR 800-1500",
        "slots": ["10:00 AM", "12:30 PM", "4:00 PM"],
        "distances": {"G-13": 2.1, "G-11": 3.1, "F-10": 4.2},
    },
    {
        "id": "p_ac_hassan",
        "name": "Hassan Cooling Co.",
        "category": "AC Technician",
        "area": "G-11",
        "city": "Islamabad",
        "rating": 4.3,
        "total_jobs": 96,
        "is_available": True,
        "price": "PKR 700-1200",
        "slots": ["11:00 AM", "3:00 PM"],
        "distances": {"G-13": 3.4, "G-11": 1.2, "F-10": 3.0},
    },
    {
        "id": "p_ac_karim",
        "name": "Karim AC Repair",
        "category": "AC Technician",
        "area": "F-10",
        "city": "Islamabad",
        "rating": 4.5,
        "total_jobs": 89,
        "is_available": False,
        "price": "PKR 900-1800",
        "slots": ["6:00 PM"],
        "distances": {"G-13": 4.1, "F-10": 1.0},
    },
    {
        "id": "p_elec_rehman",
        "name": "Rehman Electricals",
        "category": "Electrician",
        "area": "G-13",
        "city": "Islamabad",
        "rating": 4.8,
        "total_jobs": 148,
        "is_available": True,
        "price": "PKR 600-1200",
        "slots": ["9:00 AM", "2:00 PM", "7:00 PM"],
        "distances": {"G-13": 0.8, "G-11": 2.9, "F-10": 4.9},
    },
    {
        "id": "p_plumb_master",
        "name": "Master Plumbers PK",
        "category": "Plumber",
        "area": "DHA",
        "city": "Karachi",
        "rating": 4.6,
        "total_jobs": 177,
        "is_available": True,
        "price": "PKR 500-1000",
        "slots": ["10:00 AM", "1:00 PM", "5:00 PM"],
        "distances": {"DHA": 3.2, "Clifton": 5.4},
    },
    {
        "id": "p_tutor_city",
        "name": "City Tutor Network",
        "category": "Tutor",
        "area": "Clifton",
        "city": "Karachi",
        "rating": 4.9,
        "total_jobs": 143,
        "is_available": True,
        "price": "PKR 800-2000",
        "slots": ["4:00 PM", "6:00 PM"],
        "distances": {"Clifton": 1.4, "DHA": 2.8},
    },
]


def discover_providers(intent: Dict[str, object]) -> List[Dict[str, object]]:
    service_type = str(intent["service_type"])
    area = str(intent["area"])
    preferred_slot = str(intent["preferred_slot"])

    matches = [provider for provider in PROVIDERS if provider["category"] == service_type]
    source = matches or PROVIDERS
    enriched = []

    for provider in source:
        distances = provider["distances"]
        distance_km = distances.get(area, 6.5 if provider["city"] == intent["city"] else 18.0)
        slots = provider["slots"]
        slot = preferred_slot if preferred_slot in slots else slots[0]
        enriched.append(
            {
                **provider,
                "distance_km": round(float(distance_km), 1),
                "distance": f"{float(distance_km):.1f} km",
                "time": slot,
            }
        )

    return enriched
