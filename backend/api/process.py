from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
import uuid
import asyncio

router = APIRouter()

class ProcessRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    user_id: Optional[str] = None

@router.post("/process")
async def process_chat(req: ProcessRequest):
    """
    Simulates the AI chat processing pipeline (orchestrator + 5 agents)
    """
    session_id = req.session_id or f"sess_{uuid.uuid4().hex[:8]}"
    
    # Simulate processing delay
    await asyncio.sleep(2)
    
    # Mock response matching B-CHAT-01 specification
    return {
        "session_id": session_id,
        "intent": { 
            "service_type": "AC Technician", 
            "location": "G-13, Islamabad", 
            "time": "Tomorrow morning", 
            "language": "ur" 
        },
        "providers": [
            {
                "id": "p1",
                "name": "Ali AC Services",
                "rating": 4.7,
                "distance": "2.1 km",
                "time": "10:00 AM",
                "price": "PKR 800-1500"
            },
            {
                "id": "p2",
                "name": "Hassan Cooling Co.",
                "rating": 4.3,
                "distance": "3.4 km",
                "time": "11:00 AM",
                "price": "PKR 700-1200"
            }
        ],
        "selected_provider": {
            "id": "p1",
            "name": "Ali AC Services"
        },
        "booking": { 
            "booking_ref": f"BK-20260521-{uuid.uuid4().hex[:3].upper()}", 
            "status": "CONFIRMED"
        },
        "reminder": { 
            "trigger_at": "Tomorrow 9:00 AM", 
            "message": "Reminder set" 
        },
        "trace_steps": [
            {
                "agent_name": "Intent Agent",
                "status": "done",
                "detail": "Extracted: AC Technician · G-13 · Tomorrow morning",
                "tool_called": "parse_intent()"
            },
            {
                "agent_name": "Discovery Agent",
                "status": "done",
                "detail": "Found 3 providers in G-13, filtered 2 available",
                "tool_called": "search_providers()"
            },
            {
                "agent_name": "Decision Agent",
                "status": "done",
                "detail": "Ali AC: score 91 · Hassan: score 74. Ali selected.",
                "tool_called": "rank_providers()"
            },
            {
                "agent_name": "Booking Agent",
                "status": "done",
                "detail": "Booking written to Supabase",
                "tool_called": "create_booking()"
            },
            {
                "agent_name": "Follow-up Agent",
                "status": "done",
                "detail": "Reminder scheduled for tomorrow 9:00 AM",
                "tool_called": "schedule_reminder()"
            }
        ],
        "ai_response_text": "Samajh gaya! Main G-13 mein AC technicians dhundh raha hoon — kal subah ke liye. Ali AC Services ko book karun?"
    }
