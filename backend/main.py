import os
import sys
from typing import List
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from dotenv import load_dotenv

# Ensure local imports work whether launched from root or backend/
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database import engine, Base, get_db
import models
import schemas
from career_data import CAREER_DATA
from services.career_matching import compare_all_careers, compute_career_alignment
from services.profile_service import analyze_student_profile
from services.skill_gap import analyze_skill_gaps
from services.roadmap import generate_personalized_roadmap

# Load environment variables
load_dotenv()

# Create SQLite database tables on startup
Base.metadata.create_all(bind=engine)

# Seed CareerPath table if empty
def seed_career_paths():
    db = next(get_db())
    try:
        if db.query(models.CareerPath).count() == 0:
            for c_name, c_data in CAREER_DATA.items():
                career_entry = models.CareerPath(
                    name=c_name,
                    description=c_data["description"],
                    required_skills=c_data["required_skills"],
                    importance_levels={"effort": c_data["effort_level"]}
                )
                db.add(career_entry)
            db.commit()
    except Exception as e:
        db.rollback()
    finally:
        db.close()

seed_career_paths()

app = FastAPI(
    title="CareerMatrix AI API",
    description="Career decision-support system REST API for student pathways, skill gap analysis, and 30/60/90-day roadmaps.",
    version="1.0.0"
)

# CORS Configuration
allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]
env_origins = os.getenv("CORS_ORIGINS", "").split(",")
for o in env_origins:
    clean = o.strip()
    if clean and clean != "*" and clean not in allowed_origins:
        allowed_origins.append(clean)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------------------------------
# 1. Health Endpoint
# --------------------------------------------------------------------------
@app.get("/api/health", tags=["System"])
def health_check():
    """Healthcheck endpoint returning system operational status."""
    return {
        "status": "ok",
        "service": "CareerMatrix API"
    }

# --------------------------------------------------------------------------
# 2. Student Profile Endpoints
# --------------------------------------------------------------------------
@app.post("/api/profile", response_model=schemas.StudentProfileResponse, status_code=status.HTTP_201_CREATED, tags=["Profile"])
def save_student_profile(profile_in: schemas.StudentProfileCreate, db: Session = Depends(get_db)):
    """Save student profile including education, skills, projects, experience, and interests."""
    try:
        db_profile = models.StudentProfile(
            degree=profile_in.degree,
            branch=profile_in.branch,
            year=profile_in.year,
            skills=profile_in.skills.model_dump(),
            projects=[p.model_dump() for p in profile_in.projects],
            experience=profile_in.experience.model_dump() if profile_in.experience else {},
            interests=profile_in.interests,
            career_interests=profile_in.career_interests
        )
        db.add(db_profile)
        db.commit()
        db.refresh(db_profile)

        return schemas.StudentProfileResponse(
            id=db_profile.id,
            degree=db_profile.degree,
            branch=db_profile.branch,
            year=db_profile.year,
            skills=schemas.SkillsData(**(db_profile.skills or {})),
            projects=[schemas.ProjectItem(**p) for p in (db_profile.projects or [])],
            experience=schemas.ExperienceData(**(db_profile.experience or {})),
            interests=db_profile.interests or [],
            career_interests=db_profile.career_interests or [],
            created_at=db_profile.created_at
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to persist student profile: {str(e)}")

@app.get("/api/profile/{id}", response_model=schemas.StudentProfileResponse, tags=["Profile"])
def get_student_profile(id: int, db: Session = Depends(get_db)):
    """Return student profile by ID."""
    db_profile = db.query(models.StudentProfile).filter(models.StudentProfile.id == id).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail=f"Student profile with ID {id} not found.")

    return schemas.StudentProfileResponse(
        id=db_profile.id,
        degree=db_profile.degree,
        branch=db_profile.branch,
        year=db_profile.year,
        skills=schemas.SkillsData(**(db_profile.skills or {})),
        projects=[schemas.ProjectItem(**p) for p in (db_profile.projects or [])],
        experience=schemas.ExperienceData(**(db_profile.experience or {})),
        interests=db_profile.interests or [],
        career_interests=db_profile.career_interests or [],
        created_at=db_profile.created_at
    )

