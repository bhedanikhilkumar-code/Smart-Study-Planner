# 📚 Smart Study Planner (AI-Based)

Production-ready full-stack SaaS app for academic planning with AI assistance.

## Tech Stack
- **Frontend:** React (hooks), Tailwind CSS, Axios, Chart.js
- **Backend:** Node.js, Express REST APIs
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcrypt
- **AI:** OpenAI API with strict JSON response parsing

## Folder Structure

```
smart-study-planner/
├── client/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   └── context/
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   └── utils/
├── .env.example
└── package.json
```

## Features
- Registration/login with hashed password, JWT auth, protected + role-based routes.
- Student dashboard with daily summary, upcoming exams, pending backlogs, streak, and chart.
- Subject CRUD with weekly hour allocation and priority.
- Smart planner with study sessions and drag/drop time-blocking.
- Backlog tracker with urgency highlighting and completion toggle.
- Exam countdown and near-exam prioritization cues.
- AI assistant endpoint generating strict JSON study strategy output.
- Admin panel: system stats, user monitoring, inactive user cleanup.
- Security: Helmet, CORS, validation (zod), rate limiting, centralized error handling.
- Testing: Jest + Supertest + mongodb-memory-server for API auth flow.

## Getting Started

### 1) Install dependencies
```bash
npm install
npm install --workspace server
npm install --workspace client
```

### 2) Configure environment
Create `server/.env` from `.env.example` and set values.

### 3) Run development
```bash
npm run dev
```
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

### 4) Test
```bash
npm test
```

## Deployment Notes
- Backend: Render/Railway (set env vars and start command `npm start --workspace server`).
- Frontend: Vercel/Netlify (build `npm run build --workspace client`).
- Database: MongoDB Atlas.

