# ShopSaathi (Frontend)

Hyperlocal job-matching platform for small Indian businesses. Shop owners post jobs, nearby workers browse and apply, owners shortlist or hire and contact workers on WhatsApp.

- **Live site:** https://shopsaathi-e778c.web.app
- **Backend repo:** https://github.com/yashveerniat/shopsaathi-backend
- **Backend API:** https://TUMHARA-RENDER-URL.onrender.com

## Architecture

```
React (Vite)  ->  Express REST API (Render)  ->  MongoDB Atlas
   Firebase Hosting      JWT auth, bcrypt
```

## Tech Stack

- **Frontend:** React, Vite, React Router, Context API
- **Backend:** Node.js, Express, Mongoose, JWT, bcryptjs
- **Database:** MongoDB Atlas
- **Hosting:** Firebase Hosting (frontend), Render (backend)

## Features

- Role-based accounts (owner / worker) with JWT login
- Protected routes by role
- Post jobs, browse and search jobs, apply once per job
- Owner dashboard with applications; shortlist, hire or reject
- Worker dashboard with application status tracking
- WhatsApp contact link for each applicant

## Run locally

```bash
npm install
npm run dev
```

Create `.env.local` if you want to use a local backend:

```
VITE_API_URL=http://localhost:5000/api
```