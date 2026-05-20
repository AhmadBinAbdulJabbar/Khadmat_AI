import re
from typing import Dict


def parse_intent(message: str) -> Dict[str, object]:
    text = message.lower().strip()

    if re.search(r"[\u0600-\u06FF]", message):
        language = "Urdu"
    elif re.search(r"\b(mujhe|chahiye|kal|subah|shaam|mein|dhund)\b", text):
        language = "Roman Urdu"
    else:
        language = "English"

    service_type = "General Home Service"
    service_keywords = [
        ("AC Technician", ["ac", "a.c", "air conditioner", "cooling", "اے سی"]),
        ("Plumber", ["plumber", "pipe", "leak", "paani", "پلمبر", "پانی"]),
        ("Electrician", ["electrician", "bijli", "wiring", "light", "بجلی"]),
        ("Tutor", ["tutor", "teacher", "tuition", "ustad", "ٹیوٹر"]),
        ("Beautician", ["beautician", "salon", "makeup", "mehndi", "بیوٹیشن"]),
        ("Cleaner", ["cleaner", "cleaning", "safai", "صفائی"]),
    ]
    for service, keywords in service_keywords:
        if any(keyword in text for keyword in keywords):
            service_type = service
            break

    area = "G-13"
    city = "Islamabad"
    location_patterns = [
        ("G-13", "Islamabad", ["g-13", "g13", "g 13", "جی 13", "جی تیرہ"]),
        ("G-11", "Islamabad", ["g-11", "g11", "g 11", "جی 11"]),
        ("F-10", "Islamabad", ["f-10", "f10", "f 10", "ایف 10"]),
        ("Clifton", "Karachi", ["clifton", "کلفٹن"]),
        ("DHA", "Karachi", ["dha karachi", "defence karachi"]),
        ("Gulberg", "Lahore", ["gulberg", "گلبرگ"]),
    ]
    for candidate_area, candidate_city, aliases in location_patterns:
        if any(alias in text for alias in aliases):
            area = candidate_area
            city = candidate_city
            break

    if "karachi" in text or "کراچی" in text:
        city = "Karachi"
    if "lahore" in text or "لاہور" in text:
        city = "Lahore"
    if "islamabad" in text or "اسلام آباد" in text:
        city = "Islamabad"

    if "tomorrow" in text or "kal" in text or "کل" in text:
        day = "Tomorrow"
    elif "today" in text or "aaj" in text or "آج" in text:
        day = "Today"
    else:
        day = "Next available day"

    if any(token in text for token in ["evening", "shaam", "sham", "رات", "شام"]):
        part = "evening"
        preferred_slot = "6:00 PM"
    elif any(token in text for token in ["afternoon", "dupehar", "دوپہر"]):
        part = "afternoon"
        preferred_slot = "2:00 PM"
    else:
        part = "morning"
        preferred_slot = "10:00 AM"

    return {
        "service_type": service_type,
        "location": f"{area}, {city}",
        "area": area,
        "city": city,
        "time": f"{day} {part}",
        "preferred_slot": preferred_slot,
        "language": language,
        "confidence": 0.9 if service_type != "General Home Service" else 0.72,
        "original_text": message,
    }
