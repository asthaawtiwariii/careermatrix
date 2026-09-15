/**
 * CareerMatrix AI - Backend API Integration Client
 * Directly connects the frontend to the FastAPI endpoints at http://localhost:8000/api
 */

const API_BASE_URL = "http://localhost:8000/api";

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { method: "GET" });
    if (!res.ok) throw new Error("Health check failed");
    return await res.json();
  } catch (err) {
    console.warn("Backend healthcheck failed:", err.message);
    return null;
  }
}

/**
 * POST /api/profile
 * Saves student profile and returns created student record with unique ID
 */
export async function saveProfileToBackend(profile) {
  try {
    const payload = {
      degree: profile.education?.degree || "B.Tech Computer Science & Engineering",
      branch: profile.education?.branch || "Computer Science & Engineering",
      year: profile.education?.year || "3rd Year (Pre-Final)",
      skills: {
        programmingLanguages: profile.skills?.programmingLanguages || [],
        technicalSkills: profile.skills?.technicalSkills || [],
        tools: profile.skills?.tools || []
      },
      projects: (profile.projects || []).map(p => ({
        name: p.name || "",
        description: p.description || "",
        technologies: p.technologies || ""
      })),
      experience: {
        role: profile.experience?.role || "",
        organization: profile.experience?.organization || "",
        duration: profile.experience?.duration || ""
      },
      interests: profile.interests || [],
      career_interests: profile.careerInterests || profile.career_interests || []
    };

    const res = await fetch(`${API_BASE_URL}/profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error in saveProfileToBackend:", err);
    throw err;
  }
}

/**
 * GET /api/profile/{id}
 */
export async function getProfileFromBackend(studentId) {
  try {
    const res = await fetch(`${API_BASE_URL}/profile/${studentId}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error in getProfileFromBackend:", err);
    throw err;
  }
}

/**
 * POST /api/analyze/{student_id}
 * Analyzes the student's profile and returns:
 * - profile summary
 * - strengths
 * - interests
 * - current level
 * - 5 possible career paths
 */
export async function analyzeProfileOnBackend(studentId) {
  try {
    const res = await fetch(`${API_BASE_URL}/analyze/${studentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error in analyzeProfileOnBackend:", err);
    throw err;
  }
}

/**
 * POST /api/careers/compare/{student_id}
 * Compares exactly 5 career paths with alignment scores, matching & missing skills, reasoning, effort level, and first action.
 */
export async function compareCareersOnBackend(studentId) {
  try {
    const res = await fetch(`${API_BASE_URL}/careers/compare/${studentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error in compareCareersOnBackend:", err);
    throw err;
  }
}

/**
 * POST /api/careers/select
 * Selects a career pathway for student
 */
export async function selectCareerOnBackend(studentId, careerName) {
  try {
    const res = await fetch(`${API_BASE_URL}/careers/select`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_id: studentId, career_name: careerName })
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error in selectCareerOnBackend:", err);
    throw err;
  }
}

/**
 * POST /api/skill-gap
 * Returns visual skill comparison, priority levels (HIGH, MEDIUM, LOW), and reasons
 */
export async function fetchSkillGapOnBackend(studentId, careerName) {
  try {
    const res = await fetch(`${API_BASE_URL}/skill-gap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_id: studentId, career_name: careerName })
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error in fetchSkillGapOnBackend:", err);
    throw err;
  }
}

/**
 * POST /api/roadmap
 * Returns personalized 30/60/90-day roadmap and Next Best Action
 */
export async function fetchRoadmapOnBackend(studentId, careerName) {
  try {
    const res = await fetch(`${API_BASE_URL}/roadmap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_id: studentId, career_name: careerName })
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error in fetchRoadmapOnBackend:", err);
    throw err;
  }
}