# --------------------------------------------------------------------------
# 3. AI Profile Analysis Endpoint
# --------------------------------------------------------------------------
@app.post("/api/analyze/{student_id}", response_model=schemas.ProfileAnalysisResponse, tags=["Analysis"])
def analyze_profile(student_id: int, db: Session = Depends(get_db)):
    """
    Analyze the student's profile and return:
    - profile summary
    - strengths
    - interests
    - current level
    - 5 possible career paths
    """
    db_profile = db.query(models.StudentProfile).filter(models.StudentProfile.id == student_id).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail=f"Student profile with ID {student_id} not found.")

    profile_dict = {
        "degree": db_profile.degree,
        "branch": db_profile.branch,
        "year": db_profile.year,
        "skills": db_profile.skills or {},
        "projects": db_profile.projects or [],
        "experience": db_profile.experience or {},
        "interests": db_profile.interests or [],
        "career_interests": db_profile.career_interests or []
    }

    result = analyze_student_profile(profile_dict, student_id)
    return schemas.ProfileAnalysisResponse(
        student_id=student_id,
        profile_summary=result["profile_summary"],
        strengths=result["strengths"],
        interests=result["interests"],
        current_level=result["current_level"],
        profile_strength_score=result["profile_strength_score"],
        possible_career_paths=[schemas.CareerComparisonItem(**c) for c in result["possible_career_paths"]]
    )

# --------------------------------------------------------------------------
# 4. Career Comparison Endpoint (Exactly 5 Pathways)
# --------------------------------------------------------------------------
@app.post("/api/careers/compare/{student_id}", response_model=schemas.CareerComparisonResponse, tags=["Careers"])
def compare_careers(student_id: int, db: Session = Depends(get_db)):
    """
    Compare exactly 5 career paths for a student profile.
    For each career return:
    - career name
    - alignment score (indicator, not prediction)
    - matching skills
    - missing skills
    - reasoning
    - effort level
    - first recommended action
    """
    db_profile = db.query(models.StudentProfile).filter(models.StudentProfile.id == student_id).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail=f"Student profile with ID {student_id} not found.")

    profile_dict = {
        "degree": db_profile.degree,
        "branch": db_profile.branch,
        "year": db_profile.year,
        "skills": db_profile.skills or {},
        "projects": db_profile.projects or [],
        "experience": db_profile.experience or {},
        "interests": db_profile.interests or [],
        "career_interests": db_profile.career_interests or []
    }

    comparisons = compare_all_careers(profile_dict)

    # Persist or update analysis records in SQLite
    for comp in comparisons:
        try:
            analysis_rec = models.Analysis(
                student_id=student_id,
                career_name=comp["career_name"],
                alignment_score=comp["alignment_score"],
                matching_skills=comp["matching_skills"],
                missing_skills=comp["missing_skills"],
                reasoning=comp["reasoning"]
            )
            db.add(analysis_rec)
        except Exception:
            pass
    try:
        db.commit()
    except Exception:
        db.rollback()

    return schemas.CareerComparisonResponse(
        student_id=student_id,
        careers=[schemas.CareerComparisonItem(**c) for c in comparisons]
    )

# --------------------------------------------------------------------------
# 5. Career Selection Endpoint
# --------------------------------------------------------------------------
@app.post("/api/careers/select", response_model=schemas.SelectCareerResponse, tags=["Careers"])
def select_career(req: schemas.SelectCareerRequest, db: Session = Depends(get_db)):
    """Student confirms selected career pathway for deeper skill gap and roadmap generation."""
    db_profile = db.query(models.StudentProfile).filter(models.StudentProfile.id == req.student_id).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail=f"Student profile with ID {req.student_id} not found.")

    if req.career_name not in CAREER_DATA:
        raise HTTPException(status_code=400, detail=f"Invalid career choice: {req.career_name}")

    return schemas.SelectCareerResponse(
        student_id=req.student_id,
        selected_career=req.career_name,
        status="selected",
        message=f"Career '{req.career_name}' selected. Ready for skill gap analysis."
    )

