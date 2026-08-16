# Harikrishnan R — Portfolio

A production-ready, cinematic editorial portfolio for **Harikrishnan R**, DevOps Engineer focused on cloud infrastructure, CI/CD, containerization, and AI-powered development.

The site is a black-and-white editorial interface with a single restrained red accent. It is fully responsive, accessible, SEO-aware, and animation-driven.

## 1. Project Overview

Two applications:

- **`frontend/`** — React 18 + TypeScript + Vite + Tailwind CSS single-page portfolio.
- **`backend/`** — Node.js + Express + TypeScript REST API providing structured portfolio data and contact form handling.

```
React + Vite (Frontend)
      ↓ HTTP (fetch)
Node.js + Express (REST API Backend)
```

### What's verified / what's a placeholder

- All personal info, education, certifications, skills, and project copy are preserved exactly.
- Project live/repository URLs that were not supplied remain as `[ADD LIVE PROJECT URL]` / `[ADD GITHUB REPOSITORY URL]` text (never fabricated).
- Missing project imagery is rendered as styled, theme-consistent placeholders — no broken image elements.
- The Achievements section shows a `[ADD AWARDS / HACKATHONS / COMPETITIONS / PUBLICATIONS / RECOGNITIONS]` placeholder until real content exists.

## 2. Technology Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, GSAP + ScrollTrigger, Lenis, Lucide React.

**Backend:** Node.js, Express.js, TypeScript, express-validator, helmet, cors.

## 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173.

`frontend/.env.example` → copy to `frontend/.env`:

```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SITE_URL=https://yourdomain.com
```

## 4. Backend Setup

```bash
cd backend
npm install
npm run dev
```

The API listens on http://localhost:5000.

`backend/.env.example` → copy to `backend/.env`:

```
PORT=5000
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

## 5. Environment Variables

| Variable | Where | Purpose |
| --- | --- | --- |
| `VITE_API_BASE_URL` | frontend/.env | Base URL of the backend API |
| `VITE_SITE_URL` | frontend/.env | Canonical/OG domain placeholder |
| `PORT` | backend/.env | Backend port (default 5000) |
| `ALLOWED_ORIGINS` | backend/.env | CORS allow-list (comma separated) |
| `NODE_ENV` | backend | `production` hides error detail |

Never commit real `.env` files — they are git-ignored.

## 6. API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Health check |
| `GET` | `/api/projects` | All projects, ordered |
| `GET` | `/api/projects/:slug` | Single project by slug |
| `GET` | `/api/skills` | Skill categories |
| `GET` | `/api/certifications` | Certifications |
| `GET` | `/api/achievements` | Achievements |
| `POST` | `/api/contact` | Store/receive a contact message |

Responses are wrapped as `{ data: [...], source: 'seed' }`.

`POST /api/contact` body: `{ name, email, subject, message }`. Inputs are validated and sanitized; a `400` is returned with field errors on failure.

## 7. Development Commands

Frontend:

```bash
cd frontend
npm install
npm run dev      # Vite dev server on :5173
```

Backend:

```bash
cd backend
npm install
npm run dev      # tsx watch on :5000
```

Run both together (two terminals) for local development.

## 8. Production Build

Frontend:

```bash
cd frontend
npm run build    # tsc + vite build → frontend/dist
npm run start    # vite preview (or serve dist/ with any static host)
```

Backend:

```bash
cd backend
npm run build    # tsc → backend/dist
npm run start    # node dist/server.js
```

## 9. GitHub Pages Deployment

The repository includes a ready-to-use GitHub Actions workflow in [`.github/workflows/deploy.yml`](file:///.github/workflows/deploy.yml).

### Steps to Deploy:
1. **Push your repository to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: cinematic portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. **Enable GitHub Pages**:
   - Go to your repository on GitHub: **Settings → Pages**.
   - Under **Build and deployment → Source**, select **GitHub Actions**.
3. **Automatic Deployment**:
   - Every push to the `main` branch will automatically build the frontend and deploy it to `https://<your-username>.github.io/<your-repo-name>/`.

## 10. How to Update Portfolio Content

- **Contact/About copy:** `frontend/src/data/seed.ts` (`personal`, `focusAreas`).
- **Projects:** `seedProjects` in `frontend/src/data/seed.ts` and `backend/src/data/seed.ts`.
- **Skills:** `seedSkills` in both `frontend/src/data/seed.ts` and `backend/src/data/seed.ts`.
- **Certifications / Education / Experience:** the corresponding `seed*` exports.
- **Achievements:** add to `seedAchievements`; the placeholder disappears automatically.
- **SEO/meta:** `frontend/index.html`.
- **Colors/typography:** `frontend/tailwind.config.js` and `frontend/src/index.css`.
