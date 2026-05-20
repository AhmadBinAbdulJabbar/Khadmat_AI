from typing import Dict


def schedule_followup(intent: Dict[str, object], provider: Dict[str, object]) -> Dict[str, Dict[str, str]]:
    return {
        "reminder": {
            "trigger_at": "1 hour before appointment",
            "message": f"Reminder scheduled before {provider['name']} visits {intent['location']}.",
        },
        "follow_up": {
            "status_update": f"Provider notification queued for {provider['name']}.",
            "completion_check": (
                f"After {provider['time']}, system will confirm whether the "
                f"{intent['service_type']} job was completed and request a rating."
            ),
        },
    }
