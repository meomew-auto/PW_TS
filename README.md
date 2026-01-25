# Playwright TypeScript Automation

## 🚀 Quick Start

```bash
npm install
npx playwright install
```

## 🧪 Run Tests

```bash
# CRM Tests (default config)
npm run test:crm

# Neko API Tests
npx playwright test --config playwright.lessons.config.ts --project neko-api

# Specific test file
npx playwright test tests/lessons/api/product-service.spec.ts --config playwright.lessons.config.ts --project neko-api
```

## 📊 Generate Allure Report

```bash
# Simple (opens server)
./scripts/allure-report-simple.ps1

# With history
./scripts/allure-history-version2.ps1
```

---

## 🔧 GitHub CLI (gh) Commands

### Setup
```bash
# Login to GitHub
gh auth login

# Check auth status
gh auth status
```

> **⚠️ Troubleshooting**: Nếu `gh` không được nhận, restart VS Code hoặc dùng full path:
> ```powershell
> & "C:\Program Files\GitHub CLI\gh.exe" auth login
> ```

### View CI/CD Runs
```bash
# List recent workflow runs
gh run list

# List last 5 runs
gh run list --limit 5

# View specific run details
gh run view <run-id>

# View failed run logs
gh run view <run-id> --log-failed

# Watch run in real-time
gh run watch
```

### Trigger Workflow Manually
```bash
# Trigger with default inputs
gh workflow run playwright.yml

# Trigger with specific inputs
gh workflow run playwright.yml -f test_suite=neko-api -f environment=staging

# Trigger on specific branch
gh workflow run playwright.yml --ref feature/ci
```

### Download Artifacts
```bash
# List artifacts from latest run
gh run download

# Download specific artifact
gh run download <run-id> -n playwright-report
gh run download <run-id> -n allure-report
```

### View Logs Quickly
```bash
# View logs of most recent failed run
gh run list --status failure --limit 1 --json databaseId -q ".[0].databaseId" | xargs gh run view --log-failed
```

---

## 🔑 GitHub Secrets Required

| Secret | Description |
|--------|-------------|
| `ADMIN_PASSWORD` | Password for admin test account |

---

## 📁 Project Structure

```
├── tests/
│   ├── CRM/              # CRM tests (default config)
│   └── lessons/
│       └── api/          # API tests (lessons config)
├── .github/workflows/
│   └── playwright.yml    # CI/CD workflow
├── playwright.config.ts  # Default config (CRM)
└── playwright.lessons.config.ts  # Lessons config (Neko API)
```
