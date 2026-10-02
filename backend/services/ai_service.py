import os
import json
import logging
from typing import Dict, Any, List, Optional
import httpx
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger("careermatrix.ai_service")

class AIService:
    """
    AI service integration for CareerMatrix AI powered by Google Gemini API.
    Stateless processing of real user profile inputs.
    """

    def __init__(self):
        self.api_key = (
            os.getenv("GEMINI_API_KEY", "").strip() or 
            os.getenv("AI_API_KEY", "").strip()
        )
        self.has_ai = bool(self.api_key and len(self.api_key) > 5)

    def _call_gemini(self, prompt: str, system_instruction: str = "") -> Optional[str]:
        """Make a direct HTTP request to the Gemini API."""
        if not self.has_ai:
            return None

        model_candidates = [
            "gemini-1.5-flash",
            "gemini-2.0-flash",
            "gemini-1.5-pro"
        ]

        payload = {
            "contents": [
                {"parts": [{"text": prompt}]}
            ],
            "generationConfig": {
                "temperature": 0.2,
                "maxOutputTokens": 2000
            }
        }

        if system_instruction:
            payload["systemInstruction"] = {
                "parts": [{"text": system_instruction}]
            }

        for model in model_candidates:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={self.api_key}"
            try:
                with httpx.Client(timeout=20.0) as client:
                    res = client.post(
                        url,
                        json=payload,
                        headers={"Content-Type": "application/json"}
                    )
                    if res.status_code == 200:
                        data = res.json()
                        candidates = data.get("candidates", [])
                        if candidates:
                            parts = candidates[0].get("content", {}).get("parts", [])
                            if parts:
                                return parts[0].get("text", "").strip()
                    else:
                        logger.warning(f"Gemini {model} returned HTTP {res.status_code}: {res.text[:150]}")
            except Exception as e:
                logger.warning(f"Gemini connection error on {model}: {e}")

        return None

    def _clean_json(self, text: str) -> str:
        clean = text.strip()
        if clean.startswith("```json"):
            clean = clean[7:]
        elif clean.startswith("```"):
            clean = clean[3:]
        if clean.endswith("```"):
            clean = clean[:-3]
        return clean.strip()

    def _extract_skills(self, profile: Dict[str, Any]) -> List[str]:
        skills = profile.get("skills", {})
        all_skills = []
        if isinstance(skills, dict):
            for cat in ["programmingLanguages", "technicalSkills", "tools"]:
                for item in skills.get(cat, []):
                    if item and isinstance(item, str):
                        all_skills.append(item.strip())
        elif isinstance(skills, list):
            for item in skills:
                if item and isinstance(item, str):
                    all_skills.append(item.strip())
        return all_skills

    def generate_full_career_matrix(self, profile: Dict[str, Any]) -> Dict[str, Any]:
        """Generate the complete dynamic career matrix for a real user using Gemini AI."""
        degree = profile.get("degree") or profile.get("education", {}).get("degree") or "Undergraduate Degree"
        branch = profile.get("branch") or profile.get("education", {}).get("branch") or ""
        year = profile.get("year") or profile.get("education", {}).get("year") or "Current Student"
        all_skills = self._extract_skills(profile)
        interests = profile.get("interests", [])
        career_interests = profile.get("career_interests") or profile.get("careerInterests", [])
        projects = profile.get("projects", [])

        prompt = (
            f"You are the CareerMatrix AI advisor. Analyze this real student profile and generate a complete personalized Career Matrix.\n\n"
            f"STUDENT INPUT:\n"
            f"- Degree: {degree} ({branch})\n"
            f"- Academic Year: {year}\n"
            f"- Submitted Skills: {', '.join(all_skills) if all_skills else 'None declared'}\n"
            f"- Interests: {', '.join(interests) if interests else 'General Computing'}\n"
            f"- Target Career Interests: {', '.join(career_interests) if career_interests else 'Open'}\n"
            f"- Reported Projects: {len(projects)} projects ({', '.join([p.get('name', '') for p in projects if isinstance(p, dict)])})\n\n"
            f"REQUIREMENTS:\n"
            f"1. Generate a 1-2 sentence diagnostic profile summary and 3-4 bullet strengths based strictly on their actual input.\n"
            f"2. Generate 3 to 5 suitable career pathways ranked by realistic alignment score (20 to 95%).\n"
            f"3. For each pathway, identify matching skills, missing skills, effort level, and a concise objective reasoning.\n"
            f"4. Provide a skill gap breakdown categorized into HIGH, MEDIUM, and LOW priorities with 1 sentence explaining why each skill matters in industry.\n"
            f"5. Provide a tailored 30/60/90-day roadmap with specific tasks and a concrete Next Best Action.\n\n"
            f"Return ONLY a valid JSON object strictly matching this structure:\n"
            f"{{\n"
            f"  \"profile_summary\": \"...\",\n"
            f"  \"strengths\": [\"strength 1\", \"strength 2\", \"strength 3\"],\n"
            f"  \"current_level\": \"...\",\n"
            f"  \"profile_strength_score\": 75,\n"
            f"  \"careers\": [\n"
            f"    {{\n"
            f"      \"career_name\": \"...\",\n"
            f"      \"alignment_score\": 85.0,\n"
            f"      \"matching_skills\": [\"...\"],\n"
            f"      \"missing_skills\": [\"...\"],\n"
            f"      \"reasoning\": \"...\",\n"
            f"      \"effort_level\": \"Medium\",\n"
            f"      \"first_recommended_action\": \"...\"\n"
            f"    }}\n"
            f"  ],\n"
            f"  \"skill_gap\": {{\n"
            f"    \"skills\": [\n"
            f"      {{\n"
            f"        \"skill_name\": \"...\",\n"
            f"        \"current_skill_level\": \"Beginner\" | \"Intermediate\" | \"Strong\",\n"
            f"        \"required_skill_level\": \"Intermediate\" | \"Strong\",\n"
            f"        \"gap\": \"On Track\" | \"Action Needed\",\n"
            f"        \"priority\": \"HIGH\" | \"MEDIUM\" | \"LOW\",\n"
            f"        \"reason\": \"...\",\n"
            f"        \"current_score\": 40,\n"
            f"        \"required_score\": 85,\n"
            f"        \"category\": \"Core\"\n"
            f"      }}\n"
            f"    ],\n"
            f"    \"priority_breakdown\": {{\n"
            f"      \"high\": [ {{\"name\": \"...\", \"currentLevel\": \"...\", \"targetLevel\": \"...\", \"whyItMatters\": \"...\", \"tag\": \"HIGH\"}} ],\n"
            f"      \"medium\": [ ... ],\n"
            f"      \"low\": [ ... ]\n"
            f"    }}\n"
            f"  }},\n"
            f"  \"roadmap\": {{\n"
            f"    \"day_30\": {{\n"
            f"      \"phase\": \"30 DAYS — FOUNDATION\",\n"
            f"      \"theme\": \"...\",\n"
            f"      \"milestone_goal\": \"...\",\n"
            f"      \"tasks\": [{{\"id\": \"t-30-1\", \"title\": \"...\", \"desc\": \"...\"}}]\n"
            f"    }},\n"
            f"    \"day_60\": {{\n"
            f"      \"phase\": \"60 DAYS — BUILD\",\n"
            f"      \"theme\": \"...\",\n"
            f"      \"milestone_goal\": \"...\",\n"
            f"      \"tasks\": [{{\"id\": \"t-60-1\", \"title\": \"...\", \"desc\": \"...\"}}]\n"
            f"    }},\n"
            f"    \"day_90\": {{\n"
            f"      \"phase\": \"90 DAYS — DEPLOY & INTERVIEW\",\n"
            f"      \"theme\": \"...\",\n"
            f"      \"milestone_goal\": \"...\",\n"
            f"      \"tasks\": [{{\"id\": \"t-90-1\", \"title\": \"...\", \"desc\": \"...\"}}]\n"
            f"    }},\n"
            f"    \"next_best_action\": {{\n"
            f"      \"headline\": \"...\",\n"
            f"      \"detail\": \"...\"\n"
            f"    }}\n"
            f"  }}\n"
            f"}}\n"
        )

        ai_text = self._call_gemini(prompt)
        if ai_text:
            try:
                parsed = json.loads(self._clean_json(ai_text))
                if "careers" in parsed and len(parsed["careers"]) >= 3:
                    return parsed
            except Exception as e:
                logger.warning(f"Failed to parse full Gemini response: {e}")

        return self._generate_fallback(profile, all_skills, degree, year, interests)

    def generate_skill_gap_analysis(self, profile: Dict[str, Any], career_name: str) -> Dict[str, Any]:
        """Dynamic skill gap analysis for a chosen career."""
        all_skills = self._extract_skills(profile)
        degree = profile.get("degree") or profile.get("education", {}).get("degree") or "Engineering"
        year = profile.get("year") or profile.get("education", {}).get("year") or "Undergraduate"

        prompt = (
            f"Perform a skill gap analysis for a student targeting '{career_name}':\n"
            f"Degree: {degree} ({year}), Skills: {', '.join(all_skills) if all_skills else 'Basics'}\n"
            f"Return JSON format:\n"
            f"{{\n"
            f"  \"alignment_score\": 75.0,\n"
            f"  \"skills\": [\n"
            f"    {{\"skill_name\": \"...\", \"current_skill_level\": \"Beginner\"|\"Intermediate\"|\"Strong\", \"required_skill_level\": \"Strong\", \"gap\": \"On Track\"|\"Action Needed\", \"priority\": \"HIGH\"|\"MEDIUM\"|\"LOW\", \"reason\": \"...\", \"current_score\": 40, \"required_score\": 85, \"category\": \"Core\"}}\n"
            f"  ],\n"
            f"  \"priority_breakdown\": {{\n"
            f"    \"high\": [ {{\"name\": \"...\", \"currentLevel\": \"...\", \"targetLevel\": \"...\", \"whyItMatters\": \"...\", \"tag\": \"HIGH\"}} ],\n"
            f"    \"medium\": [ ... ],\n"
            f"    \"low\": [ ... ]\n"
            f"  }}\n"
            f"}}"
        )
        ai_text = self._call_gemini(prompt)
        if ai_text:
            try:
                parsed = json.loads(self._clean_json(ai_text))
                if "skills" in parsed:
                    return parsed
            except Exception:
                pass

        # Fallback
        return self.generate_full_career_matrix(profile).get("skill_gap", {})

    def generate_personalized_roadmap(self, profile: Dict[str, Any], career_name: str) -> Dict[str, Any]:
        """Dynamic 30/60/90-day roadmap for a chosen career."""
        all_skills = self._extract_skills(profile)
        degree = profile.get("degree") or profile.get("education", {}).get("degree") or "Engineering"

        prompt = (
            f"Generate a customized 30/60/90-Day roadmap for a student aiming for '{career_name}'.\n"
            f"Degree: {degree}, Skills: {', '.join(all_skills) if all_skills else 'Basics'}\n"
            f"Return JSON: {{\"day_30\": {{\"phase\": \"30 DAYS — FOUNDATION\", \"theme\": \"...\", \"milestone_goal\": \"...\", \"tasks\": [{{\"id\": \"t1\", \"title\": \"...\", \"desc\": \"...\"}}]}}, \"day_60\": {{\"phase\": \"60 DAYS — BUILD\", \"theme\": \"...\", \"milestone_goal\": \"...\", \"tasks\": [{{\"id\": \"t2\", \"title\": \"...\", \"desc\": \"...\"}}]}}, \"day_90\": {{\"phase\": \"90 DAYS — DEPLOY\", \"theme\": \"...\", \"milestone_goal\": \"...\", \"tasks\": [{{\"id\": \"t3\", \"title\": \"...\", \"desc\": \"...\"}}]}}, \"next_best_action\": {{\"headline\": \"...\", \"detail\": \"...\"}}}}"
        )
        ai_text = self._call_gemini(prompt)
        if ai_text:
            try:
                parsed = json.loads(self._clean_json(ai_text))
                if "day_30" in parsed and "day_60" in parsed and "day_90" in parsed:
                    return parsed
            except Exception:
                pass

        # Fallback
        return self.generate_full_career_matrix(profile).get("roadmap", {})

    def _generate_fallback(self, profile, all_skills, degree, year, interests):
        skills_str = ", ".join(all_skills[:3]) if all_skills else "computing basics"
        summary = f"Your profile reflects academic foundations in {degree} ({year}) with verified skills in {skills_str}."
        
        strengths = []
        if all_skills:
            strengths.append(f"Demonstrated skills in {', '.join(all_skills[:3])}")
        else:
            strengths.append(f"Foundational coursework in {degree}")
        if interests:
            strengths.append(f"Targeted exploration in {', '.join(interests[:2])}")
        strengths.append(f"Structured progress towards {year} milestone")

        careers = [
            {
                "career_name": "Full Stack Developer",
                "alignment_score": 75.0 if any(s.lower() in ["javascript", "html", "css", "react", "python"] for s in all_skills) else 50.0,
                "matching_skills": [s for s in all_skills if s.lower() in ["python", "javascript", "html", "css", "sql", "git"]],
                "missing_skills": ["Backend APIs", "Authentication", "Cloud Deployment"],
                "reasoning": f"Alignment based on your submitted proficiency in {skills_str}.",
                "effort_level": "Medium",
                "first_recommended_action": "Build a full-stack CRUD application with REST API endpoints."
            },
            {
                "career_name": "AI/ML Engineer",
                "alignment_score": 80.0 if any(s.lower() in ["python", "sql", "r", "c++"] for s in all_skills) else 45.0,
                "matching_skills": [s for s in all_skills if s.lower() in ["python", "sql", "r", "c++", "data structures"]],
                "missing_skills": ["Model Optimization", "PyTorch / TensorFlow", "MLOps"],
                "reasoning": f"Matches your background in programming and interest in analytical computing.",
                "effort_level": "High",
                "first_recommended_action": "Implement a machine learning classification pipeline with Pandas and Scikit-Learn."
            },
            {
                "career_name": "Data Analyst",
                "alignment_score": 70.0 if any(s.lower() in ["sql", "python", "r", "tableau", "excel"] for s in all_skills) else 40.0,
                "matching_skills": [s for s in all_skills if s.lower() in ["sql", "python", "r", "tableau", "excel"]],
                "missing_skills": ["Advanced BI Dashboards", "Statistical Modeling", "ETL Pipelines"],
                "reasoning": f"Synergistic with your analytical coursework and data skills.",
                "effort_level": "Medium",
                "first_recommended_action": "Create an end-to-end interactive dashboard analyzing a public dataset."
            }
        ]
        careers.sort(key=lambda x: x["alignment_score"], reverse=True)

        return {
            "profile_summary": summary,
            "strengths": strengths,
            "current_level": f"Student • {year}",
            "profile_strength_score": min(40 + len(all_skills) * 10, 90),
            "careers": careers,
            "skill_gap": {
                "skills": [
                    {"skill_name": "Core Architecture", "current_skill_level": "Intermediate", "required_skill_level": "Strong", "gap": "Action Needed", "priority": "HIGH", "reason": "Fundamental for building production applications.", "current_score": 50, "required_score": 85, "category": "Core"},
                    {"skill_name": "API & Services", "current_skill_level": "Beginner", "required_skill_level": "Strong", "gap": "Action Needed", "priority": "HIGH", "reason": "Required for server-side logic and database connectivity.", "current_score": 35, "required_score": 85, "category": "Backend"},
                    {"skill_name": "Version Control", "current_skill_level": "Intermediate", "required_skill_level": "Intermediate", "gap": "On Track", "priority": "MEDIUM", "reason": "Collaborative team engineering standard.", "current_score": 70, "required_score": 75, "category": "Tools"}
                ],
                "priority_breakdown": {
                    "high": [{"name": "Core Architecture", "currentLevel": "Intermediate", "targetLevel": "Strong", "whyItMatters": "Fundamental for building production applications.", "tag": "HIGH"}],
                    "medium": [{"name": "Version Control", "currentLevel": "Intermediate", "targetLevel": "Intermediate", "whyItMatters": "Collaborative team engineering standard.", "tag": "MEDIUM"}],
                    "low": []
                }
            },
            "roadmap": {
                "day_30": {
                    "phase": "30 DAYS — FOUNDATION",
                    "theme": "Core Technical Principles",
                    "milestone_goal": "Master core syntax and build foundational components.",
                    "tasks": [{"id": "t1", "title": "Deepen language mastery", "desc": f"Focus on key paradigms in {skills_str}."}]
                },
                "day_60": {
                    "phase": "60 DAYS — BUILD",
                    "theme": "Applied Implementation",
                    "milestone_goal": "Build and connect an end-to-end practical project.",
                    "tasks": [{"id": "t2", "title": "Construct working project", "desc": "Implement core system logic and handle persistence."}]
                },
                "day_90": {
                    "phase": "90 DAYS — DEPLOY & INTERVIEW",
                    "theme": "Production & Portfolio",
                    "milestone_goal": "Deploy project live and prepare technical talking points.",
                    "tasks": [{"id": "t3", "title": "Deploy to public cloud", "desc": "Configure CI/CD and document architecture trade-offs."}]
                },
                "next_best_action": {
                    "headline": f"Build a practical capstone project integrating {skills_str}.",
                    "detail": "Focus on high-priority missing skills and commit continuous progress to GitHub."
                }
            }
        }

ai_service = AIService()
