# AI Notes Workspace

A modern, premium-feeling Notes Workspace built with the MERN stack and AI features.

Live demo
- Frontend (Vercel): https://sas-notes-assignment.vercel.app/
- Backend (Render): https://sas-notes-assignment.onrender.com

Test account
- Email: sumit@gmail.com
- To create or test the account, register via the app or use the curl example below.

Quick local setup
Prereqs: Node.js 18+, npm, MongoDB Atlas account

1. Backend
  cd backend
  copy backend/.env.example to backend/.env and set:
    - MONGO_URI (MongoDB Atlas connection string)
    - JWT_SECRET (random string)
    - GEMINI_API_KEY or GOOGLE_SERVICE_ACCOUNT_KEY (optional, for AI)
  npm install
  npm run dev
  # Server runs at http://localhost:5000

2. Frontend
  cd frontend
  copy frontend/.env.example to frontend/.env and set:
    - VITE_API_BASE_URL=http://localhost:5000
  npm install
  npm run dev
  # App runs at http://localhost:3000

API quick tests (use PowerShell/curl)
- Register:
  curl -X POST https://sas-notes-assignment.onrender.com/api/auth/register -H "Content-Type: application/json" -d '{"name":"Sumit","email":"sumit@gmail.com","password":"pass"}'
- Login:
  curl -X POST https://sas-notes-assignment.onrender.com/api/auth/login -H "Content-Type: application/json" -d '{"email":"sumit@gmail.com","password":"pass"}'
- Get notes (replace <TOKEN>):
  curl -H "Authorization: Bearer <TOKEN>" https://sas-notes-assignment.onrender.com/api/notes

Environment variables
- backend/.env.example
  MONGO_URI=
  JWT_SECRET=
  GEMINI_API_KEY=
  PORT=5000

- frontend/.env.example
  VITE_API_BASE_URL=
  VITE_GEMINI_KEY=

Deployment notes
- Backend → Render
  - Create a Web Service, set Root Directory to `backend`
  - Build command: `npm install`
  - Start command: `npm start`
  - Set Render environment variables (MONGO_URI, JWT_SECRET, GOOGLE_SERVICE_ACCOUNT_KEY or GEMINI_API_KEY)

- Frontend → Vercel
  - Import repo, set Project Root to `frontend`
  - Build command: `npm run build`, Output directory: `dist`
  - Set VITE_API_BASE_URL to your Render backend URL
  - Add `vercel.json` with SPA rewrite to ensure client-side routing works

Security & cleanup (important)
- DO NOT commit secrets. If .env files or keys were pushed to the repo, rotate credentials immediately (MongoDB user, Google API keys) and remove the files from git history.
- Remove tracked .env files and add to .gitignore:
  git rm --cached backend/.env
  echo "backend/.env" >> .gitignore
  git commit -m "Remove backend .env"
- If secrets were exposed publicly, use BFG or git-filter-repo to scrub history and then reissue credentials.

AI (Gemini) integration
- The backend supports Google Generative AI (Gemini). For production, prefer service account auth (GOOGLE_SERVICE_ACCOUNT_KEY or GOOGLE_APPLICATION_CREDENTIALS) and set GEMINI_MODEL to the exact model name.
- For local dev, a mocked AI response is used when no credentials are present.

Troubleshooting
- 404 on refresh → add SPA rewrite (vercel.json) to frontend
- CORS errors → ensure VITE_API_BASE_URL matches backend URL and backend CORS allows the origin
- Mongo connection errors → confirm Atlas IP whitelist and correct MONGO_URI
- AI 404/auth errors → verify Google credentials and model name

Where to find things
- Backend: backend/src
- Frontend: frontend/src
- Env examples: backend/.env.example, frontend/.env.example

Need help?
Reply and I can:
- Generate a ready-to-copy `vercel.json` and Render env var list
- Provide exact git/BFG commands to scrub secrets from history
- Walk through Vercel import and validate the deployed frontend

Enjoy — your app is live at https://sas-notes-assignment.vercel.app/