"""
Career dataset containing 5 realistic industry pathways with required skills,
benchmarks, priority classifications, and roadmap blueprints.
"""

CAREER_DATA = {
    "Full Stack Developer": {
        "name": "Full Stack Developer",
        "category": "Software Engineering",
        "description": "Designs, implements, and maintains complete client-side interfaces, server-side APIs, and database persistence layers.",
        "effort_level": "Medium",
        "effort_months": "2-3 months",
        "suggested_first_step": "Build a modular REST API with authentication and connect it to a React frontend.",
        "related_interests": ["Web Development", "Software Engineering"],
        "required_skills": [
            {
                "name": "HTML/CSS",
                "keywords": ["html", "css", "html5", "css3", "tailwind", "responsive"],
                "required_level": "Strong",
                "required_score": 90,
                "priority": "MEDIUM",
                "why_it_matters": "Semantic markup and responsive layouts are fundamental for accessible user interfaces."
            },
            {
                "name": "JavaScript",
                "keywords": ["javascript", "js", "es6", "typescript", "ts"],
                "required_level": "Intermediate",
                "required_score": 85,
                "priority": "MEDIUM",
                "why_it_matters": "Mastery of async/await, closures, and the event loop avoids frontend latency and memory leaks."
            },
            {
                "name": "React",
                "keywords": ["react", "reactjs", "nextjs", "frontend framework"],
                "required_level": "Intermediate",
                "required_score": 80,
                "priority": "HIGH",
                "why_it_matters": "Declarative UI and state management are dominant industry standards for dynamic web applications."
            },
            {
                "name": "Backend APIs",
                "keywords": ["rest", "api", "rest api", "backend", "express", "fastapi", "django", "nodejs"],
                "required_level": "Intermediate",
                "required_score": 85,
                "priority": "HIGH",
                "why_it_matters": "A full-stack developer must connect frontend interfaces to server-side business logic and databases."
            },
            {
                "name": "SQL & Databases",
                "keywords": ["sql", "mysql", "postgresql", "sqlite", "mongodb", "database"],
                "required_level": "Intermediate",
                "required_score": 75,
                "priority": "MEDIUM",
                "why_it_matters": "Schema normalization, indexing, and relational queries maintain data integrity at scale."
            },
            {
                "name": "Authentication & Security",
                "keywords": ["auth", "authentication", "jwt", "oauth", "bcrypt", "security"],
                "required_level": "Intermediate",
                "required_score": 80,
                "priority": "HIGH",
                "why_it_matters": "User access control, password hashing, and token sessions protect critical user data."
            },
            {
                "name": "Deployment & Cloud",
                "keywords": ["deploy", "deployment", "vercel", "render", "docker", "aws", "cloud", "ci/cd"],
                "required_level": "Intermediate",
                "required_score": 75,
                "priority": "HIGH",
                "why_it_matters": "Code is only valuable if users can access it; cloud hosting bridges local development and production."
            },
            {
                "name": "Git & GitHub",
                "keywords": ["git", "github", "version control"],
                "required_level": "Intermediate",
                "required_score": 75,
                "priority": "MEDIUM",
                "why_it_matters": "Required for agile team collaboration, code reviews, and version tracking."
            },
            {
                "name": "Automated Testing",
                "keywords": ["testing", "jest", "pytest", "unit test", "cypress"],
                "required_level": "Beginner",
                "required_score": 65,
                "priority": "LOW",
                "why_it_matters": "Unit and integration testing protect software against regressions as features expand."
            },
            {
                "name": "Performance Optimization",
                "keywords": ["performance", "caching", "lazy load", "optimization", "lighthouse"],
                "required_level": "Beginner",
                "required_score": 60,
                "priority": "LOW",
                "why_it_matters": "Asset minification and database query caching maintain low user latency."
            }
        ],
        "roadmap": {
            "day_30": {
                "phase": "30 DAYS — FOUNDATION",
                "theme": "Frontend Mastery & Component Architecture",
                "milestone_goal": "Build and deploy an interactive React application with clean component state.",
                "tasks": [
                    {"id": "fs-30-1", "title": "Strengthen JavaScript", "desc": "Deepen mastery of ES6+, Promises, async/await, and modern array manipulation methods."},
                    {"id": "fs-30-2", "title": "Learn React fundamentals", "desc": "Master JSX, component hierarchies, useState, useEffect, and custom hooks."},
                    {"id": "fs-30-3", "title": "Build frontend project", "desc": "Construct an interactive student project catalog with dynamic filtering and localStorage."},
                    {"id": "fs-30-4", "title": "Learn Git/GitHub workflow", "desc": "Use atomic commits, feature branches, and pull request reviews."}
                ]
            },
            "day_60": {
                "phase": "60 DAYS — BUILD",
                "theme": "Backend Architecture & Data Persistence",
                "milestone_goal": "Construct an authenticated REST API and connect it seamlessly with your React frontend.",
                "tasks": [
                    {"id": "fs-60-1", "title": "Learn backend APIs", "desc": "Design RESTful endpoints, request validation, middleware, and HTTP error handling."},
                    {"id": "fs-60-2", "title": "Connect database", "desc": "Integrate PostgreSQL or SQLite with an ORM for relational modeling."},
                    {"id": "fs-60-3", "title": "Implement authentication", "desc": "Configure JWT-based auth tokens, password hashing with bcrypt, and protected routes."},
                    {"id": "fs-60-4", "title": "Build complete full-stack project", "desc": "Connect React client to backend server with full CRUD capabilities."}
                ]
            },
            "day_90": {
                "phase": "90 DAYS — DEPLOY & PREPARE",
                "theme": "Production Deployment & Interview Positioning",
                "milestone_goal": "Ship live on public infrastructure and prepare compelling interview talking points.",
                "tasks": [
                    {"id": "fs-90-1", "title": "Deploy frontend", "desc": "Host client on Vercel or Netlify with automated continuous deployment."},
                    {"id": "fs-90-2", "title": "Deploy backend", "desc": "Host server on Render, Railway, or cloud VM with secure environment variables."},
                    {"id": "fs-90-3", "title": "Configure production database", "desc": "Provision managed cloud database with connection pooling and automated backups."},
                    {"id": "fs-90-4", "title": "Add testing", "desc": "Write automated unit tests for key API endpoints and critical user flows."},
                    {"id": "fs-90-5", "title": "Publish project on GitHub", "desc": "Write a clean README with architecture diagram, live demo link, and setup guide."},
                    {"id": "fs-90-6", "title": "Prepare project explanation for interviews", "desc": "Practice explaining engineering trade-offs, architecture decisions, and edge case handling."}
                ]
            }
        },
        "next_best_action": {
            "headline": "Build a full-stack student project using React + Python + SQL and deploy it.",
            "detail": "Begin by creating a 3-tier Student Course Review portal with a React frontend, Python FastAPI backend, and SQLite/PostgreSQL database with JWT authentication."
        }
    },

    "Python Developer": {
        "name": "Python Developer",
        "category": "Backend & Systems",
        "description": "Constructs scalable backend microservices, automation scripts, and server-side business logic using Python.",
        "effort_level": "Low",
        "effort_months": "1-2 months",
        "suggested_first_step": "Build a modular CLI automation tool and package it with PyPI standards.",
        "related_interests": ["Software Engineering", "Web Development", "Data"],
        "required_skills": [
            {
                "name": "Python Core",
                "keywords": ["python", "python3", "oop"],
                "required_level": "Strong",
                "required_score": 85,
                "priority": "HIGH",
                "why_it_matters": "Python is the primary language; deep understanding of memory, GIL, and idiomatic syntax is required."
            },
            {
                "name": "FastAPI / Django",
                "keywords": ["fastapi", "django", "flask", "api", "rest"],
                "required_level": "Intermediate",
                "required_score": 80,
                "priority": "HIGH",
                "why_it_matters": "Modern Python engineers build backend services, APIs, and microservices powering web applications."
            },
            {
                "name": "SQL & Databases",
                "keywords": ["sql", "mysql", "postgresql", "sqlite", "sqlalchemy"],
                "required_level": "Intermediate",
                "required_score": 75,
                "priority": "MEDIUM",
                "why_it_matters": "Efficient queries and relational ORM modeling prevent system bottlenecks."
            },
            {
                "name": "AsyncIO & Concurrency",
                "keywords": ["asyncio", "async", "concurrency", "celery", "threading"],
                "required_level": "Intermediate",
                "required_score": 75,
                "priority": "HIGH",
                "why_it_matters": "Handling concurrent I/O operations without blocking is essential for high-throughput Python backends."
            },
            {
                "name": "Docker Containerization",
                "keywords": ["docker", "container", "dockerfile"],
                "required_level": "Intermediate",
                "required_score": 70,
                "priority": "HIGH",
                "why_it_matters": "Containerized services ensure reproducible behavior across development and cloud environments."
            },
            {
                "name": "PyTest & Automated Testing",
                "keywords": ["pytest", "unittest", "testing", "mocking"],
                "required_level": "Intermediate",
                "required_score": 75,
                "priority": "MEDIUM",
                "why_it_matters": "Writing test fixtures and parameterized test suites maintains code reliability across releases."
            }
        ],
        "roadmap": {
            "day_30": {
                "phase": "30 DAYS — FOUNDATION",
                "theme": "Python Internals, Strict Typing & Testing",
                "milestone_goal": "Write idiomatic Python with strict type hinting (PEP 484), dataclasses, and PyTest.",
                "tasks": [
                    {"id": "py-30-1", "title": "Master Modern Python Syntax", "desc": "Type hinting, dataclasses, context managers, and generators."},
                    {"id": "py-30-2", "title": "Build CLI Automation Tool", "desc": "Create a command-line developer utility using Click or Typer and publish to GitHub."},
                    {"id": "py-30-3", "title": "Implement Unit Testing with Pytest", "desc": "Write test fixtures, parameterized test cases, and check test coverage."}
                ]
            },
            "day_60": {
                "phase": "60 DAYS — BUILD",
                "theme": "FastAPI Services & Database Migrations",
                "milestone_goal": "Build an asynchronous REST microservice with PostgreSQL and SQLAlchemy.",
                "tasks": [
                    {"id": "py-60-1", "title": "Develop FastAPI Microservice", "desc": "Construct REST routes with Pydantic validation, dependency injection, and Swagger docs."},
                    {"id": "py-60-2", "title": "Implement Async Database Access", "desc": "Configure asyncpg with SQLAlchemy 2.0 and run schema migrations using Alembic."},
                    {"id": "py-60-3", "title": "Add Background Task Processing", "desc": "Integrate Celery or Redis Queue for asynchronous background report generation."}
                ]
            },
            "day_90": {
                "phase": "90 DAYS — DEPLOY & PREPARE",
                "theme": "Dockerization & Backend System Design",
                "milestone_goal": "Containerize your Python service, deploy to cloud containers, and prepare for interviews.",
                "tasks": [
                    {"id": "py-90-1", "title": "Dockerize Python Application", "desc": "Write multi-stage Dockerfiles optimizing image size and security."},
                    {"id": "py-90-2", "title": "Deploy to Cloud Container Service", "desc": "Deploy container onto AWS ECS, Render, or GCP Cloud Run with automated logging."},
                    {"id": "py-90-3", "title": "System Design & Technical Interviews", "desc": "Prepare answers on Python GIL trade-offs, async vs threading, and database indexing."}
                ]
            }
        },
        "next_best_action": {
            "headline": "Build an asynchronous FastAPI service with Docker and PostgreSQL.",
            "detail": "Implement a student timetable or book exchange API with full type annotations, Alembic migrations, and automated Pytest test suite."
        }
    },

    "AI/ML Engineer": {
        "name": "AI/ML Engineer",
        "category": "Artificial Intelligence",
        "description": "Designs, trains, and deploys machine learning models and deep learning pipelines into production services.",
        "effort_level": "High",
        "effort_months": "3-6 months",
        "suggested_first_step": "Complete an end-to-end ML classification pipeline and deploy inference via FastAPI.",
        "related_interests": ["AI/ML", "Data", "Software Engineering"],
        "required_skills": [
            {
                "name": "Python for Data Science",
                "keywords": ["python", "pandas", "numpy", "scipy"],
                "required_level": "Strong",
                "required_score": 85,
                "priority": "MEDIUM",
                "why_it_matters": "High-speed vectorized data manipulation is the bedrock of machine learning."
            },
            {
                "name": "Scikit-Learn & Classical ML",
                "keywords": ["scikit-learn", "sklearn", "ml", "classification", "regression"],
                "required_level": "Intermediate",
                "required_score": 80,
                "priority": "HIGH",
                "why_it_matters": "Understanding feature engineering, cross-validation, and baseline modeling is foundational."
            },
            {
                "name": "PyTorch / Deep Learning",
                "keywords": ["pytorch", "tensorflow", "deep learning", "neural network", "transformer"],
                "required_level": "Intermediate",
                "required_score": 80,
                "priority": "HIGH",
                "why_it_matters": "PyTorch is the industry standard framework for training neural networks and fine-tuning models."
            },
            {
                "name": "Model Serving & Inference APIs",
                "keywords": ["fastapi", "onnx", "triton", "model serving", "api"],
                "required_level": "Intermediate",
                "required_score": 75,
                "priority": "HIGH",
                "why_it_matters": "Models must be served via low-latency endpoints for production applications to consume predictions."
            },
            {
                "name": "Math & Linear Algebra",
                "keywords": ["math", "linear algebra", "calculus", "probability", "statistics"],
                "required_level": "Intermediate",
                "required_score": 80,
                "priority": "MEDIUM",
                "why_it_matters": "Essential for debugging loss convergence, gradient vanishing, and architecture design."
            },
            {
                "name": "MLOps & Experiment Tracking",
                "keywords": ["mlops", "mlflow", "wandb", "dvc", "docker"],
                "required_level": "Beginner",
                "required_score": 70,
                "priority": "MEDIUM",
                "why_it_matters": "Systematic hyperparameter and metric logging is mandatory for reproducible research."
            }
        ],
        "roadmap": {
            "day_30": {
                "phase": "30 DAYS — FOUNDATION",
                "theme": "Vectorized Math & Classical Algorithms",
                "milestone_goal": "Build reproducible classical ML pipelines with Scikit-learn and rigorous cross-validation.",
                "tasks": [
                    {"id": "ai-30-1", "title": "Master NumPy & Pandas Vectorization", "desc": "Perform advanced data manipulation without slow procedural Python loops."},
                    {"id": "ai-30-2", "title": "Scikit-Learn Pipeline Architecture", "desc": "Build clean ColumnTransformer and Pipeline chains avoiding data leakage."},
                    {"id": "ai-30-3", "title": "Model Evaluation & Metrics", "desc": "Understand Precision, Recall, F1, ROC-AUC, and confusion matrix calibration."}
                ]
            },
            "day_60": {
                "phase": "60 DAYS — BUILD",
                "theme": "PyTorch & Deep Learning Fine-Tuning",
                "milestone_goal": "Train a neural network or fine-tune an open-source model using PyTorch.",
                "tasks": [
                    {"id": "ai-60-1", "title": "PyTorch Tensors & Autograd", "desc": "Implement custom datasets, data loaders, and training loops."},
                    {"id": "ai-60-2", "title": "Computer Vision or NLP Fine-Tuning", "desc": "Fine-tune a HuggingFace Transformer model for text classification or question answering."},
                    {"id": "ai-60-3", "title": "Track Experiments with MLflow / W&B", "desc": "Log training loss curves, evaluation checkpoints, and model artifacts."}
                ]
            },
            "day_90": {
                "phase": "90 DAYS — DEPLOY & PREPARE",
                "theme": "Model Deployment & Production Serving",
                "milestone_goal": "Deploy inference endpoint on cloud containers and present project portfolio.",
                "tasks": [
                    {"id": "ai-90-1", "title": "Package Model with FastAPI", "desc": "Create batch and single-item prediction endpoints with request validation."},
                    {"id": "ai-90-2", "title": "Containerize with Docker & Deploy", "desc": "Optimize container size and deploy to AWS / GCP / Hugging Face Spaces."},
                    {"id": "ai-90-3", "title": "Portfolio Presentation & Interview Prep", "desc": "Prepare explanations of bias/variance trade-offs, loss function selection, and latency constraints."}
                ]
            }
        },
        "next_best_action": {
            "headline": "Fine-tune a lightweight Hugging Face model and serve it via FastAPI.",
            "detail": "Build a document summary or sentiment analysis tool deployed on Hugging Face Spaces with a clean Streamlit or React UI."
        }
    },

    "Data Analyst": {
        "name": "Data Analyst",
        "category": "Data & Business Intelligence",
        "description": "Translates complex business data into actionable visual insights, executive dashboards, and KPI tracking.",
        "effort_level": "Low-Medium",
        "effort_months": "2-3 months",
        "suggested_first_step": "Create an interactive Tableau/Power BI dashboard analyzing real-world public data.",
        "related_interests": ["Data", "AI/ML", "Web Development"],
        "required_skills": [
            {
                "name": "Advanced SQL",
                "keywords": ["sql", "window functions", "cte", "queries", "mysql", "postgresql"],
                "required_level": "Strong",
                "required_score": 85,
                "priority": "HIGH",
                "why_it_matters": "Enterprise analysts write complex analytical queries to extract metrics without relying on application engineers."
            },
            {
                "name": "Python Data Analysis",
                "keywords": ["python", "pandas", "numpy", "seaborn", "matplotlib"],
                "required_level": "Intermediate",
                "required_score": 75,
                "priority": "MEDIUM",
                "why_it_matters": "Pandas enables deep exploratory data analysis, data cleaning, and statistical modeling."
            },
            {
                "name": "Power BI / Tableau Storytelling",
                "keywords": ["tableau", "power bi", "bi", "dashboard", "data visualization"],
                "required_level": "Intermediate",
                "required_score": 80,
                "priority": "HIGH",
                "why_it_matters": "Business stakeholders need intuitive visual dashboards to make rapid data-driven decisions."
            },
            {
                "name": "A/B Testing & Statistics",
                "keywords": ["statistics", "a/b testing", "hypothesis testing", "p-value"],
                "required_level": "Intermediate",
                "required_score": 70,
                "priority": "HIGH",
                "why_it_matters": "Evaluating feature rollouts and product conversion funnels requires statistical significance."
            },
            {
                "name": "Data Modeling & Star Schemas",
                "keywords": ["data modeling", "star schema", "data warehouse", "snowflake", "bigquery"],
                "required_level": "Beginner",
                "required_score": 70,
                "priority": "MEDIUM",
                "why_it_matters": "Structuring fact and dimension tables accelerates BI dashboard query performance."
            }
        ],
        "roadmap": {
            "day_30": {
                "phase": "30 DAYS — FOUNDATION",
                "theme": "Advanced SQL & Exploratory Analysis",
                "milestone_goal": "Master analytical SQL queries and build reproducible exploratory notebooks in Python.",
                "tasks": [
                    {"id": "da-30-1", "title": "Master SQL Window Functions", "desc": "Practice RANK, DENSE_RANK, LEAD, LAG, and rolling average aggregations."},
                    {"id": "da-30-2", "title": "Python EDA on Real Datasets", "desc": "Analyze e-commerce or educational datasets using Pandas, Seaborn, and Matplotlib."},
                    {"id": "da-30-3", "title": "Build Data Quality Checks", "desc": "Identify anomalies, null patterns, and categorical inconsistencies."}
                ]
            },
            "day_60": {
                "phase": "60 DAYS — BUILD",
                "theme": "Interactive BI Dashboards & KPIs",
                "milestone_goal": "Build and publish an interactive Power BI or Tableau dashboard tracking business KPIs.",
                "tasks": [
                    {"id": "da-60-1", "title": "Build Power BI / Tableau Project", "desc": "Design interactive filters, drill-down parameters, and executive summary cards."},
                    {"id": "da-60-2", "title": "Calculate Business Metrics", "desc": "Model churn rates, customer lifetime value (LTV), cohort retention, and conversion funnels."},
                    {"id": "da-60-3", "title": "Design A/B Testing Experiment", "desc": "Formulate hypotheses, calculate required sample size, and interpret p-values."}
                ]
            },
            "day_90": {
                "phase": "90 DAYS — DEPLOY & PREPARE",
                "theme": "Portfolio Showcase & Business Case Studies",
                "milestone_goal": "Publish a data analytics portfolio website showcasing 2 end-to-end case studies.",
                "tasks": [
                    {"id": "da-90-1", "title": "Create Portfolio Case Studies", "desc": "Write concise problem-action-result summaries with embedded dashboard screenshots."},
                    {"id": "da-90-2", "title": "Practice SQL Live Coding", "desc": "Solve medium/hard SQL challenges on LeetCode / StrataScratch under time limits."},
                    {"id": "da-90-3", "title": "Interview Behavioral Storytelling", "desc": "Prepare stories on handling messy data, surprising insights, and influencing team decisions."}
                ]
            }
        },
        "next_best_action": {
            "headline": "Publish an interactive Tableau or Power BI portfolio dashboard on public data.",
            "detail": "Analyze higher education enrollment or tech salary trends and document business insights in a GitHub repository."
        }
    },

    "Cloud/DevOps Engineer": {
        "name": "Cloud/DevOps Engineer",
        "category": "Infrastructure & Platform",
        "description": "Automates continuous integration/deployment, provisions cloud infrastructure, and monitors production reliability.",
        "effort_level": "High",
        "effort_months": "3-6 months",
        "suggested_first_step": "Containerize a sample web application with Docker and set up a GitHub Actions CI pipeline.",
        "related_interests": ["Cloud", "Software Engineering", "Cybersecurity"],
        "required_skills": [
            {
                "name": "Linux & Bash Scripting",
                "keywords": ["linux", "bash", "shell", "ubuntu"],
                "required_level": "Strong",
                "required_score": 80,
                "priority": "HIGH",
                "why_it_matters": "Linux is the operating system running production servers, container hosts, and cloud compute."
            },
            {
                "name": "Docker & Containerization",
                "keywords": ["docker", "container", "docker-compose", "containerization"],
                "required_level": "Intermediate",
                "required_score": 85,
                "priority": "HIGH",
                "why_it_matters": "Containers are the foundational building block for modern microservices and platform delivery."
            },
            {
                "name": "CI/CD (GitHub Actions)",
                "keywords": ["ci/cd", "github actions", "jenkins", "gitlab ci", "pipeline"],
                "required_level": "Intermediate",
                "required_score": 80,
                "priority": "HIGH",
                "why_it_matters": "Continuous integration automates linting, testing, and delivery without human bottlenecks."
            },
            {
                "name": "AWS / Cloud Platforms",
                "keywords": ["aws", "gcp", "azure", "cloud", "ec2", "s3"],
                "required_level": "Intermediate",
                "required_score": 80,
                "priority": "HIGH",
                "why_it_matters": "Cloud providers host production workloads, requiring strict network security and IAM permissions."
            },
            {
                "name": "Terraform (IaC)",
                "keywords": ["terraform", "iac", "infrastructure as code"],
                "required_level": "Beginner",
                "required_score": 75,
                "priority": "MEDIUM",
                "why_it_matters": "Managing infrastructure with code eliminates manual configuration drift and enables fast replication."
            },
            {
                "name": "Kubernetes Orchestration",
                "keywords": ["kubernetes", "k8s", "helm"],
                "required_level": "Beginner",
                "required_score": 75,
                "priority": "MEDIUM",
                "why_it_matters": "Orchestrating container self-healing, rolling updates, and scaling across compute clusters."
            }
        ],
        "roadmap": {
            "day_30": {
                "phase": "30 DAYS — FOUNDATION",
                "theme": "Linux Systems & Docker Mastery",
                "milestone_goal": "Master Linux terminal power-tools and package applications into optimized Docker images.",
                "tasks": [
                    {"id": "ops-30-1", "title": "Linux Systems & Shell Scripting", "desc": "Master file permissions, SSH keys, process management, and writing Bash automation scripts."},
                    {"id": "ops-30-2", "title": "Master Docker & Multi-Stage Builds", "desc": "Containerize Python and Node.js applications with minimal image footprints."},
                    {"id": "ops-30-3", "title": "Docker Compose Multi-Container Setup", "desc": "Orchestrate web service, PostgreSQL database, and Redis cache locally."}
                ]
            },
            "day_60": {
                "phase": "60 DAYS — BUILD",
                "theme": "CI/CD & Cloud Infrastructure",
                "milestone_goal": "Build an automated GitHub Actions CI/CD pipeline deploying onto AWS or Render.",
                "tasks": [
                    {"id": "ops-60-1", "title": "Build GitHub Actions CI/CD Pipeline", "desc": "Configure automated linting, test execution, Docker build, and container registry push."},
                    {"id": "ops-60-2", "title": "AWS Core Services Architecture", "desc": "Provision VPC, Security Groups, IAM Roles, S3 Buckets, and EC2 instances."},
                    {"id": "ops-60-3", "title": "Introduction to Terraform", "desc": "Write declarative HCL to provision an S3 bucket and EC2 instance with remote state."}
                ]
            },
            "day_90": {
                "phase": "90 DAYS — DEPLOY & PREPARE",
                "theme": "Kubernetes & Production Reliability",
                "milestone_goal": "Deploy a resilient microservice on a managed Kubernetes cluster with monitoring.",
                "tasks": [
                    {"id": "ops-90-1", "title": "Deploy to Kubernetes (Minikube / EKS)", "desc": "Write Pod, Deployment, Service, and Ingress manifests with rolling updates."},
                    {"id": "ops-90-2", "title": "Configure Observability & Alerting", "desc": "Set up uptime monitoring, health checks, and log streaming."},
                    {"id": "ops-90-3", "title": "DevOps Interview Prep", "desc": "Practice troubleshooting broken containers, deployment rollbacks, and security incident response."}
                ]
            }
        },
        "next_best_action": {
            "headline": "Create a GitHub repository with a complete Docker + GitHub Actions CI/CD pipeline.",
            "detail": "Containerize any web app, write GitHub Actions to run tests and push images to GitHub Container Registry, and document the architecture."
        }
    }
}
