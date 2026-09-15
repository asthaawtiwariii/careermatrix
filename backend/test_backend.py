"""
Test script validating CareerMatrix AI backend endpoints, SQLite persistence,
and decision-support logic.
"""
import sys
import os

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def run_tests():
    print("==================================================")
    print("Testing CareerMatrix AI Backend APIs")
    print("==================================================")

    # 1. Health Check
    res = client.get("/api/health")
    assert res.status_code == 200, f"Health check failed: {res.text}"
    print("[PASS] 1. GET /api/health ->", res.json())

    # 2. Save Student Profile
    sample_profile = {
        "degree": "B.Tech Computer Science & Engineering",
        "branch": "Computer Science & Engineering",
        "year": "3rd Year (Pre-Final)",
        "skills": {
            "programmingLanguages": ["Python", "JavaScript", "SQL", "C++"],
            "technicalSkills": ["REST APIs", "Data Structures", "HTML5 & CSS3", "OOP"],
            "tools": ["Git", "GitHub", "VS Code", "MySQL", "Postman"]
        },
        "projects": [
            {
                "name": "Campus Resource Portal",
                "description": "A web platform for college students to share notes.",
                "technologies": "JavaScript, HTML, CSS, Python, SQLite"
            },
            {
                "name": "Student Sentiment Classifier",
                "description": "NLP utility categorizing course feedback.",
                "technologies": "Python, Pandas, Scikit-learn"
            }
        ],
        "experience": {
            "role": "Frontend Intern",
            "organization": "EduTech Studio",
            "duration": "3 Months"
        },
        "interests": ["Web Development", "AI/ML", "Software Engineering"],
        "career_interests": ["Full Stack Developer", "Python Developer", "AI/ML Engineer"]
    }

    res = client.post("/api/profile", json=sample_profile)
    assert res.status_code == 201, f"Create profile failed: {res.text}"
    profile_data = res.json()
    student_id = profile_data["id"]
    print(f"[PASS] 2. POST /api/profile -> Created student_id: {student_id}")

    # 3. Get Student Profile
    res = client.get(f"/api/profile/{student_id}")
    assert res.status_code == 200, f"Get profile failed: {res.text}"
    print(f"[PASS] 3. GET /api/profile/{student_id} -> Retrievable from SQLite")

    # 4. AI Profile Analysis
    res = client.post(f"/api/analyze/{student_id}")
    assert res.status_code == 200, f"Analyze failed: {res.text}"
    analysis = res.json()
    assert "Your profile shows a strong foundation" in analysis["profile_summary"]
    assert len(analysis["possible_career_paths"]) == 5
    print(f"[PASS] 4. POST /api/analyze/{student_id} -> Summary: '{analysis['profile_summary'][:60]}...'")
    print(f"       Current Level: {analysis['current_level']}, Strength: {analysis['profile_strength_score']}%")

    # 5. Career Comparison (5 Pathways)
    res = client.post(f"/api/careers/compare/{student_id}")
    assert res.status_code == 200, f"Compare failed: {res.text}"
    comparison = res.json()
    assert len(comparison["careers"]) == 5
    print("[PASS] 5. POST /api/careers/compare/{student_id} -> Evaluated 5 pathways:")
    for c in comparison["careers"]:
        print(f"       - {c['career_name']}: {c['alignment_score']}% alignment (Effort: {c['effort_level']})")

    # 6. Select Career
    res = client.post("/api/careers/select", json={"student_id": student_id, "career_name": "Full Stack Developer"})
    assert res.status_code == 200, f"Select career failed: {res.text}"
    print("[PASS] 6. POST /api/careers/select -> Selected 'Full Stack Developer'")

    # 7. Skill Gap Analysis
    res = client.post("/api/skill-gap", json={"student_id": student_id, "career_name": "Full Stack Developer"})
    assert res.status_code == 200, f"Skill gap failed: {res.text}"
    skill_gap = res.json()
    assert len(skill_gap["skills"]) > 0
    assert len(skill_gap["priority_breakdown"]["high"]) > 0
    print(f"[PASS] 7. POST /api/skill-gap -> Analyzed {len(skill_gap['skills'])} skills:")
    for h in skill_gap["priority_breakdown"]["high"][:2]:
        print(f"       - High Priority: {h['name']} -> Why: '{h['whyItMatters'][:55]}...'")

    # 8. 30/60/90-Day Roadmap
    res = client.post("/api/roadmap", json={"student_id": student_id, "career_name": "Full Stack Developer"})
    assert res.status_code == 200, f"Roadmap failed: {res.text}"
    roadmap = res.json()
    assert "day_30" in roadmap and "day_60" in roadmap and "day_90" in roadmap
    assert "next_best_action" in roadmap
    print("[PASS] 8. POST /api/roadmap -> Generated 30/60/90 days plan:")
    print(f"       - 30 Days: {roadmap['day_30']['phase']} ({len(roadmap['day_30']['tasks'])} tasks)")
    print(f"       - 60 Days: {roadmap['day_60']['phase']} ({len(roadmap['day_60']['tasks'])} tasks)")
    print(f"       - 90 Days: {roadmap['day_90']['phase']} ({len(roadmap['day_90']['tasks'])} tasks)")
    print(f"       - Next Best Action: '{roadmap['next_best_action']['headline']}'")
    print(f"       - Disclaimer: '{roadmap['disclaimer'][:65]}...'")

    print("==================================================")
    print("ALL BACKEND APIS VERIFIED SUCCESSFULLY!")
    print("==================================================")

if __name__ == "__main__":
    run_tests()
