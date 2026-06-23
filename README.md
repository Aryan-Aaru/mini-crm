# Mini CRM Opportunity Tracker

A secure full-stack MERN web application to manage a shared CRM-style sales opportunity pipeline.

## Live Demo
- **Frontend:** https://mini-crm-sigma-swart.vercel.app
- **Backend:** https://mini-crm-backend-yaen.onrender.com

## Tech Stack
- **Frontend:** React.js (Vite), Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **Authentication:** JWT + bcrypt

## Features
- Secure user registration and login with JWT
- Password hashing using bcrypt
- Create, view, update, delete opportunities
- Ownership-based authorization (only creator can edit/delete)
- Shared pipeline — all users can view all opportunities
- Filter by stage and priority
- Search by company name or requirement
- Dashboard summary cards (pipeline value, won value, high priority)
- Fully responsive UI

## Project Structure
mini-crm/

├── backend/

│   ├── src/

│   │   ├── config/        # Database connection

│   │   ├── controllers/   # Business logic

│   │   ├── middleware/    # JWT auth & error handling

│   │   ├── models/        # MongoDB schemas

│   │   ├── routes/        # API routes

│   │   └── server.js      # Entry point

│   ├── .env.example

│   └── package.json

├── frontend/

│   ├── src/

│   │   ├── components/    # Navbar, OpportunityCard

│   │   ├── context/       # Auth context

│   │   ├── pages/         # Login, Register, Dashboard, OpportunityForm

│   │   ├── services/      # API calls

│   │   └── App.jsx        # Routes

│   ├── .env.example

│   └── package.json

└── README.md

## Backend Setup

### Prerequisites
- Node.js installed
- MongoDB Atlas account

### Steps
1. Clone the repository
git clone https://github.com/Aryan-Aaru/mini-crm.git

cd mini-crm/backend

2. Install dependencies
npm install

3. Create `.env` file
PORT=5000

MONGO_URI=your_mongodb_atlas_url

JWT_SECRET=your_jwt_secret

JWT_EXPIRE=2h

NODE_ENV=development

FRONTEND_URL=http://localhost:5173

4. Run the server
npm run dev

## Frontend Setup

### Steps
1. Navigate to frontend folder
cd mini-crm/frontend

2. Install dependencies
npm install

3. Create `.env` file
VITE_API_URL=http://localhost:5000/api

4. Run the app
npm run dev

5. Open browser at `http://localhost:5173`

## Environment Variables

### Backend
| Variable | Description |
|---|---|
| `PORT` | Server port (default 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `JWT_EXPIRE` | Token expiry time (2h) |
| `NODE_ENV` | Environment (development/production) |
| `FRONTEND_URL` | Frontend URL for CORS |

### Frontend
| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

## API Endpoints

### Authentication
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login and get token |
| GET | `/api/auth/me` | Private | Get current user |

### Opportunities
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/opportunities` | Private | Get all opportunities |
| POST | `/api/opportunities` | Private | Create opportunity |
| GET | `/api/opportunities/:id` | Private | Get single opportunity |
| PUT | `/api/opportunities/:id` | Owner only | Update opportunity |
| DELETE | `/api/opportunities/:id` | Owner only | Delete opportunity |

## Deployment

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Set Root Directory to `backend`
4. Set Start Command to `node src/server.js`
5. Add environment variables

### Frontend (Vercel)
1. Import GitHub repository on Vercel
2. Set Root Directory to `frontend`
3. Add `VITE_API_URL` environment variable
4. Deploy

## Security
- Passwords hashed with bcrypt
- JWT stored in localStorage with 2h expiry
- Ownership validation on backend for update/delete
- Environment variables for all secrets
- CORS restricted to allowed origins

## Known Limitations
- No pagination (all opportunities load at once)
- No email verification on registration
- Free tier backend on Render sleeps after inactivity (may take 30s to wake up)
- No password reset functionality

## Test Credentials
You can register a new account or use:
- **Email:** test@test.com
- **Password:** 123456