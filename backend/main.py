from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import stats, services, auth, bookings, process, providers

app = FastAPI(
    title="Khadmat AI API",
    description="Backend for Pakistan's smartest home services platform",
    version="1.0.0",
)

# CORS — allow Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://*.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routers
app.include_router(stats.router, prefix="/api", tags=["Stats"])
app.include_router(services.router, prefix="/api", tags=["Services"])
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(bookings.router, prefix="/api", tags=["Bookings"])
app.include_router(process.router, prefix="/api", tags=["Chat Process"])
app.include_router(providers.router, prefix="/api", tags=["Providers"])


@app.get("/")
async def root():
    return {"message": "Khadmat AI API is running", "version": "1.0.0"}


@app.get("/health")
async def health():
    return {"status": "ok"}
