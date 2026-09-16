# CareerMatrix AI

> **"Don't ask AI to choose your career. Ask it to show you what each path would require."**

CareerMatrix AI is an AI-powered student career decision-support system designed to help undergraduate students and early engineers evaluate realistic career trajectories, benchmark skill gaps against enterprise standards, and follow actionable 30/60/90-day learning roadmaps.

---

## 🌟 Core Product Principles

- **Decision Support, NOT a Predictor**: CareerMatrix does not dictate what career a student "should" choose. It provides transparent compatibility indicators, empowering students with clear trade-offs and autonomy.
- **Transparent Alignment Scoring**: Alignment percentages reflect objective skill and keyword overlap, not black-box predictions or employment guarantees.
- **Actionable Roadmaps**: Breaks ambiguity into tangible 30-day Foundation, 60-day Build, and 90-day Deploy milestones with a concrete "Next Best Action".

---

## 🚀 The 4-Stage Decision Workflow

```
[CURRENT PROFILE] ➔ [POSSIBLE CAREERS] ➔ [SKILL GAPS] ➔ [ACTION PLAN]
```

1. **Student Profile**: Ingests degree, branch, year, technical skills, projects, experience, and interests.
2. **AI Profile Synthesis**: Generates diagnostic profile strength scores and summary.
3. **Career Matrix**: Compares 5 realistic pathways (Full Stack, AI/ML, Data Analyst, Python, Cloud/DevOps).
4. **Skill Gap Matrix**: Visualizes dual-track current vs. required skills categorized into **HIGH**, **MEDIUM**, and **LOW** priorities with "Why It Matters" reasoning.
5. **30/60/90-Day Roadmap**: Interactive milestone checklists, progress meters, and Next Best Action blueprints.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** + **Vite**
- **Modern Vanilla CSS** (CSS Variables, Flexbox, CSS Grid, Glassmorphism, Micro-interactions)
- **Lucide React** (Crisp vector icons)
- Responsive for laptops, tablets, and mobile devices

### Backend
- **Python 3** + **FastAPI**
- **SQLite** + **SQLAlchemy ORM**
- **Pydantic v2** for schema validation
- **CORS** middleware enabled
- **Swagger / OpenAPI** documentation at `/docs`
- AI service abstraction with deterministic offline fallback

---

## 📁 Repository Structure

```
CareerMatrix/
├── .gitignore                      # Universal git ignore for frontend, backend, env & DBs
├── README.md                       # Comprehensive documentation & setup guides
│
├── frontend/                       # React 19 + Vite Frontend
│   ├── index.html                  # HTML entrypoint
│   ├── package.json                # NPM packages & scripts
│   ├── package-lock.json           # Locked dependency tree
│   ├── vite.config.js              # Vite server & API proxy config
│   ├── .oxlintrc.json              # Linter configuration
│   ├── public/                     # Static assets & favicons
│   │   ├── favicon.svg
│   │   └── icons.svg
│   └── src/
│       ├── App.jsx                 # Main application coordinator
│       ├── App.css                 # Layout styles
│       ├── index.css               # Design tokens & modern stylesheet
│       ├── main.jsx                # React root bootstrap
│       ├── assets/                 # Component images & graphics
│       ├── components/             # Reusable UI widgets
│       │   ├── Header.jsx          # Top navigation with live backend indicator
│       │   ├── Sidebar.jsx         # Collapsible navigation drawer
│       │   ├── WorkflowProgress.jsx # Step indicator
│       │   ├── PipelineBanner.jsx  # 4-stage pipeline banner
│       │   └── Footer.jsx          # Footer & disclaimer
│       ├── pages/                  # Workflow pages (Landing, Profile, Analysis, Matrix, SkillGap, Roadmap, Login)
│       ├── services/
│       │   └── api.js              # Full-stack API integration client
│       └── data/
│           └── mockData.js         # Student sample baselines & datasets
│
└── backend/                        # FastAPI + SQLite Backend
    ├── main.py                     # FastAPI app, routers, CORS & error handling
    ├── database.py                 # SQLite database engine & session dependency
    ├── models.py                   # SQLAlchemy models
    ├── schemas.py                  # Pydantic schemas for request & response validation
    ├── career_data.py              # Structured dataset for 5 career pathways
    ├── test_backend.py             # Automated end-to-end API test suite
    ├── requirements.txt            # Python dependencies
    ├── .env.example                # Sample environment configuration
    └── services/
        ├── ai_service.py           # AI abstraction layer with deterministic fallback
        ├── profile_service.py      # Profile synthesis & level classification
        ├── career_matching.py      # Deterministic alignment formula with interest weighting
        ├── skill_gap.py            # High/Med/Low gap prioritization and reasoning
        └── roadmap.py              # 30/60/90-day roadmap & Next Best Action generator
```

---

## ⚡ Quick Start

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **Python** (v3.10+ recommended)

---

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
python -m uvicorn main:app --reload --port 8000
```

- API Base: `http://localhost:8000`
- Interactive OpenAPI Docs: `http://localhost:8000/docs`
- Healthcheck: `http://localhost:8000/api/health`

---

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

- Frontend App: `http://localhost:5173`

---

## 🧪 Running Backend Tests

```bash
python backend/test_backend.py
```

Validates all 8 endpoints:
1. `GET /api/health`
2. `POST /api/profile`
3. `GET /api/profile/{id}`
4. `POST /api/analyze/{student_id}`
5. `POST /api/careers/compare/{student_id}`
6. `POST /api/careers/select`
7. `POST /api/skill-gap`
8. `POST /api/roadmap`

---

## 🛡️ Prototype Disclaimer

> *CareerMatrix provides alignment indicators based on the information provided. It does not predict career outcomes or guarantee employment.*
