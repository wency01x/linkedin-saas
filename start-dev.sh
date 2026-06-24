#!/usr/bin/env bash

# Color variables for beautiful output
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Print banner
echo -e "${BLUE}${BOLD}==================================================${NC}"
echo -e "${BLUE}${BOLD}   NARRAT.AI - Development Environment Startup     ${NC}"
echo -e "${BLUE}${BOLD}==================================================${NC}"

# Check for --tmux flag
USE_TMUX=false
if [ "$1" == "--tmux" ]; then
    USE_TMUX=true
fi

# Helper function to check and start a system service
check_and_start_service() {
    local service=$1
    if ! systemctl is-active --quiet "$service"; then
        echo -e "${YELLOW}Service '$service' is not running. Starting via systemctl (requires sudo)...${NC}"
        sudo systemctl start "$service"
        if [ $? -ne 0 ]; then
            echo -e "${RED}Failed to start '$service'. Please start it manually.${NC}"
            exit 1
        fi
        echo -e "${GREEN}✓ '$service' started successfully.${NC}"
    else
        echo -e "${GREEN}✓ '$service' is already running.${NC}"
    fi
}

# 1. Start PostgreSQL
check_and_start_service postgresql

# 2. Start Redis
check_and_start_service redis

# Pre-checks for workspace integrity
if [ ! -d "backend/venv" ]; then
    echo -e "${RED}Error: backend/venv directory not found.${NC}"
    echo -e "Please set up the backend virtual environment first by running:"
    echo -e "  python3 -m venv backend/venv && source backend/venv/bin/activate && pip install -r backend/requirements.txt"
    exit 1
fi

if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}Warning: frontend/node_modules not found. Attempting to install frontend dependencies...${NC}"
    (cd frontend && npm install)
    if [ $? -ne 0 ]; then
        echo -e "${RED}Error: 'npm install' failed inside frontend/. Please run it manually.${NC}"
        exit 1
    fi
fi

# Run in TMUX mode if requested
if [ "$USE_TMUX" = true ]; then
    if ! command -v tmux &> /dev/null; then
        echo -e "${RED}Error: tmux is not installed. Falling back to background processes mode...${NC}"
        USE_TMUX=false
    else
        SESSION="narrat-ai-dev"
        
        # Kill existing session if it exists
        socket_path="/tmp/tmux-$(id -u)/default"
        if [ -S "$socket_path" ] && tmux has-session -t "$SESSION" 2>/dev/null; then
            tmux kill-session -t "$SESSION" 2>/dev/null
        fi
        
        echo -e "${GREEN}Starting tmux session '$SESSION'...${NC}"
        
        # Create a new session, window 0, named "Backend"
        tmux new-session -d -s "$SESSION" -n "Backend" -c "$(pwd)/backend"
        tmux send-keys -t "$SESSION:Backend" "source venv/bin/activate && uvicorn app.main:app --reload --port 8000" C-m
        
        # Create a window for Frontend
        tmux new-window -t "$SESSION" -n "Frontend" -c "$(pwd)/frontend"
        tmux send-keys -t "$SESSION:Frontend" "npm run dev" C-m
        
        # Create a window for Celery Worker
        tmux new-window -t "$SESSION" -n "Celery" -c "$(pwd)/backend"
        tmux send-keys -t "$SESSION:Celery" "source venv/bin/activate && celery -A celery_worker worker --loglevel=info" C-m
        
        # Create a window for ngrok
        tmux new-window -t "$SESSION" -n "ngrok" -c "$(pwd)"
        tmux send-keys -t "$SESSION:ngrok" "ngrok http 8000" C-m
        
        echo -e "${GREEN}Tmux session started successfully!${NC}"
        echo -e "Attach to the session using: ${BOLD}tmux attach -t $SESSION${NC}"
        echo -e "Useful tmux keys: ${BOLD}Ctrl+B${NC} then ${BOLD}n${NC} (next window) or ${BOLD}p${NC} (previous window)."
        
        # Clear trap so it doesn't trigger cleanup on this shell's exit
        trap - EXIT SIGINT SIGTERM
        exit 0
    fi
fi

# Create logs directory for process outputs
mkdir -p logs

BACKEND_PID=""
FRONTEND_PID=""
NGROK_PID=""
CELERY_PID=""

# Helper function to recursively kill a process and all its children
kill_descendants() {
    local target_pid=$1
    if [ -n "$target_pid" ] && kill -0 "$target_pid" 2>/dev/null; then
        local pids
        pids=$(pgrep -P "$target_pid")
        for pid in $pids; do
            kill_descendants "$pid"
        done
        kill "$target_pid" 2>/dev/null
    fi
}

