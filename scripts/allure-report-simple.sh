#!/bin/bash
RESULTS_DIR="./allure-results"
REPORT_DIR="./allure-report"
HISTORY_FILE="./history.jsonl"

# Check results
if [ ! -d "$RESULTS_DIR" ]; then
    echo "Error: '$RESULTS_DIR' not found."
    exit 1
fi

echo "Generating Allure report..."
npx allure awesome "$RESULTS_DIR" --output "$REPORT_DIR" --history-path "$HISTORY_FILE"

if [ $? -eq 0 ]; then
    echo "Report generated!"
    echo "Opening report..."
    
    # Check for /awesome subfolder (Allure 3 structure)
    AWESOME_PATH="$REPORT_DIR/awesome"
    if [ -d "$AWESOME_PATH" ]; then
        npx allure open "$AWESOME_PATH"
    elif [ -d "$REPORT_DIR" ]; then
        # Fallback: open report root
        npx allure open "$REPORT_DIR"
    else
        echo "Warning: Report folder not found. Try running test first."
    fi
else
    echo "Failed to generate report."
    exit 1
fi
