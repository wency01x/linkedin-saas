1. Start PostgreSQL
   sudo systemctl start postgresql

2. Start Redis
   sudo systemctl start redis

3. Start Backend (FastAPI)
   cd backend
   source venv/bin/activate
   uvicorn app.main:app --reload --port 8000

4. Start Frontend (Next.js)
   cd frontend
   npm run dev

5. Start ngrok (for Clerk webhooks)
   ngrok http 8000

6. Update Clerk webhook URL
   → copy new ngrok URL
   → paste into Clerk dashboard → Webhooks → Edit
   → https://your-ngrok-url.ngrok-free.dev/api/v1/auth/webhook/clerk

7. (Optional) Start Celery Worker — for scheduling
   cd backend
   source venv/bin/activate
   celery -A celery_worker worker --loglevel=info