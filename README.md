# NARRAT.AI

**The Ultimate LinkedIn Growth Engine** — An AI-powered SaaS platform that generates, schedules, and analyzes high-converting LinkedIn posts in your unique voice.

Built for creators, founders, and agencies who want to dominate LinkedIn without staring at a blank page.

---

## Features

- **AI Content Generation** — Powered by Google Gemini 2.5 Flash, generates LinkedIn posts tailored to your industry, audience, and tone
- **Voice Profiling** — Onboarding flow that captures your industry, target audience, and preferred tone so the AI writes like *you*
- **Trend Research** — Integrates Tavily search to ground AI-generated content in real-time industry trends
- **Post Management** — Create, edit, save, and organize your LinkedIn content library
- **Performance Analytics** — Track impressions, engagement rates, and content performance
- **LinkedIn Integration** — Connect your LinkedIn account for streamlined publishing
- **Smart Scheduling** — Queue posts and publish at optimal engagement times

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [Clerk v7](https://clerk.com/) | Authentication & user management |
| [TanStack Query](https://tanstack.com/query) | Server state management |
| [Zustand](https://zustand-demo.pmnd.rs/) | Client state management |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Recharts](https://recharts.org/) | Analytics charts |
| [Sonner](https://sonner.emilkowal.dev/) | Toast notifications |

### Backend
| Technology | Purpose |
|---|---|
| [FastAPI](https://fastapi.tiangolo.com/) | Python API framework |
| [SQLAlchemy](https://www.sqlalchemy.org/) | ORM & database toolkit |
| [PostgreSQL 16](https://www.postgresql.org/) | Primary database |
| [Redis 7](https://redis.io/) | Caching & task queue broker |
| [Celery](https://docs.celeryq.dev/) | Background task processing |
| [Alembic](https://alembic.sqlalchemy.org/) | Database migrations |
| [Google Gemini](https://ai.google.dev/) | AI content generation |
| [Tavily](https://tavily.com/) | Web search / trend research |
| [Resend](https://resend.com/) | Transactional emails |
| [PyJWT](https://pyjwt.readthedocs.io/) | Clerk token verification |

### Infrastructure
| Technology | Purpose |
|---|---|
| [Docker Compose](https://docs.docker.com/compose/) | Local PostgreSQL & Redis |
| [Clerk Webhooks](https://clerk.com/docs/integrations/webhooks) | User sync to database |

---

## 📁 Project Structure

```
linkedin-saas/
├── docker-compose.yml          # PostgreSQL 16 + Redis 7
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx                # Landing page
│   │   │   ├── layout.tsx              # Root layout + ClerkProvider
│   │   │   ├── sign-in/                # Clerk Sign In
│   │   │   ├── sign-up/                # Clerk Sign Up
│   │   │   ├── onboarding/             # Voice profile setup
│   │   │   └── dashboard/
│   │   │       ├── layout.tsx          # Sidebar + auth guard
│   │   │       ├── page.tsx            # Dashboard overview
│   │   │       ├── generate/           # AI content generation
│   │   │       ├── analytics/          # Performance analytics
│   │   │       └── settings/           # Account settings
│   │   ├── hooks/                      # useUser, useAxiosAuth
│   │   ├── lib/                        # Axios instance
│   │   └── store/                      # Zustand store
│   └── .env.local                      # Clerk keys + API URL
└── backend/
    ├── app/
    │   ├── main.py                     # FastAPI app entry
    │   ├── api/v1/
    │   │   ├── auth.py                 # Clerk webhook + /me
    │   │   ├── users.py                # CRUD user profile
    │   │   ├── content.py              # AI generation endpoint
    │   │   ├── posts.py                # Post CRUD
    │   │   ├── analytics.py            # Analytics endpoints
    │   │   └── linkedin.py             # LinkedIn OAuth + publishing
    │   ├── core/
    │   │   ├── config.py               # Pydantic settings
    │   │   ├── database.py             # SQLAlchemy engine
    │   │   └── security.py             # JWT verification (JWKS)
    │   ├── models/                     # SQLAlchemy models
    │   ├── schemas/                    # Pydantic schemas
    │   ├── services/
    │   │   ├── ai_content.py           # Gemini content generation
    │   │   ├── research.py             # Tavily trend research
    │   │   └── linkedin_api.py         # LinkedIn API client
    │   └── tasks/                      # Celery background tasks
    ├── alembic/                        # Database migrations
    ├── requirements.txt
    └── .env                            # API keys + DB URL
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Python** ≥ 3.12
- **Docker & Docker Compose**

### 1. Clone the Repository

```bash
git clone https://github.com/wency01x/linkedin-saas.git
cd linkedin-saas
```

### 2. Start the Database

```bash
# Stop any local PostgreSQL/Redis to free ports 5432 & 6379
sudo systemctl stop postgresql redis-server

# Start Docker containers
docker-compose up -d
```

### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
# Edit .env with your API keys (Clerk, Gemini, Tavily, Resend)

# Start the server
uvicorn app.main:app --reload
```

The backend will be running at `http://localhost:8000`.

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
# Edit .env.local with your Clerk publishable key and backend URL

# Start the dev server
npm run dev
```

The frontend will be running at `http://localhost:3000`.

---

## Environment Variables

### Backend (`backend/.env`)

```env
# AI
GEMINI_API_KEY=your_gemini_api_key

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/linkedin_saas

# Redis
REDIS_URL=redis://localhost:6379/0

# Clerk
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# LinkedIn OAuth (fill when ready)
LINKEDIN_CLIENT_ID=placeholder
LINKEDIN_CLIENT_SECRET=placeholder
LINKEDIN_REDIRECT_URI=http://localhost:3000/api/auth/linkedin/callback

# Resend
RESEND_API_KEY=re_...

# App
SECRET_KEY=your_random_secret

# Tavily
TAVILY_API_KEY=tvly-...
```

### Frontend (`frontend/.env.local`)

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/onboarding

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# Resend
RESEND_API_KEY=re_...
```

---

## Authentication Flow

```
New User:
  Sign Up → /onboarding → fill profile → /dashboard

Returning User:
  Sign In → /dashboard → has industry? → show dashboard
                        → no industry? → redirect to /onboarding
```

- **Clerk** handles authentication (email/password, Google OAuth)
- **JWT tokens** are verified server-side using Clerk's JWKS endpoint (no deprecated API calls)
- **Webhook fallback**: If the Clerk webhook hasn't fired yet, the backend auto-creates the user by fetching their profile from the Clerk API

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/auth/webhook/clerk` | Clerk webhook for user sync |
| `GET` | `/api/v1/auth/me` | Get current authenticated user |
| `GET` | `/api/v1/users/` | Get user profile |
| `PATCH` | `/api/v1/users/` | Update user profile |
| `DELETE` | `/api/v1/users/` | Soft-delete user account |
| `POST` | `/api/v1/content/generate` | Generate AI LinkedIn post |
| `GET` | `/api/v1/posts/` | List user posts |
| `POST` | `/api/v1/posts/` | Create a post |
| `PATCH` | `/api/v1/posts/{id}` | Update a post |
| `DELETE` | `/api/v1/posts/{id}` | Delete a post |
| `GET` | `/api/v1/analytics/` | Get performance analytics |
| `GET` | `/api/v1/linkedin/connect` | Initiate LinkedIn OAuth |

---

## License

This project is private and not licensed for public distribution.
