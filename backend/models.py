import datetime
from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from database import Base

class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    degree = Column(String(255), nullable=False)
    branch = Column(String(255), nullable=False)
    year = Column(String(100), nullable=False)
    
    # Structured JSON fields storing lists/dicts
    skills = Column(JSON, default=dict)           # {"programmingLanguages": [...], "technicalSkills": [...], "tools": [...]}
    projects = Column(JSON, default=list)         # [{"name": "...", "description": "...", "technologies": "..."}]
    experience = Column(JSON, default=dict)       # {"role": "...", "organization": "...", "duration": "..."}
    interests = Column(JSON, default=list)        # ["Web Development", "AI/ML", ...]
    career_interests = Column(JSON, default=list) # ["Full Stack Developer", ...]
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    analyses = relationship("Analysis", back_populates="student", cascade="all, delete-orphan")
    roadmaps = relationship("Roadmap", back_populates="student", cascade="all, delete-orphan")


class CareerPath(Base):
    __tablename__ = "career_paths"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(255), unique=True, nullable=False, index=True)
    description = Column(Text, nullable=False)
    required_skills = Column(JSON, default=list)    # [{"name": "React", "targetScore": 80, "category": "Frontend"}]
    importance_levels = Column(JSON, default=dict)  # {"high": [...], "medium": [...], "low": [...]}


class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    student_id = Column(Integer, ForeignKey("student_profiles.id"), nullable=False, index=True)
    career_name = Column(String(255), nullable=False)
    alignment_score = Column(Float, nullable=False)
    matching_skills = Column(JSON, default=list)
    missing_skills = Column(JSON, default=list)
    reasoning = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    student = relationship("StudentProfile", back_populates="analyses")


class Roadmap(Base):
    __tablename__ = "roadmaps"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    student_id = Column(Integer, ForeignKey("student_profiles.id"), nullable=False, index=True)
    career_name = Column(String(255), nullable=False)
    day_30 = Column(JSON, default=dict)  # {"phase": "30 DAYS — FOUNDATION", "tasks": [...]}
    day_60 = Column(JSON, default=dict)  # {"phase": "60 DAYS — BUILD", "tasks": [...]}
    day_90 = Column(JSON, default=dict)  # {"phase": "90 DAYS — DEPLOY", "tasks": [...]}
    next_best_action = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    student = relationship("StudentProfile", back_populates="roadmaps")
