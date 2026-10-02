import os
import sys
import json
from fastapi.testclient import TestClient

# Ensure local imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from main import app

client = TestClient(app)

def test_stateless_real_users():
    print("\n" + "="*70)
    print("TESTING STATELESS REAL USER ARCHITECTURE (No Database)")
    print("="*70)

    # 1. Health check
    res_health = client.get("/api/health")
    assert res_health.status_code == 200, f"Health failed: {res_health.text}"
    print("[PASS] 1. Health check:", res_health.json())

    # ----------------------------------------------------------------
    # 2. USER A
    # ----------------------------------------------------------------
    user_a = {
        "degree": "B.Tech Computer Science & Engineering",
        "branch": "Computer Science",
        "year": "3rd Year",
        "skills": {
            "programmingLanguages": ["Python", "JavaScript", "SQL"],
            "technicalSkills": ["REST APIs", "Data Structures"],
            "tools": ["Git", "VS Code"]
        },
        "projects": [
            {"name": "AI Study Planner", "technologies": "Python, SQLite", "description": "Course planner"}
        ],
        "interests": ["AI and Web Development"],
        "career_interests": ["Full Stack Developer", "AI/ML Engineer"]
    }

    print("\n" + "-"*50)
    print("Testing USER A:")
    print("Education: B.Tech CSE")
    print("Skills: Python, SQL, JavaScript")
    print("Interests: AI and Web Development")
    print("-"*50)

    res_a = client.post("/api/generate-matrix", json=user_a)
    assert res_a.status_code == 200, f"User A matrix failed: {res_a.text}"
    matrix_a = res_a.json()

    print("\n[User A AI Summary]:", matrix_a["profile_summary"])
    print("[User A Strengths]:", matrix_a["strengths"])
    print("\n[User A Career Pathways]:")
    for c in matrix_a["careers"][:3]:
        print(f" -> {c['career_name']} ({c['alignment_score']}%) | Match: {c['matching_skills']} | Reason: {c['reasoning']}")

    # ----------------------------------------------------------------
    # 3. USER B
    # ----------------------------------------------------------------
    user_b = {
        "degree": "BCA (Bachelor of Computer Applications)",
        "branch": "Software Applications",
        "year": "2nd Year",
        "skills": {
            "programmingLanguages": ["Java", "HTML", "CSS"],
            "technicalSkills": ["Android Studio basics", "OOP"],
            "tools": ["Git", "IntelliJ"]
        },
        "projects": [
            {"name": "Task Manager App", "technologies": "Java, XML", "description": "Mobile todo application"}
        ],
        "interests": ["App Development"],
        "career_interests": ["Mobile App Developer", "Java Developer"]
    }

    print("\n" + "-"*50)
    print("Testing USER B:")
    print("Education: BCA")
    print("Skills: Java, HTML, CSS")
    print("Interests: App Development")
    print("-"*50)

    res_b = client.post("/api/generate-matrix", json=user_b)
    assert res_b.status_code == 200, f"User B matrix failed: {res_b.text}"
    matrix_b = res_b.json()

    print("\n[User B AI Summary]:", matrix_b["profile_summary"])
    print("[User B Strengths]:", matrix_b["strengths"])
    print("\n[User B Career Pathways]:")
    for c in matrix_b["careers"][:3]:
        print(f" -> {c['career_name']} ({c['alignment_score']}%) | Match: {c['matching_skills']} | Reason: {c['reasoning']}")

    # ----------------------------------------------------------------
    # 4. Assert Distinctness
    # ----------------------------------------------------------------
    print("\n" + "="*70)
    print("VERIFYING COMPLETE INDEPENDENCE AND DYNAMIC AI GENERATION:")
    print("="*70)
    assert matrix_a["profile_summary"] != matrix_b["profile_summary"], "Summaries must differ"
    assert matrix_a["strengths"] != matrix_b["strengths"], "Strengths must differ"
    print("[PASS] User A and User B received distinct, input-tailored AI results.")
    print(f"[PASS] User A matching skills: {matrix_a['careers'][0]['matching_skills']}")
    print(f"[PASS] User B matching skills: {matrix_b['careers'][0]['matching_skills']}")
    print("\nSTATELESS REAL-USER TESTING COMPLETE & PASSED!")

if __name__ == "__main__":
    test_stateless_real_users()
