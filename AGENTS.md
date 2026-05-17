# NARRAT.AI — Agent Context File
> This file gives AI agents full context about this project.
> Read this before making any changes.

---

## What This Project Is
A full stack LinkedIn Content SaaS that uses AI to research, write, 
schedule, and analyze LinkedIn posts automatically for businesses.

---

## Tech Stack

### Frontend (frontend/)
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui (Radix UI primitives)
- Clerk (auth)
- TanStack Query (data fetching)
- Zustand (global state)
- Axios (HTTP client)
- Recharts (analytics charts)
- Sonner (toast notifications)
- Iconify + Lucide (icons)
- Framer Motion (animations)
- Fonts: Oswald, Space Grotesk, Inter

### Backend (backend/)
- Python + FastAPI
- SQLAlchemy (ORM)
- Alembic (migrations)
- PostgreSQL (database)
- Redis (job queue)
- Celery (background tasks)
- Google Gemini 2.5 Flash (AI content generation)
- Tavily API (web research)
- Clerk (JWT verification)
- svix (webhook verification)
- httpx (HTTP client)
- Resend (email)

---

## Project Structure

## Project Structure

### Frontend
- src/app/page.tsx — landing page
- src/app/layout.tsx — root layout + ClerkProvider
- src/app/sign-in/[[...sign-in]]/page.tsx — Clerk sign in
- src/app/sign-up/[[...sign-up]]/page.tsx — Clerk sign up
- src/app/onboarding/page.tsx — 4 step onboarding
- src/app/dashboard/layout.tsx — sidebar + navbar shell
- src/app/dashboard/page.tsx — dashboard overview
- src/app/dashboard/generate/page.tsx — AI content generation
- src/app/dashboard/analytics/page.tsx — performance analytics
- src/app/dashboard/settings/page.tsx — account settings
- src/components/ui/ — shadcn components
- src/components/providers.tsx — TanStack Query + Sonner
- src/hooks/useUser.ts — user data fetching
- src/hooks/usePosts.ts — posts data fetching
- src/hooks/useAnalytics.ts — analytics data fetching
- src/hooks/useAxiosAuth.ts — axios + Clerk auth interceptor
- src/store/useAppStore.ts — Zustand global state
- src/lib/api.ts — axios instance base URL

### Backend
- app/main.py — FastAPI entry point + CORS + routers
- app/api/v1/auth.py — Clerk webhook + /me endpoint
- app/api/v1/users.py — user CRUD
- app/api/v1/posts.py — post CRUD + scheduling
- app/api/v1/content.py — AI generation endpoints
- app/api/v1/analytics.py — analytics endpoints
- app/api/v1/linkedin.py — LinkedIn OAuth + connect/disconnect
- app/core/config.py — reads .env variables
- app/core/database.py — PostgreSQL connection + get_db
- app/core/redis.py — Redis connection
- app/core/security.py — Clerk JWT verification
- app/models/user.py — users table
- app/models/post.py — posts table + PostStatus enum
- app/models/linkedin_account.py — linkedin_accounts table
- app/schemas/user.py — UserCreate, UserUpdate, UserResponse
- app/schemas/post.py — PostGenerate, PostUpdate, PostResponse
- app/services/ai_content.py — Gemini AI post generation
- app/services/linkedin_api.py — publish + fetch analytics
- app/services/research.py — Tavily trending topic search
- app/tasks/scheduler.py — auto publish scheduled posts
- app/tasks/analytics_sync.py — sync LinkedIn analytics
- celery_worker.py — Celery entry point
- alembic/ — database migration history
- requirements.txt — all Python packages

---

## Backend API Routes

### Auth
- POST /api/v1/auth/webhook/clerk
- GET  /api/v1/auth/me

### Users
- GET    /api/v1/users/
- PATCH  /api/v1/users/
- DELETE /api/v1/users/

### Posts
- GET    /api/v1/posts/
- GET    /api/v1/posts/{post_id}
- PATCH  /api/v1/posts/{post_id}
- DELETE /api/v1/posts/{post_id}
- POST   /api/v1/posts/{post_id}/schedule

### Content (AI)
- POST /api/v1/content/generate
- POST /api/v1/content/generate/bulk

### Analytics
- GET /api/v1/analytics/summary
- GET /api/v1/analytics/posts

### LinkedIn
- GET    /api/v1/linkedin/connect
- GET    /api/v1/linkedin/callback
- GET    /api/v1/linkedin/status
- DELETE /api/v1/linkedin/disconnect

---

## Database Models

### User
- id (String, Clerk user ID)
- email (String)
- full_name (String)
- industry (String) ← voice profile
- target_audience (String) ← voice profile
- tone (String) ← voice profile
- is_active (Boolean)
- created_at (DateTime)

### Post
- id (String, UUID)
- user_id (ForeignKey → users.id)
- content (Text, max 3000 chars)
- status (Enum: draft | scheduled | published | failed)
- topic (String)
- scheduled_at (DateTime)
- published_at (DateTime)
- linkedin_post_id (String)
- impressions, likes, comments, reposts (Integer)
- created_at (DateTime)

### LinkedInAccount
- id (String, UUID)
- user_id (ForeignKey → users.id, unique)
- linkedin_id (String)
- linkedin_email (String)
- full_name (String)
- profile_picture (String)
- access_token (String)
- refresh_token (String)
- token_expires_at (DateTime)
- is_active (Boolean)

---

## Environment Variables

### backend/.env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/linkedin_saas
REDIS_URL=redis://localhost:6379/0
GEMINI_API_KEY=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
LINKEDIN_REDIRECT_URI=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
RESEND_API_KEY=
SECRET_KEY=
TAVILY_API_KEY=

### frontend/.env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_API_URL=http://localhost:8000
RESEND_API_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/onboarding

---

## How To Run Locally

Terminal 1 — Backend:
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

Terminal 2 — Frontend:
```bash
cd frontend
npm run dev
```

Terminal 3 — Celery Worker:
```bash
cd backend
source venv/bin/activate
celery -A celery_worker worker --loglevel=info
```

Terminal 4 — ngrok (for Clerk webhooks):
```bash
ngrok http 8000
```

Services check:
```bash
sudo systemctl status postgresql
sudo systemctl status redis
```

---

## Current Status

### Done
- Full backend built and running
- Database tables created via Alembic
- Clerk auth + webhook working
- User creation flow tested
- Frontend pages built (landing, onboarding, dashboard, 
  generate, analytics, settings)
- Landing page working

### In Progress
- Frontend API connections (hooks wiring to backend)
- Onboarding saving to database
- Dashboard loading real data

### Blocked
- LinkedIn API (waiting for approval)
- Payments (Stripe not set up yet)

### Not Started
- Deployment (Vercel + Railway)
- Email flows (Resend)
- Stripe payments

---

## Key Decisions Made
- Using Google Gemini 2.5 Flash (free tier) over Claude/GPT
- Celery + Redis instead of BullMQ (Python stack)
- Clerk for auth instead of Auth.js (better Next.js integration)
- PostgreSQL over Firebase (relational data fits better)
- Soft deletes for users (is_active = False)
- Hard deletes for posts (drafts have no value to keep)
- Voice profile required before AI generation allowed
- LinkedIn credentials = placeholder until API approved

---

## Coding Conventions
- All API routes use snake_case
- Frontend components use PascalCase
- All async functions in backend use async/await
- Always use Depends(get_db) for database sessions
- Always use Depends(verify_clerk_token) for protected routes
- Use toast.promise() for async operations in frontend
- Never hardcode API URLs — always use lib/api.ts axios instance


