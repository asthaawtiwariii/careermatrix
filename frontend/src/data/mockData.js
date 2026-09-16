// Mock dataset for CareerMatrix AI decision-support platform

export const initialStudentProfile = {
  education: {
    degree: "B.Tech Computer Science & Engineering",
    branch: "Computer Science & Engineering",
    year: "3rd Year (Pre-Final)"
  },
  skills: {
    programmingLanguages: ["Python", "JavaScript", "SQL", "C++"],
    technicalSkills: ["Object-Oriented Programming", "REST APIs (Basics)", "Data Structures & Algorithms", "HTML5 / CSS3"],
    tools: ["Git & GitHub", "VS Code", "MySQL", "Postman", "Linux Basics"]
  },
  projects: [
    {
      id: "p1",
      name: "Campus Resource & Room Booking Portal",
      description: "A web platform enabling student societies to reserve lab venues, share lecture notes, and coordinate peer study sessions.",
      technologies: "JavaScript, HTML5, CSS3, Python, SQLite"
    },
    {
      id: "p2",
      name: "Student Feedback Sentiment Classifier",
      description: "A natural language processing utility analyzing end-of-semester course feedback comments to surface constructive suggestions.",
      technologies: "Python, Pandas, Scikit-learn, NLTK"
    }
  ],
  experience: {
    role: "Frontend Development Intern",
    organization: "EduTech Innovation Studio",
    duration: "3 Months (Part-time)"
  },
  interests: ["Web Development", "AI/ML", "Software Engineering", "Cloud"],
  careerInterests: ["Full Stack Developer", "Python Developer", "AI/ML Engineer"]
};

