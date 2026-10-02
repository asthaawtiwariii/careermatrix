/**
 * CareerMatrix AI - Backend API Integration Client
 * Supports local development (http://localhost:8000) and production Render backend (VITE_API_URL).
 */

// Determine base API URL: Check VITE_API_URL environment variable first, then fallback
const envApiUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/+$/, "") : "";

const URL_CANDIDATES = envApiUrl 
  ? [`${envApiUrl}/api`, envApiUrl] 
  : [
      "/api",
      "http://127.0.0.1:8000/api",
      "http://localhost:8000/api"
    ];

let activeBaseUrl = envApiUrl ? `${envApiUrl}/api` : "/api";

export function getActiveApiUrl() {
  return activeBaseUrl;
}

export async function checkBackendHealth() {
  for (const candidate of URL_CANDIDATES) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const res = await fetch(`${candidate}/health`, { 
        method: "GET",
        signal: controller.signal 
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        activeBaseUrl = candidate;
        return data;
      }
    } catch (err) {
      // Continue to next candidate
    }
  }
  return null;
}

/**
 * Format frontend profile object for the backend request
 */
export function formatProfilePayload(profile) {
  return {
    degree: profile.education?.degree || "Undergraduate",
    branch: profile.education?.branch || "",
    year: profile.education?.year || "Current Student",
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
}

/**
 * POST /api/generate-matrix
 * Sends the real user profile to FastAPI -> Gemini AI and returns the full Career Matrix
 */
export async function generateCareerMatrix(profile) {
  try {
    const payload = formatProfilePayload(profile);
    const res = await fetch(`${activeBaseUrl}/generate-matrix`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error("Error in generateCareerMatrix:", err);
    throw err;
  }
}

/**
 * POST /api/skill-gap
 * Evaluates skill gaps for the user's selected career
 */
export async function fetchSkillGapOnBackend(profile, careerName) {
  try {
    const payload = {
      career_name: careerName,
      profile: formatProfilePayload(profile)
    };

    const res = await fetch(`${activeBaseUrl}/skill-gap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
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
 * Returns personalized 30/60/90-day roadmap for the user's selected career
 */
export async function fetchRoadmapOnBackend(profile, careerName) {
  try {
    const payload = {
      career_name: careerName,
      profile: formatProfilePayload(profile)
    };

    const res = await fetch(`${activeBaseUrl}/roadmap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error in fetchRoadmapOnBackend:", err);
    throw err;
  }
}
