# PriorityFlow - Premium Todo List SaaS Web Application

PriorityFlow is a state-of-the-art, premium Todo List SaaS Web Application built on a modern MERN stack. Designed with rich aesthetics, smooth animations, and productivity features (including a fully custom Pomodoro Focus Timer and interactive Calendar scheduling), PriorityFlow offers a premium user experience akin to Notion, Linear, and Trello.

---

## 🚀 Key Features

*   **Premium Interactive Dashboard**: Dynamic stats summary charts, custom progress completion rings, fire streaks tracking, and recent logs tracker.
*   **Kanban Boards & Lists Board**: Toggle between clean listing rows or status columns Kanban board with drag-and-drop support.
*   **Structured Pomodoro Timer**: Switch between 25-minute focus intervals and 5/15-minute breaks with custom Web Audio tick sound synthesis and system notifications.
*   **Interactive Calendar View**: View and schedule todos on due dates with custom priority color indicators (High/Medium/Low) and detail update overlays.
*   **Dynamic Theme Toggle**: Complete light/dark theme toggle system persisting to `localStorage` and detecting browser media defaults.
*   **Robust Offline Mode**: Mirrors all todos and calculations to `localStorage` to fall back on database/connection failures.
*   **JWT Security Authentication**: Form-validated signup and login with cryptographically hashed passwords and Bearer interceptors.

---

## 🛠️ Tech Stack

*   **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB, Mongoose Schema
*   **Drag & Drop**: `@hello-pangea/dnd`
*   **Charts**: `Recharts`
*   **Icons**: `Lucide React`
*   **Forms**: `React Hook Form` + `Zod` validation
*   **Calendar**: `React Big Calendar` + `Date-Fns`
*   **Notifications**: `React Hot Toast`

---

## 📁 Folder Structure

```
todo-saas/
├── client/                          # React Frontend
│   ├── public/
│   └── src/
│       ├── components/              # Reusable UI & Layout Components
│       ├── context/                 # Context API Providers
│       ├── hooks/                   # Custom Hooks
│       ├── pages/                   # Route Shell Pages
│       ├── services/                # Axios API Endpoints Integration
│       └── utils/                   # Constants, Form Validators, Helpers
│
└── server/                          # Node.js Express Backend
    ├── config/                      # Database Connections Setup
    ├── controllers/                 # Express Request Handlers
    ├── middleware/                  # JWT security and Input validators
    ├── models/                      # User & Todo Schemas definitions
    └── routes/                      # API routing paths
```

---

## 🔧 Setup & Installation

### Step 1 — Clone the Project
```bash
git clone <repo-url>
cd todo-saas
```

### Step 2 — Backend setup
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` root:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/todo-saas
   JWT_SECRET=your_super_secret_key
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   ```
4. Boot up the server:
   ```bash
   npm run dev
   ```
   *The server starts on http://localhost:5000*

### Step 3 — Frontend setup
1. Open a new terminal and navigate to the client folder:
   ```bash
   cd ../client
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `client` root:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend developer server:
   ```bash
   npm run dev
   ```
   *The web app opens on http://localhost:5173*

### Step 4 — MongoDB setup
*   **Option A (Local)**: Install MongoDB Community Server, start the service locally, and connect via `mongodb://localhost:27017/todo-saas`.
*   **Option B (Cloud)**: Setup a free database cluster on MongoDB Atlas, copy the connection string, and paste it into the `MONGODB_URI` field of the backend `.env`.

---

## 🔌 API Documentation

### Auth Routes — `/api/auth`
*   `POST /register` - Registers a new user account.
*   `POST /login` - Signs in and returns user details and a JWT.
*   `GET /me` - Fetches authenticated user profile (protected).
*   `POST /logout` - Clears authentication context (protected).

### Todo Routes — `/api/todos` (All Protected)
*   `GET /` - Fetches all user tasks (supports search, category, priority, and sorting filters).
*   `POST /` - Creates a new task.
*   `GET /:id` - Fetches a single task.
*   `PUT /:id` - Updates details of a task.
*   `DELETE /:id` - Removes a task.
*   `PATCH /:id/toggle` - Toggles the completion status of a task.
*   `PATCH /reorder` - Updates the order indices of tasks.
*   `GET /stats` - Aggregates stats counts, productivity bar graphs, and heatmap charts.

---

## ☁️ Deployment Guide

### Backend (Railway / Render)
1. Push the `server` folder to a GitHub repository.
2. Select the repository in Railway/Render dashboard.
3. Configure environment variables (`MONGODB_URI`, `JWT_SECRET`, `NODE_ENV`).
4. Trigger deploy (detects Node environment automatically).

### Frontend (Vercel)
1. Push the `client` folder to a GitHub repository.
2. Link the repository to your Vercel workspace.
3. Set the build configuration input variables: `VITE_API_URL` pointing to your deployed backend.
4. Deploy (detects Vite React project automatically).

### Database (MongoDB Atlas)
1. Register for a free account at `mongodb.com/cloud/atlas` and spin up a cluster.
2. Add network access rule whitelisting IP Address `0.0.0.0/0`.
3. Add a DB user, copy the connection URI string, and use it in your production env configurations.
