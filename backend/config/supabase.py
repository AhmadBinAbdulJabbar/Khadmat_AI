import os
from typing import Optional

from supabase import Client, create_client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
SUPABASE_SERVICE_KEY: str = os.getenv("SUPABASE_SERVICE_KEY", "")
SUPABASE_ANON_KEY: str = os.getenv("SUPABASE_ANON_KEY", "")
MOCK_MODE: bool = os.getenv("KHADMAT_MOCK_MODE", "true").lower() == "true"

# Service-role client: used server-side only when real Supabase secrets exist.
# Hackathon demos run in mock mode so the API can boot without private keys.
supabase: Optional[Client] = None
if SUPABASE_URL and SUPABASE_SERVICE_KEY:
    supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
elif not MOCK_MODE:
    raise RuntimeError("SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in .env")
