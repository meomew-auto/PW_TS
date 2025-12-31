#!/bin/bash
# ========================================
# Allure Report với History Links (macOS/Linux)
# ========================================

RESULTS_DIR="./allure-results"
REPORTS_ROOT="./allure-reports"
HISTORY_FILE="./history.jsonl"
SERVER_PORT=5500

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
GRAY='\033[0;37m'
NC='\033[0m' # No Color

# Kiểm tra thư mục kết quả
if [ ! -d "$RESULTS_DIR" ]; then
    echo -e "${RED}Error: Results directory '$RESULTS_DIR' not found.${NC}"
    exit 1
fi

# Tạo folder riêng cho lần chạy này
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
REPORT_DIR="$REPORTS_ROOT/$TIMESTAMP"

echo -e "\n${CYAN}=== Allure Report với History Links ===${NC}"
echo -e "${GRAY}Report: $REPORT_DIR${NC}"

# Generate report
echo -e "\n${CYAN}Generating report...${NC}"
npx allure awesome "$RESULTS_DIR" --output "$REPORT_DIR" --history-path "$HISTORY_FILE"

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to generate report.${NC}"
    exit 1
fi

echo -e "${GREEN}Report generated!${NC}"

# Debug: Check folder structure
echo -e "\n${GRAY}Checking folder structure...${NC}"
AWESOME_FOLDER="$REPORT_DIR/awesome"
INDEX_IN_AWESOME="$AWESOME_FOLDER/index.html"

if [ -f "$INDEX_IN_AWESOME" ]; then
    echo -e "${GREEN}Found report in /awesome subfolder${NC}"
else
    echo -e "${YELLOW}Warning: index.html not found in /awesome${NC}"
    echo -e "${YELLOW}Contents of $REPORT_DIR:${NC}"
    ls -la "$REPORT_DIR"
fi

# ========== PATCH HISTORY.JSONL ==========
if [ -f "$HISTORY_FILE" ]; then
    echo -e "\n${YELLOW}Patching history.jsonl...${NC}"
    
    REPORT_URL="http://localhost:$SERVER_PORT/$TIMESTAMP"
    
    # Read last line, parse JSON, update url, write back
    # Using jq if available, otherwise sed fallback
    if command -v jq &> /dev/null; then
        # Get all lines except last, then update last line with jq
        LAST_LINE=$(tail -n 1 "$HISTORY_FILE")
        HEAD_LINES=$(head -n -1 "$HISTORY_FILE")
        UPDATED_LINE=$(echo "$LAST_LINE" | jq -c ".url = \"$REPORT_URL\"")
        
        if [ -n "$HEAD_LINES" ]; then
            echo "$HEAD_LINES" > "$HISTORY_FILE"
            echo "$UPDATED_LINE" >> "$HISTORY_FILE"
        else
            echo "$UPDATED_LINE" > "$HISTORY_FILE"
        fi
        echo -e "${GREEN}History patched! URL: $REPORT_URL${NC}"
    else
        # Fallback using sed (less reliable)
        sed -i.bak "$ s/\"url\":\"[^\"]*\"/\"url\":\"$REPORT_URL\"/" "$HISTORY_FILE"
        rm -f "${HISTORY_FILE}.bak"
        echo -e "${GREEN}History patched (sed fallback)! URL: $REPORT_URL${NC}"
    fi
fi

# ========== SERVE & OPEN ==========
echo -e "\n${CYAN}Starting server...${NC}"

ABSOLUTE_REPORTS_ROOT=$(cd "$REPORTS_ROOT" && pwd)
REPORT_URL="http://localhost:$SERVER_PORT/$TIMESTAMP/"

echo -e "${GRAY}Server root: $ABSOLUTE_REPORTS_ROOT${NC}"
echo -e "${GRAY}Report URL:  $REPORT_URL${NC}"
echo -e "\n${GREEN}History links should now be clickable!${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop server\n${NC}"

# Create server script
SERVER_SCRIPT="$ABSOLUTE_REPORTS_ROOT/server.cjs"
cat > "$SERVER_SCRIPT" << 'EOF'
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5500;
const ROOT = '.';

const MIME = {'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff':'font/woff','.woff2':'font/woff2'};

http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
  
  // IMPORTANT: Allure auto-appends /awesome to URLs, but our reports don't have that subfolder
  // Strip /awesome from path
  if (url.endsWith('/awesome') || url.includes('/awesome/')) {
    url = url.replace('/awesome/', '/').replace('/awesome', '');
    if (url === '' || url === '/') url = '/';
  }
  
  let file = path.join(ROOT, url);
  
  console.log(`[${new Date().toISOString().slice(11,19)}] ${req.method} ${req.url} -> ${url}`);
  
  if (!fs.existsSync(file)) { 
    console.log('  -> 404 Not found');
    res.writeHead(404); res.end('Not found'); 
    return; 
  }
  if (fs.statSync(file).isDirectory()) {
    const idx = path.join(file, 'index.html');
    if (fs.existsSync(idx)) file = idx;
    else { res.writeHead(200,{'Content-Type':'text/html'}); res.end('<h1>Dir</h1>'); return; }
  }
  
  const ext = path.extname(file).toLowerCase();
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(500); res.end('Error'); return; }
    res.writeHead(200, {'Content-Type': MIME[ext]||'application/octet-stream','Access-Control-Allow-Origin':'*'});
    res.end(data);
  });
}).listen(PORT, () => console.log('\nServer: http://localhost:' + PORT + '\n'));
EOF

echo -e "${GRAY}Server script created${NC}"

# Open browser after 2 seconds (background)
(sleep 2 && open "$REPORT_URL" 2>/dev/null || xdg-open "$REPORT_URL" 2>/dev/null || echo "Open browser: $REPORT_URL") &

# Start server
cd "$ABSOLUTE_REPORTS_ROOT"
node server.cjs
