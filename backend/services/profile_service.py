from typing import Dict, Any, List
from services.ai_service import ai_service
from services.career_matching import compare_all_careers

def analyze_student_profile(profile: Dict[str, Any], student_id: int) -> Dict[str, Any]:
    """
    Synthesize student background and return:
    - profile_summary (Exact requested phrasing: 'Your profile shows a strong foundation in software development with growing experience in AI and web technologies.')
    - strengths (Key demonstrated capabilities)
    - interests (Student's selected areas)
    - current_level (e.g. 'Aspiring Junior Software Engineer • Pre-Final Year')
    - 5 possible career paths with alignment scores and recommendations
    """
    skills = profile.get("skills", {})
    programming_languages = skills.get("programmingLanguages", [])
    technical_skills = skills.get("technicalSkills", [])
    tools = skills.get("tools", [])

    # Calculate profile strength score (0-100 baseline)
    score = 50
    if len(programming_languages) >= 3:
        score += 12
    if len(technical_skills) >= 3:
        score += 8
    if len(tools) >= 2:
        score += 8
    if profile.get("projects"):
        score += min(len(profile["projects"]) * 6, 12)
    if profile.get("experience", {}).get("role"):
        score += 8
    profile_strength_score = min(score, 90)

    # Determine current academic & professional level
    year = profile.get("year", "3rd Year")
    degree = profile.get("degree", "B.Tech Computer Science")
    current_level = f"Aspiring Junior Software Engineer • {year}"

    # Extract distinct strengths
    strengths = []
    if programming_languages:
        strengths.append(f"Polyglot programming foundations ({', '.join(programming_languages[:3])})")
    if technical_skills:
        strengths.append(f"Core computer science concepts ({', '.join(technical_skills[:2])})")
    if profile.get("projects"):
        strengths.append(f"Practical project implementation ({len(profile['projects'])} built portfolios)")
    if profile.get("experience", {}).get("role"):
        strengths.append("Demonstrated internship/collaborative engineering experience")

    # Generate summary
    profile_summary = ai_service.generate_profile_summary(profile)

    # 5 possible career paths
    possible_career_paths = compare_all_careers(profile)

    return {
        "student_id": student_id,
        "profile_summary": profile_summary,
        "strengths": strengths,
        "interests": profile.get("interests", []),
        "current_level": current_level,
        "profile_strength_score": profile_strength_score,
        "possible_career_paths": possible_career_paths
    }
