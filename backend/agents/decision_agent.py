from typing import Dict, List


def rank_providers(intent: Dict[str, object], providers: List[Dict[str, object]]) -> List[Dict[str, object]]:
    ranked = []
    preferred_slot = str(intent["preferred_slot"])

    for provider in providers:
        distance = float(provider["distance_km"])
        slot = str(provider["time"])
        score = 0
        score += 30 if provider["category"] == intent["service_type"] else 8
        score += 28 if provider["is_available"] else -18
        score += max(0, 20 - distance * 2.5)
        score += float(provider["rating"]) * 4
        score += 8 if slot == preferred_slot else 3
        score += min(int(provider["total_jobs"]) / 45, 6)
        ranked.append(
            {
                **provider,
                "score": round(score),
                "reasons": [
                    provider["distance"],
                    f"{provider['rating']}/5 rating",
                    f"available at {slot}" if provider["is_available"] else f"not available until {slot}",
                    f"{provider['total_jobs']} completed jobs",
                ],
            }
        )

    ranked.sort(key=lambda item: item["score"], reverse=True)
    return ranked
