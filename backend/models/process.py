from pydantic import BaseModel
from typing import Optional


class ProcessRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    user_id: Optional[str] = None
