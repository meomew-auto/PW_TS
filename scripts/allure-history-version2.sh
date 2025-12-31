#!/bin/bash

RESULTS_DIR="allure-results"
REPORT_DIR="allure-report"

echo ""
echo "============================================"
echo "  ALLURE REPORT GENERATOR"
echo "============================================"

# BƯỚC 1: Copy history từ report cũ
if [ -d "$REPORT_DIR/history" ]; then
    echo "[1/3] Copying history..."
    mkdir -p "$RESULTS_DIR"
    rm -rf "$RESULTS_DIR/history"
    cp -r "$REPORT_DIR/history" "$RESULTS_DIR/history"
    echo "      Done!"
else
    echo "[1/3] No history (first run)"
fi

# BƯỚC 2: Xóa report cũ trước khi generate mới (thay cho --clean)
if [ -d "$REPORT_DIR" ]; then
    echo "[2/3] Cleaning old report..."
    rm -rf "$REPORT_DIR"
    echo "      Done!"
else
    echo "[2/3] No old report to clean"
fi

# BƯỚC 3: Generate report (Allure 3 syntax)
echo "[3/3] Generating report..."
# dành cho phiên bản ver 2.0
npx allure-commandline generate $ResultsDir -o $ReportDir --clean

if [ $? -eq 0 ]; then
    echo "      Done!"
else
    echo "      Failed!"
    exit 1
fi

echo ""
echo "============================================"
echo "  Open: allure open $REPORT_DIR"
echo "============================================"
echo ""
