from typing import Dict, Any
from career_data import CAREER_DATA

def generate_personalized_roadmap(profile: Dict[str, Any], career_name: str, student_id: int) -> Dict[str, Any]:
    """
    Generate a personalized 30/60/90-Day Roadmap with:
    - 30-DAY FOUNDATION
    - 60-DAY BUILD
    - 90-DAY DEPLOY & PREPARE
    - Next Best Action
    - Mandatory non-prediction disclaimers
    """
    career_info = CAREER_DATA.get(career_name)
    if not career_info:
        raise ValueError(f"Career '{career_name}' not recognized in career dataset.")

    roadmap_template = career_info["roadmap"]
    next_best = career_info["next_best_action"]

    # Provide exact requested disclaimer:
    disclaimer = (
        "CareerMatrix provides alignment indicators based on the information provided. "
        "It does not predict career outcomes or guarantee employment."
    )

    return {
        "student_id": student_id,
        "career_name": career_name,
        "day_30": roadmap_template["day_30"],
        "day_60": roadmap_template["day_60"],
        "day_90": roadmap_template["day_90"],
        "next_best_action": next_best,
        "disclaimer": disclaimer
    }
