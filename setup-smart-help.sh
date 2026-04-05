#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔═══════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   🤖 Smart Help Setup Script 🤖      ║${NC}"
echo -e "${BLUE}╔═══════════════════════════════════════╗${NC}"
echo ""

# Check if .env exists
if [ -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file already exists. Skipping creation.${NC}"
else
    echo -e "${GREEN}📝 Creating .env file from template...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created!${NC}"
    echo ""
    echo -e "${YELLOW}🔑 IMPORTANT: Edit .env and add your Anthropic API key!${NC}"
    echo -e "   Open: ${BLUE}.env${NC}"
    echo -e "   Add your key to: ${BLUE}ANTHROPIC_API_KEY=sk-ant-api03-...${NC}"
    echo ""
    read -p "Press Enter when you've added your API key..."
fi

# Install backend dependencies
echo ""
echo -e "${GREEN}📦 Installing backend dependencies...${NC}"
cd server
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend dependencies installed!${NC}"
else
    echo -e "${RED}✗ Error installing backend dependencies${NC}"
    exit 1
fi

cd ..

# Create frontend .env if doesn't exist
if [ -f ".env" ]; then
    if ! grep -q "VITE_SMART_HELP_API_URL" .env; then
        echo "" >> .env
        echo "# Smart Help API URL" >> .env
        echo "VITE_SMART_HELP_API_URL=http://localhost:3001" >> .env
        echo -e "${GREEN}✓ Added VITE_SMART_HELP_API_URL to .env${NC}"
    fi
fi

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ✅ Setup Complete! ✅               ║${NC}"
echo -e "${GREEN}╔═══════════════════════════════════════╗${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo -e "  1. Start the backend:  ${GREEN}cd server && npm start${NC}"
echo -e "  2. Start the frontend: ${GREEN}npm run dev${NC}"
echo -e "  3. Test smart help:    ${GREEN}http://localhost:5173${NC}"
echo ""
echo -e "${YELLOW}📚 Read SMART_HELP_README.md for full documentation${NC}"
echo ""
