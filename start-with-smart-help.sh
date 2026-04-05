#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔═══════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   🚀 Starting DSPath with Smart Help  ║${NC}"
echo -e "${BLUE}╔═══════════════════════════════════════╗${NC}"
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  No .env file found!${NC}"
    echo -e "${YELLOW}   Run: ./setup-smart-help.sh first${NC}"
    exit 1
fi

# Check if API key is set
if ! grep -q "ANTHROPIC_API_KEY=sk-ant" .env; then
    echo -e "${YELLOW}⚠️  Anthropic API key not configured in .env${NC}"
    echo -e "${YELLOW}   Add your key to .env: ANTHROPIC_API_KEY=sk-ant-api03-...${NC}"
    exit 1
fi

# Function to cleanup background processes on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Stopping servers...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

# Start backend
echo -e "${GREEN}🔧 Starting backend server...${NC}"
cd server
npm start &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Check if backend is running
if kill -0 $BACKEND_PID 2>/dev/null; then
    echo -e "${GREEN}✓ Backend running on http://localhost:3001${NC}"
else
    echo -e "${RED}✗ Backend failed to start${NC}"
    exit 1
fi

# Start frontend
echo -e "${GREEN}🎨 Starting frontend...${NC}"
npm run dev &
FRONTEND_PID=$!

sleep 2

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ✅ Both servers are running! ✅     ║${NC}"
echo -e "${GREEN}╔═══════════════════════════════════════╗${NC}"
echo ""
echo -e "${BLUE}📍 Frontend:${NC}  http://localhost:5173"
echo -e "${BLUE}📍 Backend:${NC}   http://localhost:3001"
echo -e "${BLUE}📍 Health:${NC}    http://localhost:3001/health"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}"
echo ""

# Wait for processes
wait $BACKEND_PID $FRONTEND_PID
