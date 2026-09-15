from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field
from datetime import datetime

# Skills schemas
class SkillsData(BaseModel):
    programmingLanguages: List[str] = Field(default_factory=list)
    technicalSkills: List[str] = Field(default_factory=list)
    tools: List[str] = Field(default_factory=list)

class ProjectItem(BaseModel):
    name: str
    description: str
    technologies: str

class ExperienceData(BaseModel):
    role: Optional[str] = ""
    organization: Optional[str] = ""
    duration: Optional[str] = ""

class StudentProfileCreate(BaseModel):
    degree: str
    branch: str
    year: str
    skills: SkillsData
    projects: List[ProjectItem] = Field(default_factory=list)
    experience: Optional[ExperienceData] = Field(default_factory=ExperienceData)
    interests: List[str] = Field(default_factory=list)
    career_interests: List[str] = Field(default_factory=list)

class StudentProfileResponse(BaseModel):
    id: int
    degree: str
    branch: str
    year: str
    skills: SkillsData
    projects: List[ProjectItem]
    experience: ExperienceData
    interests: List[str]
    career_interests: List[str]
    created_at: datetime

    class Config:
        from_attributes = True

# Career Comparison Schemas
class CareerComparisonItem(BaseModel):
    career_name: str
    alignment_score: float
    matching_skills: List[str]
    missing_skills: List[str]
    reasoning: str
    effort_level: str
    first_recommended_action: str

class CareerComparisonResponse(BaseModel):
    student_id: int
    careers: List[CareerComparisonItem]
    note: str = "Alignment scores are relative compatibility indicators, not guarantees or predictions."

# Profile Analysis Response
class ProfileAnalysisResponse(BaseModel):
    student_id: int
    profile_summary: str
    strengths: List[str]
    interests: List[str]
    current_level: str
    profile_strength_score: int
    possible_career_paths: List[CareerComparisonItem]

# Select Career Schemas
class SelectCareerRequest(BaseModel):
    student_id: int
    career_name: str

class SelectCareerResponse(BaseModel):
    student_id: int
    selected_career: str
    status: str = "selected"
    message: str

# Skill Gap Schemas
class SkillGapRequest(BaseModel):
    student_id: int
    career_name: str

class SkillGapItem(BaseModel):
    skill_name: str
    current_skill_level: str
    required_skill_level: str
    gap: str
    priority: str  # HIGH, MEDIUM, LOW
    reason: str
    current_score: int
    required_score: int
    category: Optional[str] = "General"

class SkillGapResponse(BaseModel):
    student_id: int
    career_name: str
    alignment_score: float
    skills: List[SkillGapItem]
    priority_breakdown: Dict[str, List[Dict[str, Any]]]

# Roadmap Schemas
class RoadmapRequest(BaseModel):
    student_id: int
    career_name: str

class RoadmapTask(BaseModel):
    id: str
    title: str
    desc: str

class RoadmapPhase(BaseModel):
    phase: str
    theme: str
    milestone_goal: str
    tasks: List[RoadmapTask]

class NextBestAction(BaseModel):
    headline: str
    detail: str

class RoadmapResponse(BaseModel):
    student_id: int
    career_name: str
    day_30: RoadmapPhase
    day_60: RoadmapPhase
    day_90: RoadmapPhase
    next_best_action: NextBestAction
    disclaimer: str = "CareerMatrix provides alignment indicators based on the information provided. It does not predict career outcomes or guarantee employment."
