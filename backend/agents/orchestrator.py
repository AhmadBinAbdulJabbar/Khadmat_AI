from datetime import datetime
from typing import Dict, List

from agents.booking_agent import create_booking
from agents.decision_agent import rank_providers
from agents.discovery_agent import discover_providers
from agents.followup_agent import schedule_followup
from agents.intent_agent import parse_intent


def trace(agent_name: str, detail: str, tool_called: str) -> Dict[str, str]:
    return {
        "agent_name": agent_name,
        "status": "done",
        "detail": detail,
        "tool_called": tool_called,
        "timestamp": datetime.utcnow().isoformat() + "Z",
    }


def process_service_request(message: str, session_id: str) -> Dict[str, object]:
    trace_steps: List[Dict[str, str]] = [
        trace(
            "Planner Agent",
            "Created workflow: understand intent, discover providers, rank options, book slot, schedule follow-up.",
            "antigravity.plan_workflow()",
        )
    ]

    intent = parse_intent(message)
    trace_steps.append(
        trace(
            "Intent Agent",
            (
                f"Extracted {intent['service_type']}, {intent['location']}, "
                f"{intent['time']}; language={intent['language']}."
            ),
            "parse_multilingual_intent()",
        )
    )

    discovered = discover_providers(intent)
    trace_steps.append(
        trace(
            "Discovery Agent",
            (
                f"Searched mock Maps/Places dataset for {intent['service_type']} "
                f"near {intent['location']}; found {len(discovered)} candidates."
            ),
            "mock_places_search()",
        )
    )

    providers = rank_providers(intent, discovered)
    selected = next((provider for provider in providers if provider["is_available"]), providers[0])
    trace_steps.append(
        trace(
            "Decision Agent",
            f"{selected['name']} selected with score {selected['score']}.",
            "rank_by_distance_availability_rating()",
        )
    )

    booking = create_booking(intent, selected)
    trace_steps.append(
        trace(
            "Booking Agent",
            f"Created mock booking {booking['booking_ref']} and generated confirmation receipt.",
            "create_mock_booking_record()",
        )
    )

    followup = schedule_followup(intent, selected)
    trace_steps.append(
        trace(
            "Follow-up Agent",
            "Scheduled reminder, provider status update, and post-job completion confirmation.",
            "schedule_reminder_and_completion_check()",
        )
    )

    reasoning = (
        f"{selected['name']} is the best match because it is {selected['distance']} away, "
        f"available at {selected['time']}, has a {selected['rating']} rating, "
        f"and has completed {selected['total_jobs']} jobs."
    )

    return {
        "session_id": session_id,
        "intent": intent,
        "providers": providers,
        "selected_provider": selected,
        "reasoning": reasoning,
        "booking": booking,
        "reminder": followup["reminder"],
        "follow_up": followup["follow_up"],
        "trace_steps": trace_steps,
        "ai_response_text": (
            f"Samajh gaya. {intent['location']} mein {intent['time']} ke liye "
            f"{intent['service_type']} chahiye. {reasoning} "
            f"Booking confirmed: {booking['booking_ref']}. Reminder schedule ho gaya hai."
        ),
    }
