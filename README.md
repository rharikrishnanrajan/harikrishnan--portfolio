# Harikrishnan R — DevOps & Cloud Infrastructure Portfolio

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?style=flat&logo=github-actions&logoColor=white)](https://github.com/features/actions)

A production-ready, cinematic editorial portfolio for **Harikrishnan R**, DevOps & Cloud Infrastructure Engineer specializing in AWS, Docker, CI/CD pipelines, containerization, and automation.

Designed with a sleek black-and-white editorial aesthetic with a single restrained red accent, featuring smooth scroll interactions, dark/light theme toggle, responsive design, and direct email dispatch.

---

## 🌟 Key Features

- **Cinematic Editorial Design:** Modern monochrome design system with custom typography (Inter + JetBrains Mono) and subtle micro-interactions.
- **Dark & Light Mode:** Seamless theme switching with system preference detection and localStorage persistence.
- **Smooth Inertia Scrolling:** Integrated with Lenis and GSAP ScrollTrigger for buttery-smooth animations.
- **Direct Mailto Contact Form:** Allows recruiters and collaborators to reach out directly through pre-filled email messages without requiring a separate backend service.
- **Automated GitHub Pages Deployment:** Pre-configured GitHub Actions CI/CD workflow for automated building and deployment.
- **Fully Accessible & SEO-Optimized:** Semantic HTML5, ARIA labels, Open Graph metadata, Twitter Cards, and canonical tags.
- **Zero-Dependency Static Mode:** Standalone frontend with built-in structured data (`seed.ts`), plus an optional Express REST API.

---

## 🏗️ Project Architecture

```
harikrishnan--portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── frontend/                   # React + TypeScript + Vite single-page app
│   ├── public/                 # Static assets (favicons, manifests, icons)
│   ├── src/
│   │   ├── components/         # Modular UI components (Hero, Projects, Skills, Contact, etc.)
│   │   ├── context/            # Global state (ThemeContext for Dark/Light mode)
│   │   ├── data/               # Seed data for projects, skills, education, experience
│   │   ├── hooks/              # Custom hooks (useLenis, useReveal, useReducedMotion)
│   │   ├── lib/                # GSAP animation utilities
│   │   ├── services/           # API fetch helpers with fallback handling
│   │   ├── types/              # TypeScript interface definitions
│   │   ├── App.tsx             # Main application orchestrator
│   │   ├── index.css           # Tailwind custom utilities & design system tokens
│   │   └── main.tsx            # Application entry point
│   ├── index.html              # HTML entry with SEO & Open Graph meta tags
│   ├── tailwind.config.js      # Tailored Tailwind color palette & font config
│   ├── tsconfig.json           # TypeScript configuration
│   └── vite.config.ts          # Vite build config with base './' for GitHub Pages
├── backend/                    # Optional Node.js + Express REST API
│   ├── src/
│   │   ├── config/             # Logger configuration
│   │   ├── controllers/        # Route controllers
│   │   ├── data/               # Backend seed data
│   │   ├── middleware/         # Validation & error handlers
│   │   ├── routes/             # REST endpoints (/projects, /skills, /contact)
│   │   └── server.ts           # Express server entry point
│   ├── package.json
│   └── tsconfig.json
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### 1. Run the Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

The portfolio will be live at `http://localhost:5173`.

### 2. (Optional) Run the Backend API

```bash
cd backend
npm install
npm run dev
```

The REST API will listen on `http://localhost:5000`.

---

## 🌐 Deploy to GitHub Pages

This repository includes a ready-to-run GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### Step 1: Push Code to GitHub
Run the following commands in your project root:

```bash
git init
git add .
git commit -m "feat: initial portfolio release"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git
git push -u origin main
```

### Step 2: Configure GitHub Pages
1. Go to your repository on **GitHub**.
2. Click **Settings** (top navigation) → **Pages** (left sidebar).
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.

### Step 3: View Live Site
GitHub Actions will automatically build and publish your portfolio to:
```
https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/
```

---

## 🛠️ Build Commands

### Frontend
| Command | Description |
| --- | --- |
| `npm run dev` | Starts Vite development server at `localhost:5173` |
| `npm run build` | Type-checks and compiles production bundle to `frontend/dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run typecheck` | Validates TypeScript types with `tsc --noEmit` |

### Backend (Optional)
| Command | Description |
| --- | --- |
| `npm run dev` | Runs the API server with auto-reload using `tsx watch` |
| `npm run build` | Compiles TypeScript into `backend/dist/` |
| `npm run start` | Runs the compiled production server |

---

## ✏️ Customizing Your Content

All content can be easily updated in [`frontend/src/data/seed.ts`](frontend/src/data/seed.ts):

| Section | Location in `seed.ts` |
| --- | --- |
| **Personal Info & Bio** | `personal` (name, role, email, phone, location, links) |
| **Focus Areas** | `focusAreas` (cloud architecture, automation, etc.) |
| **Projects** | `seedProjects` (slug, title, description, technologies, URLs) |
| **Skills & Tools** | `seedSkills` (categories: Cloud, CI/CD, Containerization, etc.) |
| **Certifications** | `seedCertifications` (AWS, Docker, Linux, etc.) |
| **Education** | `seedEducation` (degree, institution, dates) |
| **Experience / History** | `seedExperience` (roles, responsibilities, tags) |

---

## 📬 Contact Form Configuration

The contact form in the **Connect** section operates directly using the `mailto:` protocol:
- Users enter their Name, Email, Subject, and Message.
- Clicking **Send Message** opens their system's default email client pre-populated with:
  - **To:** `rharikrishnanrajan@gmail.com`
  - **Subject:** User's subject line
  - **Body:** User's name, email, and formatted message body
- A direct fallback email button is also provided for instant access.

---

## 🔒 Copyright & Ownership

© Harikrishnan R. All rights reserved. Personal portfolio and project showcase.
