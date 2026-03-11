# Quick-Response Tool: Sales Insight Automator

## Overview
A fast, secure tool for the sales team to convert raw sales data (CSV/Excel) into AI-curated executive summaries, delivered instantly via email.

## Engineer's Log

### Local Setup (Docker Compose)
1. Copy `.env.example` to `.env` and fill in necessary API keys and credentials.
2. Run the stack: `docker-compose up --build`
3. The incredibly sleek frontend will be at http://localhost:5173
4. The Swagger API Documentation will be at http://localhost:8000/docs

### Security Implementations
- **Rate Limiting**: Implemented `slowapi` ensuring consumers can only hit the endpoint `5 times per minute` to prevent abuse and API exhaustion.
- **CORS Handling**: Properly configured strict allowed origins restricting who can make requests to our API.
- **Robust Validation**: Files are strict-checked against allowed extensions and validated for 5MB max payload limits.
- **Fault Tolerance**: The Gememi interaction handles potential API timeouts gracefully, falling back to basic extraction, and the mailing service degrades gracefully if misconfigured locally.

### CI/CD
- GitHub action triggers on PRs to main.
- Lints frontend React codebase.
- Checks Python container installs accurately.# sales-insight-automater
