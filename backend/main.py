import os
import sys
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

# Ensure local imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from services.ai_service import ai_service

load_dotenv()

app = FastAPI(
    title="CareerMatrix AI API",
    description="Stateless Career decision-support system REST API powered by Google Gemini.",
    version="1.0.0"
)

# --------------------------------------------------------------------------
# CORS Configuration (Vercel Frontend + Local Development)
# --------------------------------------------------------------------------
allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000"
]

env_origins = os.getenv("CORS_ORIGINS", "").split(",")
for o in env_origins:
    clean = o.strip()
    if clean and clean not in allowed_origins:
        allowed_origins.append(clean)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if "*" not in env_origins else ["*"],
    allow_origin_regex=r"https://.*\.vercel\.app|https?://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------------------------------
# Request & Response Schemas
# --------------------------------------------------------------------------
class UserProfileRequest(BaseModel):
    degree: str = Field(default="B.Tech Computer Science")
    branch: Optional[str] = Field(default="")
    year: str = Field(default="3rd Year")
    skills: Dict[str, List[str]] = Field(default_factory=dict)
    projects: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
    experience: Optional[Dict[str, Any]] = Field(default_factory=dict)
    interests: List[str] = Field(default_factory=list)
    career_interests: Optional[List[str]] = Field(default_factory=list)

class CareerPathItem(BaseModel):
    career_name: str
    alignment_score: float
    matching_skills: List[str]
    missing_skills: List[str]
    reasoning: str
    effort_level: str
    first_recommended_action: str

class FullMatrixResponse(BaseModel):
    profile_summary: str
    strengths: List[str]
    current_level: str
    profile_strength_score: int
    careers: List[CareerPathItem]
    skill_gap: Optional[Dict[str, Any]] = None
    roadmap: Optional[Dict[str, Any]] = None
    note: str = "Alignment scores are decision-support indicators based on your actual inputs."

class SkillGapRequest(BaseModel):
    career_name: str
    profile: UserProfileRequest

class RoadmapRequest(BaseModel):
    career_name: str
    profile: UserProfileRequest

# --------------------------------------------------------------------------
# 1. Health Endpoint
# --------------------------------------------------------------------------
@app.get("/api/health", tags=["System"])
def health_check():
    """Healthcheck endpoint for Render / monitoring."""
    return {
        "status": "ok",
        "service": "CareerMatrix AI API",
        "has_ai": ai_service.has_ai
    }

# --------------------------------------------------------------------------
# 2. Main Stateless AI Pipeline: Generate Full Career Matrix
# --------------------------------------------------------------------------
@app.post("/api/generate-matrix", response_model=FullMatrixResponse, tags=["Matrix"])
def generate_career_matrix(req: UserProfileRequest):
    """
    Accepts the actual user profile from the frontend, sends to Gemini AI,
    and returns a complete personalized Career Matrix.
    """
    try:
        profile_dict = req.model_dump()
        result = ai_service.generate_full_career_matrix(profile_dict)
        return FullMatrixResponse(
            profile_summary=result.get("profile_summary", "Profile analyzed successfully."),
            strengths=result.get("strengths", []),
            current_level=result.get("current_level", f"Student • {req.year}"),
            profile_strength_score=result.get("profile_strength_score", 75),
            careers=[CareerPathItem(**c) for c in result.get("careers", [])],
            skill_gap=result.get("skill_gap"),
            roadmap=result.get("roadmap")
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI generation failed: {str(e)}")

# --------------------------------------------------------------------------
# 3. Dynamic Skill Gap for a Selected Career
# --------------------------------------------------------------------------
@app.post("/api/skill-gap", tags=["Skill Gap"])
def get_skill_gap(req: SkillGapRequest):
    """Evaluates skill gaps for the user's chosen career."""
    try:
        profile_dict = req.profile.model_dump()
        result = ai_service.generate_skill_gap_analysis(profile_dict, req.career_name)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Skill gap analysis failed: {str(e)}")

# --------------------------------------------------------------------------
# 4. Dynamic Roadmap for a Selected Career
# --------------------------------------------------------------------------
@app.post("/api/roadmap", tags=["Roadmap"])
def get_roadmap(req: RoadmapRequest):
    """Generates personalized 30/60/90-Day Roadmap for the user's chosen career."""
    try:
        profile_dict = req.profile.model_dump()
        result = ai_service.generate_personalized_roadmap(profile_dict, req.career_name)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Roadmap generation failed: {str(e)}")
