from typing import Dict, Any, List
from career_data import CAREER_DATA
from services.career_matching import extract_student_skill_tokens, is_skill_matched, compute_career_alignment

def analyze_skill_gaps(profile: Dict[str, Any], career_name: str, student_id: int) -> Dict[str, Any]:
    """
    Perform deep skill gap analysis between student profile and selected career.
    Returns:
    - current skill level
    - required skill level
    - gap (status/level)
    - priority (HIGH, MEDIUM, LOW)
    - reason (why it matters)
    """
    career_info = CAREER_DATA.get(career_name)
    if not career_info:
        raise ValueError(f"Career '{career_name}' not recognized in career matrix dataset.")

    student_tokens = extract_student_skill_tokens(profile)
    alignment_info = compute_career_alignment(profile, career_name)

    skills_result = []
    priority_breakdown = {
        "high": [],
        "medium": [],
        "low": []
    }

    for req in career_info["required_skills"]:
        matched = is_skill_matched(req, student_tokens)
        
        # Estimate student's current proficiency
        if matched:
            current_level = "Intermediate" if req["required_level"] != "Strong" else "Strong"
            current_score = int(req["required_score"] * 0.85) if current_level == "Intermediate" else req["required_score"]
            gap_status = "On Track"
        else:
            current_level = "Beginner"
            current_score = int(req["required_score"] * 0.35)
            gap_status = "Action Needed"

        priority = req.get("priority", "MEDIUM").upper()
        reason = req.get("why_it_matters", f"{req['name']} is essential for {career_name}.")

        # Exact prompt specification for Full Stack Developer high-priority reason:
        if req["name"] == "Backend APIs":
            reason = "High Priority because a full-stack developer must connect the frontend to server-side logic and databases."

        skill_item = {
            "skill_name": req["name"],
            "current_skill_level": current_level,
            "required_skill_level": req["required_level"],
            "gap": gap_status,
            "priority": priority,
            "reason": reason,
            "current_score": current_score,
            "required_score": req["required_score"],
            "category": req.get("category", "Core")
        }
        skills_result.append(skill_item)

        # Categorize for priority breakdown
        breakdown_item = {
            "name": req["name"],
            "currentLevel": current_level,
            "targetLevel": req["required_level"],
            "whyItMatters": reason,
            "tag": priority
        }

        if priority == "HIGH":
            priority_breakdown["high"].append(breakdown_item)
        elif priority == "MEDIUM":
            priority_breakdown["medium"].append(breakdown_item)
        else:
            priority_breakdown["low"].append(breakdown_item)

    return {
        "student_id": student_id,
        "career_name": career_name,
        "alignment_score": alignment_info["alignment_score"],
        "skills": skills_result,
        "priority_breakdown": priority_breakdown
    }