# --------------------------------------------------------------------------
# 6. Skill Gap Analysis Endpoint
# --------------------------------------------------------------------------
@app.post("/api/skill-gap", response_model=schemas.SkillGapResponse, tags=["Skill Gap"])
def get_skill_gap(req: schemas.SkillGapRequest, db: Session = Depends(get_db)):
    """
    Evaluates current vs required skill levels for selected career,
    categorizing priority levels (HIGH, MEDIUM, LOW) with contextual reasons.
    """
    db_profile = db.query(models.StudentProfile).filter(models.StudentProfile.id == req.student_id).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail=f"Student profile with ID {req.student_id} not found.")

    if req.career_name not in CAREER_DATA:
        raise HTTPException(status_code=400, detail=f"Invalid career: {req.career_name}")

    profile_dict = {
        "degree": db_profile.degree,
        "branch": db_profile.branch,
        "year": db_profile.year,
        "skills": db_profile.skills or {},
        "projects": db_profile.projects or [],
        "experience": db_profile.experience or {},
        "interests": db_profile.interests or [],
        "career_interests": db_profile.career_interests or []
    }

    result = analyze_skill_gaps(profile_dict, req.career_name, req.student_id)
    return schemas.SkillGapResponse(
        student_id=req.student_id,
        career_name=req.career_name,
        alignment_score=result["alignment_score"],
        skills=[schemas.SkillGapItem(**s) for s in result["skills"]],
        priority_breakdown=result["priority_breakdown"]
    )

# --------------------------------------------------------------------------
# 7. 30/60/90-Day Roadmap Endpoint
# --------------------------------------------------------------------------
@app.post("/api/roadmap", response_model=schemas.RoadmapResponse, tags=["Roadmap"])
def get_roadmap(req: schemas.RoadmapRequest, db: Session = Depends(get_db)):
    """
    Generates personalized 30/60/90-Day Roadmap and Next Best Action.
    """
    db_profile = db.query(models.StudentProfile).filter(models.StudentProfile.id == req.student_id).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail=f"Student profile with ID {req.student_id} not found.")

    if req.career_name not in CAREER_DATA:
        raise HTTPException(status_code=400, detail=f"Invalid career: {req.career_name}")

    profile_dict = {
        "degree": db_profile.degree,
        "branch": db_profile.branch,
        "year": db_profile.year,
        "skills": db_profile.skills or {},
        "projects": db_profile.projects or [],
        "experience": db_profile.experience or {},
        "interests": db_profile.interests or [],
        "career_interests": db_profile.career_interests or []
    }

    result = generate_personalized_roadmap(profile_dict, req.career_name, req.student_id)

    # Save generated roadmap to database
    try:
        db_roadmap = models.Roadmap(
            student_id=req.student_id,
            career_name=req.career_name,
            day_30=result["day_30"],
            day_60=result["day_60"],
            day_90=result["day_90"],
            next_best_action=result["next_best_action"]
        )
        db.add(db_roadmap)
        db.commit()
    except Exception:
        db.rollback()

    return schemas.RoadmapResponse(
        student_id=req.student_id,
        career_name=req.career_name,
        day_30=schemas.RoadmapPhase(**result["day_30"]),
        day_60=schemas.RoadmapPhase(**result["day_60"]),
        day_90=schemas.RoadmapPhase(**result["day_90"]),
        next_best_action=schemas.NextBestAction(**result["next_best_action"]),
        disclaimer=result["disclaimer"]
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
