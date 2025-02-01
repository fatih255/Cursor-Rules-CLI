#!/bin/bash

# ANSI color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up cursor-rules...${NC}\n"

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}Installing pnpm...${NC}"
    npm install -g pnpm
fi

# Install and setup
pnpm install
chmod +x scripts/generate-global-rules.js
pnpm link --global

# Success message
echo -e "\n${GREEN}✓ Installation complete!${NC}"
echo -e "\nUsage:"
echo -e "cursor-rules    Generate documentation index" 