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
├── backend/
│   ├── main.py                     # FastAPI app, routers, CORS & exception handling
│   ├── database.py                 # SQLite database engine & session dependency
│   ├── models.py                   # SQLAlchemy models (StudentProfile, CareerPath, Analysis, Roadmap)
│   ├── schemas.py                  # Pydantic models for request & response validation
│   ├── career_data.py              # Structured dataset for the 5 career pathways
│   ├── test_backend.py             # Automated end-to-end API test suite
│   ├── services/
│   │   ├── ai_service.py           # AI abstraction layer with deterministic fallback
│   │   ├── profile_service.py      # Profile synthesis & level classification
│   │   ├── career_matching.py      # Deterministic alignment formula with interest weighting
│   │   ├── skill_gap.py            # High/Med/Low gap prioritization and reasoning
│   │   └── roadmap.py              # 30/60/90-day roadmap & Next Best Action generator
│   ├── requirements.txt            # Python dependencies
│   └── .env.example                # Sample environment configuration
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Navigation header with breadcrumbs and fast-pass demo
│   │   ├── Footer.jsx              # Product principles & mandatory disclaimer
│   │   ├── Sidebar.jsx             # Collapsible SaaS dashboard sidebar
│   │   ├── WorkflowProgress.jsx    # Stepper workflow indicator
│   │   └── PipelineBanner.jsx      # Visual 4-phase decision pipeline banner
│   ├── pages/
│   │   ├── LandingPage.jsx         # Hero section with 3 core feature cards
│   │   ├── ProfilePage.jsx         # Multi-section student profile form
│   │   ├── AnalysisPage.jsx        # AI profile analysis and alignment scanner
│   │   ├── CareerMatrixPage.jsx    # 5 pathway comparison matrix with alignment rings
│   │   ├── SkillGapPage.jsx        # Dual-track skill bars & prioritized gaps
│   │   ├── RoadmapPage.jsx         # Connected 30/60/90-day interactive timeline
│   │   └── LoginPage.jsx           # Student / Judge 1-click authentication
│   ├── services/
│   │   └── api.js                  # Frontend API client connecting to FastAPI
│   ├── data/
│   │   └── mockData.js             # Initial student baseline & fallback datasets
│   ├── App.jsx                     # Root application coordinator
│   ├── main.jsx                    # Application entrypoint
│   └── index.css                   # Cohesive modern design tokens & stylesheet
├── package.json
├── index.html
└── README.md
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
# In the project root directory
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