# Cleanup function to kill all spawned processes on exit
cleanup() {
    echo -e "\n${YELLOW}Stopping all development services...${NC}"
    
    # Terminate backend process and descendants
    if [ -n "$BACKEND_PID" ]; then
        echo -e "Stopping Backend (PID $BACKEND_PID)..."
        kill_descendants "$BACKEND_PID"
    fi
    
    # Terminate frontend process and descendants
    if [ -n "$FRONTEND_PID" ]; then
        echo -e "Stopping Frontend (PID $FRONTEND_PID)..."
        kill_descendants "$FRONTEND_PID"
    fi
    
    # Terminate Celery process and descendants
    if [ -n "$CELERY_PID" ]; then
        echo -e "Stopping Celery Worker (PID $CELERY_PID)..."
        kill_descendants "$CELERY_PID"
    fi
    
    # Terminate ngrok process and descendants
    if [ -n "$NGROK_PID" ]; then
        echo -e "Stopping ngrok (PID $NGROK_PID)..."
        kill_descendants "$NGROK_PID"
    fi
    
    wait 2>/dev/null
    echo -e "${GREEN}All services stopped successfully. Environment clean!${NC}"
}

# Register trap for clean exit
trap cleanup EXIT SIGINT SIGTERM

# 3. Start Backend (FastAPI)
echo -e "${CYAN}Starting Backend (FastAPI)... (Logs: logs/backend.log)${NC}"
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000 > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
deactivate 2>/dev/null
cd ..

# 4. Start Frontend (Next.js)
echo -e "${CYAN}Starting Frontend (Next.js)... (Logs: logs/frontend.log)${NC}"
cd frontend
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# 7. Start Celery Worker (for scheduling)
echo -e "${CYAN}Starting Celery Worker... (Logs: logs/celery.log)${NC}"
cd backend
source venv/bin/activate
celery -A celery_worker worker --loglevel=info > ../logs/celery.log 2>&1 &
CELERY_PID=$!
deactivate 2>/dev/null
cd ..

# 5. Start ngrok (for Clerk webhooks)
if ! command -v ngrok &> /dev/null; then
    echo -e "${YELLOW}Warning: ngrok command not found. Skipping ngrok webhook tunnel.${NC}"
else
    echo -e "${CYAN}Starting ngrok tunnel... (Logs: logs/ngrok.log)${NC}"
    ngrok http 8000 > logs/ngrok.log 2>&1 &
    NGROK_PID=$!
    
    # 6. Retrieve and display Clerk webhook URL automatically
    echo -n "Waiting for ngrok to generate public URL"
    for i in {1..10}; do
        sleep 1.2
        echo -n "."
        NGROK_URL=$(python3 -c "
import urllib.request, json
try:
    with urllib.request.urlopen('http://127.0.0.1:4040/api/tunnels') as r:
        data = json.loads(r.read().decode())
        for t in data.get('tunnels', []):
            if t.get('proto') == 'https':
                print(t.get('public_url'))
                break
except Exception:
    pass
" 2>/dev/null)
        if [ -n "$NGROK_URL" ]; then
            break
        fi
    done
    echo ""
    
    if [ -n "$NGROK_URL" ]; then
        echo -e "${GREEN}${BOLD}==================================================================${NC}"
        echo -e "${GREEN}${BOLD}🎉 ngrok Tunnel Active!${NC}"
        echo -e "Public URL:  ${CYAN}${BOLD}$NGROK_URL${NC}"
        echo -e "Webhook URL: ${CYAN}${BOLD}$NGROK_URL/api/v1/auth/webhook/clerk${NC}"
        echo -e "${YELLOW}Please copy the Webhook URL above and paste it into:${NC}"
        echo -e "👉 Clerk Dashboard → Webhooks → Add Endpoint or Edit existing Endpoint"
        echo -e "${GREEN}${BOLD}==================================================================${NC}"
    else
        echo -e "${YELLOW}Warning: ngrok started but could not fetch public URL. Check logs/ngrok.log${NC}"
    fi
fi

echo -e "\n${GREEN}🚀 All services are successfully running!${NC}"
echo -e "You can monitor logs in real-time:"
echo -e "  - Backend:  ${BOLD}tail -f logs/backend.log${NC}"
echo -e "  - Frontend: ${BOLD}tail -f logs/frontend.log${NC}"
echo -e "  - Celery:   ${BOLD}tail -f logs/celery.log${NC}"
if [ -n "$NGROK_PID" ]; then
    echo -e "  - ngrok:    ${BOLD}tail -f logs/ngrok.log${NC}"
fi
echo -e "\n${YELLOW}${BOLD}Press [Ctrl+C] to stop all services simultaneously.${NC}"

# Simple loop to keep script alive and verify background processes health
while true; do
    sleep 3
    # Check if any started process died unexpectedly
    for service_info in "Backend:${BACKEND_PID}" "Frontend:${FRONTEND_PID}" "Celery:${CELERY_PID}"; do
        name="${service_info%%:*}"
        pid="${service_info#*:}"
        if [ -n "$pid" ] && ! kill -0 "$pid" 2>/dev/null; then
            echo -e "${RED}⚠️  $name (PID $pid) has stopped working! Check logs/${name,,}.log${NC}"
        fi
    done
    
    if [ -n "$NGROK_PID" ] && ! kill -0 "$NGROK_PID" 2>/dev/null; then
        echo -e "${RED}⚠️  ngrok has stopped working! Check logs/ngrok.log${NC}"
        NGROK_PID="" # Reset so we don't alert repeatedly
    fi
done
