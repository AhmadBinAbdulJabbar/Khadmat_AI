from fastapi import APIRouter
import uuid

from agents.orchestrator import process_service_request
from models.process import ProcessRequest

router = APIRouter()


@router.post("/process")
async def process_chat(req: ProcessRequest):
    session_id = req.session_id or f"sess_{uuid.uuid4().hex[:8]}"
    return process_service_request(req.message, session_id)
