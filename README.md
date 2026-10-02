# CareerMatrix AI

> **"Don't ask AI to choose your career. Ask it to show you what each path would require."**

CareerMatrix AI is an AI-powered student career decision-support system designed to help undergraduate students and early engineers evaluate realistic career trajectories, benchmark skill gaps against enterprise standards, and follow actionable 30/60/90-day learning roadmaps powered by **Google Gemini AI**.

---

## 🌟 Core Product Principles

- **Decision Support, NOT a Predictor**: CareerMatrix does not dictate what career a student "should" choose. It provides transparent compatibility indicators, empowering students with clear trade-offs and autonomy.
- **Transparent Alignment Scoring**: Alignment percentages reflect objective skill and keyword overlap, not black-box predictions or employment guarantees.
- **Actionable Roadmaps**: Breaks ambiguity into tangible 30-day Foundation, 60-day Build, and 90-day Deploy milestones with a concrete "Next Best Action".
- **Real-User Stateless Architecture**: Dynamic generation tailored 100% to each user's submitted education, skills, projects, and interests.

---

## 🚀 The 4-Stage Decision Workflow

```
[CURRENT PROFILE] ➔ [POSSIBLE CAREERS] ➔ [SKILL GAPS] ➔ [ACTION PLAN]
```

1. **Student Profile**: Ingests degree, branch, year, technical skills, projects, and interests.
2. **AI Profile Synthesis**: Generates diagnostic profile strength scores, executive summary, and key strengths.
3. **Career Matrix**: Ranks 3 to 5 realistic pathways dynamically with alignment scores and reasoning.
4. **Skill Gap Matrix**: Visualizes current vs. required skills categorized into **HIGH**, **MEDIUM**, and **LOW** priorities with "Why It Matters" reasoning.
5. **30/60/90-Day Roadmap**: Milestone checklists and Next Best Action blueprint.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** + **Vite**
- **Modern Vanilla CSS** (CSS Variables, Flexbox, CSS Grid, Glassmorphism, Micro-interactions)
- **Lucide React** (Vector icons)
- Responsive for laptops, tablets, and mobile devices
- Deployable to **Vercel** (`VITE_API_URL`)

### Backend
- **Python 3** + **FastAPI**
- **Google Gemini API** (`GEMINI_API_KEY`)
- **Pydantic v2** for schema validation
- **CORS** configured for Vercel and local development
- **Swagger / OpenAPI** documentation at `/docs`
- Deployable to **Render**

---

## 📁 Repository Structure

```
Rootcause/
├── .gitignore
├── README.md
│
├── frontend/                       # React 19 + Vite Frontend
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx                 # Dynamic application state
│       ├── index.css               # Design system stylesheet
│       ├── main.jsx
│       ├── components/             # Reusable UI widgets
│       │   ├── Header.jsx
│       │   ├── Sidebar.jsx
│       │   ├── WorkflowProgress.jsx
│       │   ├── PipelineBanner.jsx
│       │   └── Footer.jsx
│       ├── pages/                  # Real-user pages
│       │   ├── LandingPage.jsx
│       │   ├── ProfilePage.jsx     # User input form
│       │   ├── AnalysisPage.jsx
│       │   ├── CareerMatrixPage.jsx
│       │   ├── SkillGapPage.jsx
│       │   └── RoadmapPage.jsx
│       ├── services/
│       │   └── api.js              # Stateless API client (VITE_API_URL)
│       └── data/
│           └── mockData.js         # Blank profile template & constants
│
└── backend/                        # Stateless FastAPI Backend
    ├── main.py                     # FastAPI routes & CORS
    ├── requirements.txt            # Python dependencies (fastapi, uvicorn, pydantic, httpx)
    ├── .env.example                # Sample environment configuration
    ├── .env                        # Local environment variables
    ├── test_stateless_users.py     # Real-user test suite
    └── services/
        └── ai_service.py           # Google Gemini AI generation pipeline
```

---

## 🚀 Local Quickstart

### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## ☁️ Deployment Guide

### Backend on Render:
1. Create a **Web Service** pointing to the `backend` directory.
2. Build Command: `pip install -r requirements.txt`
3. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Environment Variables:
   - `GEMINI_API_KEY` = `your_google_gemini_api_key`

### Frontend on Vercel:
1. Create a project pointing to the `frontend` directory.
2. Environment Variables:
   - `VITE_API_URL` = `https://your-backend-app.onrender.com`