export const careerPathways = [
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    category: "Software Development",
    alignmentPercent: 82,
    badgeColor: "indigo",
    whyItMatches: "Strong programming foundation and web development interest.",
    strengths: "Python, JavaScript, SQL, basic web development",
    skillGaps: "Backend APIs, authentication, deployment",
    effort: "Medium",
    effortLevel: 2, // 1: Low, 2: Med, 3: High
    suggestedFirstStep: "Build a modular REST API with authentication and connect it to a React frontend.",
    profileStrengthScore: 84,
    skillsComparison: [
      { name: "HTML/CSS", current: "Strong", status: "match", currentScore: 90, requiredScore: 90, note: "Well versed in semantic markup and responsive CSS" },
      { name: "JavaScript", current: "Intermediate", status: "match", currentScore: 70, requiredScore: 85, note: "Solid with ES6 syntax, needs async depth" },
      { name: "React", current: "Beginner", status: "gap", currentScore: 35, requiredScore: 80, note: "Understands components, needs state hooks & routing" },
      { name: "Python", current: "Intermediate", status: "match", currentScore: 75, requiredScore: 70, note: "Good scripting and procedural fundamentals" },
      { name: "Backend/API", current: "Beginner", status: "gap", currentScore: 30, requiredScore: 85, note: "Needs REST standards, error handling, status codes" },
      { name: "SQL/Database", current: "Intermediate", status: "match", currentScore: 65, requiredScore: 75, note: "Queries and schema creation, needs indexing & ORMs" },
      { name: "Authentication", current: "Beginner", status: "gap", currentScore: 20, requiredScore: 80, note: "Needs JWT, sessions, cookie security, bcrypt" },
      { name: "Deployment", current: "Beginner", status: "gap", currentScore: 25, requiredScore: 75, note: "Needs cloud hosting, environment variables, CI/CD" },
      { name: "Git/GitHub", current: "Intermediate", status: "match", currentScore: 70, requiredScore: 75, note: "Familiar with branch management & pull requests" }
    ],
    priorities: {
      high: [
        {
          name: "Backend APIs",
          currentLevel: "Beginner",
          targetLevel: "Production-ready",
          whyItMatters: "High Priority because a full-stack developer must connect the frontend to server-side logic and databases.",
          tag: "Core Architecture"
        },
        {
          name: "React",
          currentLevel: "Beginner",
          targetLevel: "Intermediate / Component-Driven",
          whyItMatters: "High Priority because declarative UI and state management are industry standards for modern dynamic web applications.",
          tag: "Frontend Standard"
        },
        {
          name: "Authentication",
          currentLevel: "Beginner",
          targetLevel: "Secure Auth Flow",
          whyItMatters: "High Priority because user access control, JWTs, and secure session management protect critical user data.",
          tag: "Security & Access"
        },
        {
          name: "Deployment",
          currentLevel: "Beginner",
          targetLevel: "Cloud Hosted with CI/CD",
          whyItMatters: "High Priority because code is only valuable if users can access it; cloud hosting bridges local development and production.",
          tag: "Production Delivery"
        }
      ],
      medium: [
        {
          name: "Advanced JavaScript",
          currentLevel: "Intermediate",
          targetLevel: "Advanced",
          whyItMatters: "Mastering closures, event loop microtasks, and async/await prevents frontend latency and memory leaks.",
          tag: "Language Depth"
        },
        {
          name: "Database Design",
          currentLevel: "Intermediate",
          targetLevel: "Relational Modeling & ORM",
          whyItMatters: "Proper schema normalization, relations (1-to-many, many-to-many), and indexing maintain high query performance.",
          tag: "Data Scalability"
        },
        {
          name: "Git/GitHub Collaboration",
          currentLevel: "Intermediate",
          targetLevel: "Professional Team Workflow",
          whyItMatters: "Required for collaborating across engineering teams, managing merge conflicts, and maintaining audit history.",
          tag: "Team Engineering"
        }
      ],
      low: [
        {
          name: "Automated Testing",
          currentLevel: "Novice",
          targetLevel: "Unit & Integration Tests",
          whyItMatters: "Writing unit tests (Jest, Pytest) ensures long-term regression safety and code reliability.",
          tag: "Quality Assurance"
        },
        {
          name: "Performance Optimization",
          currentLevel: "Novice",
          targetLevel: "Web Vitals & Bundling",
          whyItMatters: "Lazy loading components and minifying bundles improves Lighthouse scores and end-user retention.",
          tag: "Efficiency"
        }
      ]
    },
    roadmap: {
      days30: {
        phase: "30 DAYS — FOUNDATION",
        theme: "Frontend Mastery & Modern Tooling",
        milestoneGoal: "Build and deploy a rich client-side application with clean component state.",
        tasks: [
          { id: "fs-30-1", title: "Strengthen JavaScript", desc: "Deepen understanding of ES6+, Promises, async/await, Array methods, and modern DOM events." },
          { id: "fs-30-2", title: "Learn React fundamentals", desc: "Master JSX, component hierarchy, useState, useEffect, and custom hooks." },
          { id: "fs-30-3", title: "Build frontend project", desc: "Create an interactive student project catalog with responsive filtering and localStorage." },
          { id: "fs-30-4", title: "Learn Git/GitHub workflow", desc: "Use feature branches, descriptive atomic commits, and make pull requests." }
        ]
      },
      days60: {
        phase: "60 DAYS — BUILD",
        theme: "Backend Architecture & Data Persistence",
        milestoneGoal: "Construct an authenticated REST API and connect it seamlessly with your React frontend.",
        tasks: [
          { id: "fs-60-1", title: "Learn backend APIs", desc: "Design RESTful routes, request validation, middleware, and structured HTTP error responses." },
          { id: "fs-60-2", title: "Connect database", desc: "Integrate PostgreSQL / SQLite with an ORM (Prisma or SQLAlchemy) for relational schema modeling." },
          { id: "fs-60-3", title: "Implement authentication", desc: "Set up JWT-based auth tokens, password hashing with bcrypt, and protected routes." },
          { id: "fs-60-4", title: "Build complete full-stack project", desc: "Connect React client to your backend server with full CRUD and role-based views." }
        ]
      },
      days90: {
        phase: "90 DAYS — DEPLOY & INTERVIEW",
        theme: "Production Readiness & Portfolio Positioning",
        milestoneGoal: "Ship live on public infrastructure and prepare compelling technical talking points.",
        tasks: [
          { id: "fs-90-1", title: "Deploy frontend", desc: "Host on Vercel or Netlify with automated continuous deployment on GitHub push." },
          { id: "fs-90-2", title: "Deploy backend", desc: "Host server on Render, Railway, or cloud container with securely managed environment variables." },
          { id: "fs-90-3", title: "Configure production database", desc: "Provision a managed database (Supabase / Neon) with connection pooling and automated backups." },
          { id: "fs-90-4", title: "Add testing", desc: "Write automated tests for key API endpoints and critical UI user flows." },
          { id: "fs-90-5", title: "Publish project on GitHub", desc: "Write a comprehensive README with system architecture diagrams, setup instructions, and demo GIF." },
          { id: "fs-90-6", title: "Prepare project explanation for interviews", desc: "Practice explaining engineering trade-offs, architecture decisions, and edge case resolutions using the STAR method." }
        ]
      }
    },
    nextBestAction: {
      headline: "Build a full-stack student project using React + Python + SQL and deploy it.",
      detail: "Begin by creating a 3-tier Student Course Review portal with a React frontend, Python FastAPI backend, and SQLite/PostgreSQL database with JWT authentication."
    }
  },
  {
    id: "python-developer",
    title: "Python Developer",
    category: "Backend & Systems",
    alignmentPercent: 86,
    badgeColor: "emerald",
    whyItMatches: "Python is your primary programming language with strong scripting and database familiarity.",
    strengths: "Python core, OOP concepts, Scripting, SQL databases",
    skillGaps: "Asynchronous programming (asyncio/Celery), Microservices, Docker containerization",
    effort: "Low",
    effortLevel: 1,
    suggestedFirstStep: "Build a modular CLI automation tool and package it with PyPI packaging standards.",
    profileStrengthScore: 88,
    skillsComparison: [
      { name: "Python Core", current: "Intermediate", status: "match", currentScore: 80, requiredScore: 85, note: "Strong syntax, needs deeper memory management knowledge" },
      { name: "OOP & Design Patterns", current: "Intermediate", status: "match", currentScore: 70, requiredScore: 80, note: "Familiar with classes and inheritance" },
      { name: "SQL & Databases", current: "Intermediate", status: "match", currentScore: 65, requiredScore: 75, note: "Proficient in query construction and indexing" },
      { name: "FastAPI / Django", current: "Beginner", status: "gap", currentScore: 35, requiredScore: 80, note: "Needs production framework mastery" },
      { name: "Asyncio & Concurrency", current: "Beginner", status: "gap", currentScore: 25, requiredScore: 75, note: "Needs coroutines and event loop experience" },
      { name: "Docker Containerization", current: "Beginner", status: "gap", currentScore: 20, requiredScore: 70, note: "Needs Dockerfile optimization" },
      { name: "Testing (PyTest)", current: "Beginner", status: "gap", currentScore: 30, requiredScore: 75, note: "Needs fixtures, mocking, and coverage analysis" }
    ],
    priorities: {
      high: [
        {
          name: "FastAPI / Web Frameworks",
          currentLevel: "Beginner",
          targetLevel: "Production APIs",
          whyItMatters: "High Priority because modern Python developers build backend services, APIs, and microservices powering web and mobile products.",
          tag: "Backend Core"
        },
        {
          name: "AsyncIO & Background Tasks",
          currentLevel: "Beginner",
          targetLevel: "High-Throughput Concurrency",
          whyItMatters: "High Priority because handling concurrent I/O operations without blocking is required for scalable Python servers.",
          tag: "Performance"
        },
        {
          name: "Docker Containerization",
          currentLevel: "Beginner",
          targetLevel: "Reproducible Containers",
          whyItMatters: "High Priority because containerized services ensure deterministic behavior across developer workstations and production clusters.",
          tag: "Infrastructure"
        }
      ],
      medium: [
        {
          name: "ORM & SQL Optimization",
          currentLevel: "Intermediate",
          targetLevel: "SQLAlchemy Master",
          whyItMatters: "Preventing N+1 query problems and writing safe database migrations preserves system reliability.",
          tag: "Data Layer"
        },
        {
          name: "Testing with Pytest",
          currentLevel: "Beginner",
          targetLevel: "Automated Test Suites",
          whyItMatters: "Enterprise Python codebases mandate unit tests with mocking and automated coverage reports.",
          tag: "Code Quality"
        }
      ],
      low: [
        {
          name: "Packaging & PyPI Distribution",
          currentLevel: "Novice",
          targetLevel: "Reusable Library",
          whyItMatters: "Demonstrates software craftsmanship by packaging reusable libraries cleanly with Poetry/Setuptools.",
          tag: "Craftsmanship"
        }
      ]
    },
    roadmap: {
      days30: {
        phase: "30 DAYS — FOUNDATION",
        theme: "Modern Python Internals & Typing",
        milestoneGoal: "Write idiomatic Python using strict type hints, dataclasses, and PyTest.",
        tasks: [
          { id: "py-30-1", title: "Master Modern Python Syntax", desc: "Type hinting (PEP 484), dataclasses, context managers, and generators." },
          { id: "py-30-2", title: "Build CLI Automation Tool", desc: "Create an automated developer utility using Click or Typer and publish to GitHub." },
          { id: "py-30-3", title: "Implement Unit Testing with Pytest", desc: "Write test fixtures, parameterize test cases, and achieve 80%+ branch coverage." }
        ]
      },
      days60: {
        phase: "60 DAYS — BUILD",
        theme: "FastAPI Backend & Async Pipelines",
        milestoneGoal: "Build a production-grade asynchronous REST service with PostgreSQL and SQLAlchemy.",
        tasks: [
          { id: "py-60-1", title: "Develop FastAPI Microservice", desc: "Construct REST endpoints with Pydantic validation, dependency injection, and Swagger docs." },
          { id: "py-60-2", title: "Implement Async Database Access", desc: "Configure asyncpg with SQLAlchemy 2.0 and run schema migrations using Alembic." },
          { id: "py-60-3", title: "Add Background Task Processing", desc: "Integrate Celery or Redis Queue for asynchronous background report generation." }
        ]
      },
      days90: {
        phase: "90 DAYS — DEPLOY & INTERVIEW",
        theme: "Docker Containerization & System Design",
        milestoneGoal: "Containerize your Python service, deploy with Docker Compose, and practice system design.",
        tasks: [
          { id: "py-90-1", title: "Dockerize Python Application", desc: "Write multi-stage Dockerfiles optimizing image size and security non-root user." },
          { id: "py-90-2", title: "Deploy to Cloud Container Service", desc: "Deploy container onto AWS ECS, Render, or GCP Cloud Run with automated logging." },
          { id: "py-90-3", title: "System Design & Technical Interviews", desc: "Prepare answers on Python GIL trade-offs, async vs threading, and database indexing." }
        ]
      }
    },
    nextBestAction: {
      headline: "Build an asynchronous FastAPI service with Docker and PostgreSQL.",
      detail: "Implement a student timetable or book exchange API with full type annotations, Alembic migrations, and automated Pytest test suite."
    }
  },
  {
    id: "ai-ml-engineer",
    title: "AI/ML Engineer",
    category: "Artificial Intelligence",
    alignmentPercent: 68,
    badgeColor: "purple",
    whyItMatches: "Strong Python proficiency, solid math foundations, and demonstrated interest in machine learning.",
    strengths: "Python, Data structures, Math foundations, Analytical thinking",
    skillGaps: "Deep Learning frameworks (PyTorch), Model deployment (ONNX/FastAPI), Feature pipelines",
    effort: "High",
    effortLevel: 3,
    suggestedFirstStep: "Complete an end-to-end ML classification pipeline and deploy inference via FastAPI.",
    profileStrengthScore: 72,
    skillsComparison: [
      { name: "Python for Data", current: "Intermediate", status: "match", currentScore: 75, requiredScore: 85, note: "Proficient with basic Pandas and NumPy" },
      { name: "Scikit-Learn & ML", current: "Beginner", status: "match", currentScore: 45, requiredScore: 80, note: "Built basic classifiers, needs cross-validation mastery" },
      { name: "PyTorch / Deep Learning", current: "Beginner", status: "gap", currentScore: 20, requiredScore: 80, note: "Needs neural network architectures and tensors" },
      { name: "Model Deployment & APIs", current: "Beginner", status: "gap", currentScore: 25, requiredScore: 75, note: "Needs low-latency serving endpoints" },
      { name: "Math & Linear Algebra", current: "Intermediate", status: "match", currentScore: 70, requiredScore: 80, note: "Understands vectors, gradients, and loss functions" },
      { name: "MLOps & Tracking", current: "Beginner", status: "gap", currentScore: 15, requiredScore: 70, note: "Needs MLflow or Weights & Biases experience" }
    ],
    priorities: {
      high: [
        {
          name: "Deep Learning with PyTorch",
          currentLevel: "Beginner",
          targetLevel: "Model Architecture Mastery",
          whyItMatters: "High Priority because PyTorch is the primary research and industry standard framework for training neural networks and fine-tuning models.",
          tag: "Core AI Framework"
        },
        {
          name: "Model Serving & Inference APIs",
          currentLevel: "Beginner",
          targetLevel: "Production Endpoint",
          whyItMatters: "High Priority because AI models must be served through high-performance APIs for applications to consume predictions.",
          tag: "Production Delivery"
        },
        {
          name: "Feature Engineering & Preprocessing",
          currentLevel: "Beginner",
          targetLevel: "Production Data Pipelines",
          whyItMatters: "High Priority because model accuracy depends heavily on rigorous data cleaning, encoding, and leak prevention.",
          tag: "Data Quality"
        }
      ],
      medium: [
        {
          name: "Vector Databases & Embeddings",
          currentLevel: "Novice",
          targetLevel: "RAG Systems",
          whyItMatters: "Industry applications require semantic search and retrieval-augmented generation (RAG) using Pinecone, Chroma, or pgvector.",
          tag: "Generative AI"
        },
        {
          name: "Experiment Tracking (MLflow)",
          currentLevel: "Novice",
          targetLevel: "Model Governance",
          whyItMatters: "Logging hyperparameters and metrics systematically is required for reproducible machine learning.",
          tag: "MLOps"
        }
      ],
      low: [
        {
          name: "Model Quantization & ONNX",
          currentLevel: "Novice",
          targetLevel: "Edge Optimization",
          whyItMatters: "Optimizing model weights reduces inference latency and cloud compute costs.",
          tag: "Optimization"
        }
      ]
    },
    roadmap: {
      days30: {
        phase: "30 DAYS — FOUNDATION",
        theme: "Mathematical ML & Classical Algorithms",
        milestoneGoal: "Build reproducible classical ML pipelines with Scikit-learn and rigorous cross-validation.",
        tasks: [
          { id: "ai-30-1", title: "Master NumPy & Pandas Vectorization", desc: "Perform advanced data manipulation without slow Python loops." },
          { id: "ai-30-2", title: "Scikit-Learn Pipeline Architecture", desc: "Build clean ColumnTransformer and Pipeline chains avoiding data leakage." },
          { id: "ai-30-3", title: "Model Evaluation & Metrics", desc: "Understand Precision, Recall, F1, ROC-AUC, and confusion matrix calibration." }
        ]
      },
      days60: {
        phase: "60 DAYS — BUILD",
        theme: "PyTorch & Deep Learning Architectures",
        milestoneGoal: "Train a custom neural network or fine-tune an open-source model using PyTorch.",
        tasks: [
          { id: "ai-60-1", title: "PyTorch Tensors & Autograd", desc: "Implement custom datasets, data loaders, and training loops." },
          { id: "ai-60-2", title: "Computer Vision or NLP Fine-Tuning", desc: "Fine-tune a HuggingFace Transformer model for text classification or question answering." },
          { id: "ai-60-3", title: "Track Experiments with MLflow / W&B", desc: "Log training loss curves, evaluation checkpoints, and model artifacts." }
        ]
      },
      days90: {
        phase: "90 DAYS — DEPLOY & INTERVIEW",
        theme: "Model Deployment & Production Serving",
        milestoneGoal: "Deploy inference endpoint on cloud containers and present project portfolio.",
        tasks: [
          { id: "ai-90-1", title: "Package Model with FastAPI", desc: "Create batch and single-item prediction endpoints with request validation." },
          { id: "ai-90-2", title: "Containerize with Docker & Deploy", desc: "Optimize container size and deploy to AWS / GCP / Hugging Face Spaces." },
          { id: "ai-90-3", title: "Portfolio Presentation & Interview Prep", desc: "Prepare explanations of bias/variance trade-offs, loss function selection, and latency constraints." }
        ]
      }
    },
    nextBestAction: {
      headline: "Fine-tune a lightweight Hugging Face model and serve it via FastAPI.",
      detail: "Build a document summary or sentiment analysis tool deployed on Hugging Face Spaces with a clean Streamlit or React UI."
    }
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    category: "Data & Business Intelligence",
    alignmentPercent: 76,
    badgeColor: "cyan",
    whyItMatches: "Good SQL understanding, Python basics, and structured problem-solving skills.",
    strengths: "SQL, Python, Data cleaning, Problem solving",
    skillGaps: "BI Tools (Tableau / Power BI), Advanced Statistical Testing, Business Metrics",
    effort: "Low-Medium",
    effortLevel: 2,
    suggestedFirstStep: "Create an interactive Tableau/Power BI dashboard analyzing real-world public data.",
    profileStrengthScore: 79,
    skillsComparison: [
      { name: "SQL Queries & Aggregations", current: "Intermediate", status: "match", currentScore: 70, requiredScore: 85, note: "Good with JOINs, needs Window functions and CTEs" },
      { name: "Python Data Analysis", current: "Intermediate", status: "match", currentScore: 65, requiredScore: 75, note: "Comfortable with Pandas dataframe manipulation" },
      { name: "BI Dashboarding", current: "Beginner", status: "gap", currentScore: 30, requiredScore: 80, note: "Needs Power BI or Tableau storytelling experience" },
      { name: "Statistical Hypothesis Testing", current: "Beginner", status: "gap", currentScore: 35, requiredScore: 70, note: "Needs p-value, t-test, and A/B testing principles" },
      { name: "Data Storytelling & Executive Comms", current: "Intermediate", status: "match", currentScore: 60, requiredScore: 75, note: "Solid presentation skills, needs business KPI mapping" }
    ],
    priorities: {
      high: [
        {
          name: "Advanced SQL (Window Functions & CTEs)",
          currentLevel: "Intermediate",
          targetLevel: "Advanced Analytical SQL",
          whyItMatters: "High Priority because enterprise analysts write complex analytical queries to extract metrics without relying on application engineers.",
          tag: "Core Querying"
        },
        {
          name: "Power BI / Tableau Storytelling",
          currentLevel: "Beginner",
          targetLevel: "Interactive Executive Dashboards",
          whyItMatters: "High Priority because stakeholders need intuitive visual dashboards to make rapid data-driven business decisions.",
          tag: "Data Visualization"
        },
        {
          name: "A/B Testing & Statistics",
          currentLevel: "Beginner",
          targetLevel: "Experimentation Design",
          whyItMatters: "High Priority because evaluating feature rollouts and conversion funnels requires statistical significance.",
          tag: "Product Analytics"
        }
      ],
      medium: [
        {
          name: "Data Modeling & Star Schemas",
          currentLevel: "Beginner",
          targetLevel: "Dimensional Modeling",
          whyItMatters: "Structuring fact and dimension tables accelerates BI dashboard query performance.",
          tag: "Data Architecture"
        },
        {
          name: "Exploratory Data Analysis (EDA)",
          currentLevel: "Intermediate",
          targetLevel: "Insight Discovery",
          whyItMatters: "Identifying outliers, missing values, and correlated patterns leads to actionable discoveries.",
          tag: "Analysis Method"
        }
      ],
      low: [
        {
          name: "Basic Data Warehousing (BigQuery / Snowflake)",
          currentLevel: "Novice",
          targetLevel: "Cloud Warehouse Familiarity",
          whyItMatters: "Running queries on cloud analytical warehouses scales analysis to millions of records.",
          tag: "Cloud Data"
        }
      ]
    },
    roadmap: {
      days30: {
        phase: "30 DAYS — FOUNDATION",
        theme: "Advanced SQL & Exploratory Analysis",
        milestoneGoal: "Master analytical SQL queries and build reproducible exploratory notebooks in Python.",
        tasks: [
          { id: "da-30-1", title: "Master SQL Window Functions", desc: "Practice RANK, DENSE_RANK, LEAD, LAG, and rolling average aggregations." },
          { id: "da-30-2", title: "Python EDA on Real Datasets", desc: "Analyze e-commerce or educational datasets using Pandas, Seaborn, and Matplotlib." },
          { id: "da-30-3", title: "Build Data Quality Checks", desc: "Identify anomalies, null patterns, and categorical inconsistencies." }
        ]
      },
      days60: {
        phase: "60 DAYS — BUILD",
        theme: "Interactive BI Dashboards & KPIs",
        milestoneGoal: "Build and publish an interactive Power BI or Tableau dashboard tracking business KPIs.",
        tasks: [
          { id: "da-60-1", title: "Build Power BI / Tableau Project", desc: "Design interactive filters, drill-down parameters, and executive summary cards." },
          { id: "da-60-2", title: "Calculate Business Metrics", desc: "Model churn rates, customer lifetime value (LTV), cohort retention, and conversion funnels." },
          { id: "da-60-3", title: "Design A/B Testing Experiment", desc: "Formulate hypotheses, calculate required sample size, and interpret p-values." }
        ]
      },
      days90: {
        phase: "90 DAYS — DEPLOY & INTERVIEW",
        theme: "Portfolio Showcase & Business Case Studies",
        milestoneGoal: "Publish a data analytics portfolio website showcasing 2 end-to-end case studies.",
        tasks: [
          { id: "da-90-1", title: "Create Portfolio Case Studies", desc: "Write concise problem-action-result summaries with embedded dashboard screenshots." },
          { id: "da-90-2", title: "Practice SQL Live Coding", desc: "Solve medium/hard SQL challenges on LeetCode / StrataScratch under time limits." },
          { id: "da-90-3", title: "Interview Behavioral Storytelling", desc: "Prepare stories on handling messy data, surprising insights, and influencing team decisions." }
        ]
      }
    },
    nextBestAction: {
      headline: "Publish an interactive Tableau or Power BI portfolio dashboard on public data.",
      detail: "Analyze higher education enrollment or tech salary trends and document business insights in a GitHub repository."
    }
  },
  {
    id: "cloud-devops-engineer",
    title: "Cloud/DevOps Engineer",
    category: "Infrastructure & Platform",
    alignmentPercent: 62,
    badgeColor: "amber",
    whyItMatches: "Solid systems aptitude, Git foundations, and demonstrated interest in scalable infrastructure.",
    strengths: "Linux basics, Git/GitHub, Scripting, Problem solving",
    skillGaps: "Docker & Kubernetes, CI/CD pipelines, AWS/GCP cloud services, Terraform (IaC)",
    effort: "High",
    effortLevel: 3,
    suggestedFirstStep: "Containerize a sample web application with Docker and set up a GitHub Actions CI pipeline.",
    profileStrengthScore: 66,
    skillsComparison: [
      { name: "Linux Administration & Bash", current: "Intermediate", status: "match", currentScore: 60, requiredScore: 80, note: "Basic shell usage, needs permissions & systemd mastery" },
      { name: "Git & Version Control", current: "Intermediate", status: "match", currentScore: 70, requiredScore: 80, note: "Good command of branching and merges" },
      { name: "Docker & Containers", current: "Beginner", status: "gap", currentScore: 25, requiredScore: 85, note: "Needs multi-stage builds and container networking" },
      { name: "CI/CD Automation", current: "Beginner", status: "gap", currentScore: 20, requiredScore: 80, note: "Needs GitHub Actions workflow syntax" },
      { name: "Cloud Platforms (AWS/GCP)", current: "Beginner", status: "gap", currentScore: 25, requiredScore: 80, note: "Needs VPC, IAM, EC2, S3, and serverless fundamentals" },
      { name: "Infrastructure as Code (Terraform)", current: "Beginner", status: "gap", currentScore: 10, requiredScore: 75, note: "Needs declarative resource provisioning" }
    ],
    priorities: {
      high: [
        {
          name: "Docker & Container Architecture",
          currentLevel: "Beginner",
          targetLevel: "Production Containerization",
          whyItMatters: "High Priority because containers are the foundational building block for modern microservices and platform engineering.",
          tag: "Containers"
        },
        {
          name: "CI/CD Pipelines (GitHub Actions)",
          currentLevel: "Beginner",
          targetLevel: "Automated Build & Test Workflows",
          whyItMatters: "High Priority because continuous integration automates linting, testing, and delivery without human bottlenecks.",
          tag: "Automation"
        },
        {
          name: "AWS / Cloud Infrastructure Fundamentals",
          currentLevel: "Beginner",
          targetLevel: "Certified Cloud Practitioner / SysOps",
          whyItMatters: "High Priority because cloud providers host production workloads, requiring strict network security and resource configuration.",
          tag: "Cloud Foundation"
        }
      ],
      medium: [
        {
          name: "Infrastructure as Code (Terraform)",
          currentLevel: "Novice",
          targetLevel: "Declarative IaC",
          whyItMatters: "Managing infrastructure with code eliminates manual configuration drift and allows instant environment replication.",
          tag: "IaC"
        },
        {
          name: "Kubernetes Orchestration Basics",
          currentLevel: "Novice",
          targetLevel: "Deployments & Services",
          whyItMatters: "Orchestrating container self-healing, rolling updates, and scaling across compute clusters.",
          tag: "Orchestration"
        }
      ],
      low: [
        {
          name: "Monitoring & Observability (Prometheus/Grafana)",
          currentLevel: "Novice",
          targetLevel: "Metrics & Alerting",
          whyItMatters: "Proactive alerting and dashboards reduce MTTR (mean time to resolution) during production incidents.",
          tag: "Observability"
        }
      ]
    },
    roadmap: {
      days30: {
        phase: "30 DAYS — FOUNDATION",
        theme: "Linux Systems & Docker Mastery",
        milestoneGoal: "Master Linux terminal power-tools and package applications into optimized Docker images.",
        tasks: [
          { id: "ops-30-1", title: "Linux Systems & Shell Scripting", desc: "Master file permissions, SSH keys, process management, and writing Bash automation scripts." },
          { id: "ops-30-2", title: "Master Docker & Multi-Stage Builds", desc: "Containerize Python and Node.js applications with minimal image footprints." },
          { id: "ops-30-3", title: "Docker Compose Multi-Container Setup", desc: "Orchestrate web service, PostgreSQL database, and Redis cache locally." }
        ]
      },
      days60: {
        phase: "60 DAYS — BUILD",
        theme: "CI/CD & Cloud Infrastructure",
        milestoneGoal: "Build an automated GitHub Actions CI/CD pipeline deploying onto AWS or Render.",
        tasks: [
          { id: "ops-60-1", title: "Build GitHub Actions CI/CD Pipeline", desc: "Configure automated linting, test execution, Docker build, and container registry push." },
          { id: "ops-60-2", title: "AWS Core Services Architecture", desc: "Provision VPC, Security Groups, IAM Roles, S3 Buckets, and EC2 instances." },
          { id: "ops-60-3", title: "Introduction to Terraform", desc: "Write declarative HCL to provision an S3 bucket and EC2 instance with remote state." }
        ]
      },
      days90: {
        phase: "90 DAYS — DEPLOY & INTERVIEW",
        theme: "Kubernetes & Production Reliability",
        milestoneGoal: "Deploy a resilient microservice on a managed Kubernetes cluster with monitoring.",
        tasks: [
          { id: "ops-90-1", title: "Deploy to Kubernetes (Minikube / EKS)", desc: "Write Pod, Deployment, Service, and Ingress manifests with rolling updates." },
          { id: "ops-90-2", title: "Configure Observability & Alerting", desc: "Set up uptime monitoring, health checks, and log streaming." },
          { id: "ops-90-3", title: "DevOps Interview Prep", desc: "Practice troubleshooting broken containers, deployment rollbacks, and security incident response." }
        ]
      }
    },
    nextBestAction: {
      headline: "Create a GitHub repository with a complete Docker + GitHub Actions CI/CD pipeline.",
      detail: "Containerize any web app, write GitHub Actions to run tests and push images to GitHub Container Registry, and document the architecture."
    }
  }
];

export const interestOptions = [
  "Web Development",
  "AI/ML",
  "Data",
  "Software Engineering",
  "Cloud",
  "Cybersecurity"
];

export const degreeOptions = [
  "B.Tech / B.E. Computer Science & Engineering",
  "B.Tech / B.E. Information Technology",
  "B.S. Computer Science",
  "B.C.A. / M.C.A.",
  "B.Tech Electronics & Communication",
  "M.S. / M.Tech Software Engineering"
];

export const yearOptions = [
  "1st Year (Freshman)",
  "2nd Year (Sophomore)",
  "3rd Year (Pre-Final)",
  "4th Year (Final Year)",
  "Recent Graduate"
];
