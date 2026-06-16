<div align="center">

# 🎫 TicketHub
### AI-Powered Support Ticket Management System

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask"/>
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite"/>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square" alt="Status"/>
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License"/>
  <img src="https://img.shields.io/badge/PRs-Welcome-orange?style=flat-square" alt="PRs Welcome"/>
  <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=flat-square&logo=shadcnui&logoColor=white" alt="shadcn/ui"/>
</p>

<p align="center">
  A full-stack enterprise-grade support ticket management platform with role-based access control, intelligent ticket routing, and an integrated AI support assistant — built to streamline customer service workflows at scale.
</p>

[🔗 Live Demo](#) · [📖 API Docs](#-api-documentation) · [🐛 Report Bug](https://github.com/Alikanagreeshma/TicketHub-AI-Powered-Support-Ticket-Management-System/issues) · [✨ Request Feature](https://github.com/Alikanagreeshma/TicketHub-AI-Powered-Support-Ticket-Management-System/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Smart Automation](#-smart-automation)
- [Challenges & Solutions](#-challenges--solutions)
- [Learning Outcomes](#-learning-outcomes)
- [Future Enhancements](#-future-enhancements)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**TicketHub** is a production-ready support ticket management system that bridges the gap between users and support teams through a clean, intuitive interface backed by a robust REST API. The platform features intelligent automation — including automatic priority assignment and category-based admin routing — alongside an AI-powered chatbot that handles common queries instantly, reducing ticket volume and resolution time.

> Built as a full-stack portfolio project demonstrating end-to-end software engineering skills across frontend, backend, database design, API development, and AI integration.

### Why TicketHub?

| Problem | TicketHub Solution |
|---|---|
| High ticket volume overwhelms support teams | AI chatbot resolves FAQs instantly without creating tickets |
| Tickets get lost or unassigned | Automatic assignment routes tickets to the right admin |
| Manual priority setting is inconsistent | Smart priority engine assigns urgency automatically |
| No visibility into support metrics | Real-time admin dashboard with analytics |
| Context-switching between tools | Unified platform for users, admins, and AI in one place |

---

## ✨ Features

### 👤 User Portal

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Secure registration and login with session management |
| 🎫 **Ticket Creation** | Submit detailed support requests with category and priority |
| 📋 **Ticket Dashboard** | View personal ticket history with status tracking |
| 🔍 **Search** | Full-text search across ticket title and description |
| 🏷️ **Filter & Sort** | Filter by status (Open, In Progress, Resolved) and priority (Low, Medium, High) |
| 📊 **Status Tracking** | Real-time updates on ticket progress and admin responses |

### 🛠️ Admin Panel

| Feature | Description |
|---|---|
| 🔐 **Admin Auth** | Dedicated admin login with elevated access control |
| 📥 **All Tickets View** | Unified view of every ticket across the platform |
| 👥 **Ticket Assignment** | Manually assign or reassign tickets to specific admins |
| ✏️ **Status Management** | Update ticket status and resolution notes |
| 👤 **User Management** | View all registered users and their ticket history |
| 📈 **Analytics Dashboard** | Key metrics: ticket volume, resolution rate, category breakdown |

### 🤖 AI Assistant

| Feature | Description |
|---|---|
| 💬 **FAQ Chatbot** | Instant answers to common support questions |
| ⚡ **Instant Responses** | Sub-second response time for known query patterns |
| 🔁 **Ticket Escalation** | Seamlessly escalates unresolved queries to a human ticket |
| 🔄 **Automated Workflow** | Guides users through self-service resolution before ticket creation |

### ⚙️ Smart Automation

- 🎯 **Auto Priority Assignment** — Keyword analysis determines ticket urgency on creation
- 🗂️ **Category-Based Routing** — Incoming tickets are automatically assigned to the most relevant admin based on their specialization
- 📬 **Workflow Triggers** — Status changes trigger downstream notifications and assignments

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                         │
│         Next.js 14 · TypeScript · Tailwind CSS              │
│                    shadcn/ui Components                      │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP / REST API
┌───────────────────────────▼─────────────────────────────────┐
│                        API LAYER                            │
│              Flask · Flask-CORS · Flask-SQLAlchemy           │
│     ┌──────────────┬──────────────┬──────────────────┐      │
│     │  Auth Routes │Ticket Routes │   Chat Routes    │      │
│     │  auth.py     │ tickets.py   │   chat.py        │      │
│     └──────────────┴──────────────┴──────────────────┘      │
└───────────────────────────┬─────────────────────────────────┘
                            │ SQLAlchemy ORM
┌───────────────────────────▼─────────────────────────────────┐
│                      DATA LAYER                             │
│                   SQLite · models.py                        │
│         Users · Tickets · Admins · Messages                 │
└─────────────────────────────────────────────────────────────┘
```

### Design Decisions

- **Decoupled Frontend/Backend** — Next.js frontend communicates with Flask via REST API, enabling independent scaling and deployment.
- **SQLAlchemy ORM** — Abstracts database operations for clean, maintainable model definitions with easy migration to PostgreSQL in production.
- **Role-Based Access Control (RBAC)** — User and admin roles enforced at the API layer, protecting sensitive endpoints from unauthorized access.
- **Stateless API** — Session tokens allow the backend to remain stateless, supporting horizontal scaling.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 14** | React framework with App Router for server-side rendering and routing |
| **TypeScript** | Static typing for safer, more maintainable code |
| **Tailwind CSS** | Utility-first CSS for rapid, responsive UI development |
| **shadcn/ui** | Accessible, composable component library built on Radix UI |

### Backend
| Technology | Purpose |
|---|---|
| **Flask** | Lightweight Python web framework for building the REST API |
| **SQLAlchemy** | Python ORM for database modeling and querying |
| **Flask-CORS** | Cross-Origin Resource Sharing for frontend-backend communication |

### Database & Infrastructure
| Technology | Purpose |
|---|---|
| **SQLite** | Embedded relational database for development and prototyping |
| **Python 3.10+** | Backend runtime |

---

## 📸 Screenshots

> **Note:** Replace the placeholders below with actual screenshots from your deployed application.

### User Portal
| Ticket Dashboard | Create Ticket | Ticket Detail |
|---|---|---|
| ![Dashboard](./public/screenshots/user-dashboard.png) | ![Create](./public/screenshots/create-ticket.png) | ![Detail](./public/screenshots/ticket-detail.png) |

### Admin Panel
| Admin Overview | Ticket Assignment | Analytics |
|---|---|---|
| ![Admin](./public/screenshots/admin-overview.png) | ![Assign](./public/screenshots/ticket-assign.png) | ![Analytics](./public/screenshots/analytics.png) |

### AI Chatbot
| Chat Interface | Escalation Flow |
|---|---|
| ![Chat](./public/screenshots/chat-ui.png) | ![Escalation](./public/screenshots/escalation.png) |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** v18.0+ and **npm** v9.0+
- **Python** 3.10+
- **pip** (Python package manager)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/Alikanagreeshma/TicketHub-AI-Powered-Support-Ticket-Management-System.git
cd TicketHub-AI-Powered-Support-Ticket-Management-System
```

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv

# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Initialize the database
python app.py  # SQLite DB is created automatically on first run
```

The Flask server will start at `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to the project root (new terminal)
cd ..

# Install Node dependencies
npm install

# Create a local environment file
cp .env.example .env.local
```

Update `.env.local` with your configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

```bash
# Start the development server
npm run dev
```

The Next.js app will be available at `http://localhost:3000`

### 4. Access the Application

| Role | URL | Default Credentials |
|---|---|---|
| **User** | `http://localhost:3000` | Register a new account |
| **Admin** | `http://localhost:3000/admin` | Set up via backend seed script |

---

## 📡 API Documentation

**Base URL:** `http://localhost:5000`

All endpoints return JSON. Protected endpoints require a valid session token in the request headers.

### Authentication

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/register` | Register a new user account | ❌ |
| `POST` | `/login` | Authenticate user and return token | ❌ |

#### POST `/register`
```json
// Request Body
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword"
}

// Response 201
{
  "message": "User registered successfully",
  "user_id": 1
}
```

#### POST `/login`
```json
// Request Body
{
  "email": "john@example.com",
  "password": "securepassword"
}

// Response 200
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "role": "user"
}
```

### Users

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/users` | Retrieve all registered users | ✅ Admin |

### Tickets

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/tickets` | Retrieve all tickets (admin) or user's tickets | ✅ |
| `POST` | `/tickets` | Create a new support ticket | ✅ |
| `PUT` | `/tickets/:id` | Update ticket status or assignment | ✅ Admin |

#### POST `/tickets`
```json
// Request Body
{
  "title": "Cannot access my account",
  "description": "I've been locked out since yesterday...",
  "category": "Account",
  "priority": "High"
}

// Response 201
{
  "message": "Ticket created successfully",
  "ticket_id": 42,
  "assigned_to": "admin_accounts",
  "priority": "High"
}
```

#### PUT `/tickets/:id`
```json
// Request Body
{
  "status": "In Progress",
  "assigned_to": 3,
  "resolution_notes": "Looking into the account lock issue."
}

// Response 200
{
  "message": "Ticket updated successfully",
  "ticket": { "id": 42, "status": "In Progress" }
}
```

### Error Responses

All errors follow a consistent format:

```json
{
  "error": "Unauthorized",
  "message": "You do not have permission to perform this action.",
  "status": 403
}
```

| Status Code | Meaning |
|---|---|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request — missing or invalid fields |
| `401` | Unauthorized — invalid or missing token |
| `403` | Forbidden — insufficient role permissions |
| `404` | Not Found |
| `500` | Internal Server Error |

---

## 📁 Project Structure

```
TicketHub/
├── app/                          # Next.js App Router (frontend)
│   ├── admin/                    # Admin-only routes
│   │   ├── assigned/             # Admin's assigned tickets view
│   │   ├── settings/             # Admin settings page
│   │   ├── tickets/              # All tickets management
│   │   └── users/                # User management panel
│   ├── chat/                     # AI chatbot interface
│   ├── dashboard/                # User ticket dashboard
│   ├── register/                 # User registration page
│   ├── tickets/                  # Ticket creation & detail pages
│   ├── layout.tsx                # Root layout with providers
│   └── page.tsx                  # Landing / login page
│
├── backend/                      # Flask REST API
│   ├── routes/
│   │   ├── auth.py               # Registration & login endpoints
│   │   ├── tickets.py            # CRUD ticket operations
│   │   └── chat.py               # AI chatbot logic & responses
│   ├── app.py                    # Flask app factory & config
│   ├── models.py                 # SQLAlchemy database models
│   ├── requirements.txt          # Python dependencies
│   └── instance/                 # SQLite database (auto-generated)
│       └── tickethub.db
│
├── components/                   # Reusable React components
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions & API client
├── public/                       # Static assets & screenshots
│   └── screenshots/
├── styles/                       # Global styles
├── .env.example                  # Environment variable template
├── package.json                  # Node.js dependencies
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md
```

---

## ⚙️ Smart Automation

### Auto Priority Assignment

On ticket creation, the system analyzes the title and description using keyword matching to assign an initial priority level:

```
HIGH    → Keywords: "urgent", "critical", "outage", "cannot access", "broken"
MEDIUM  → Keywords: "issue", "problem", "not working", "slow", "error"
LOW     → All other tickets — general inquiries and feature requests
```

### Category-Based Admin Routing

Tickets are automatically routed to the most relevant admin based on their category:

| Category | Assigned Admin Pool |
|---|---|
| Account / Billing | Accounts & Billing Team |
| Technical / Bug | Engineering Support Team |
| General Inquiry | General Support Team |
| Feature Request | Product Team |

---

## 🧩 Challenges & Solutions

| Challenge | Approach |
|---|---|
| **CORS between Next.js and Flask** | Configured `Flask-CORS` with specific allowed origins and methods to enable secure cross-origin communication during development |
| **RBAC without a dedicated auth library** | Implemented a custom decorator pattern in Flask to validate roles on protected routes, keeping the logic centralized and reusable |
| **Dynamic ticket routing logic** | Designed a category-to-admin mapping structure in the backend that can be extended without modifying core ticket creation logic |
| **Consistent UI across roles** | Used shared shadcn/ui components with role-aware rendering logic to avoid code duplication between user and admin views |
| **Real-time status updates** | Managed optimistic UI updates on the frontend to reflect ticket status changes immediately without full page reloads |

---

## 📚 Learning Outcomes

Working on TicketHub deepened my understanding across the full software engineering stack:

- **Full-Stack Architecture** — Designed and implemented the complete request lifecycle from UI interaction to database persistence
- **REST API Design** — Built clean, versioned endpoints with consistent error handling and response schemas
- **Database Modeling** — Designed relational schemas with SQLAlchemy ORM and understood the trade-offs between relational models and document stores
- **TypeScript in Production** — Leveraged TypeScript interfaces and type guards to eliminate runtime type errors in a complex data-driven UI
- **Authentication & Authorization** — Implemented session-based auth with role enforcement, understanding the security considerations at each layer
- **AI Integration** — Integrated an AI assistant into a user-facing workflow, learning how to design graceful escalation paths when automation falls short
- **Component-Driven UI** — Built a scalable component library using shadcn/ui, understanding the value of accessible, composable design systems

---

## 🔮 Future Enhancements

| Priority | Feature | Description |
|---|---|---|
| 🔴 High | **Email Notifications** | Notify users on ticket status changes via transactional email (SendGrid / Resend) |
| 🔴 High | **PostgreSQL Migration** | Replace SQLite with PostgreSQL for production-grade reliability and concurrency |
| 🟡 Medium | **Real-Time Updates** | Integrate WebSockets (Socket.IO) for live ticket status updates |
| 🟡 Medium | **File Attachments** | Allow users to attach screenshots and documents to tickets |
| 🟡 Medium | **Advanced AI Model** | Upgrade chatbot from FAQ matching to an LLM-powered assistant (GPT-4 / Claude) |
| 🟢 Low | **SLA Timers** | Auto-escalate tickets that exceed response time thresholds |
| 🟢 Low | **Audit Logs** | Track all admin actions for compliance and accountability |
| 🟢 Low | **Multi-Tenant Support** | Enable isolated workspaces for different organizations |
| 🟢 Low | **Mobile App** | React Native companion app for on-the-go ticket management |

---

## ☁️ Deployment

### Frontend (Vercel) — Recommended

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Set the following environment variable in the Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Backend (Render / Railway)

1. Push the `backend/` directory to a separate repository or use a monorepo setup.
2. Set the start command to: `gunicorn app:app`
3. Add a `Procfile`:
   ```
   web: gunicorn app:app
   ```
4. **For production**, migrate from SQLite to PostgreSQL by updating the SQLAlchemy `DATABASE_URL`.

### Docker (Optional)

```dockerfile
# Backend Dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5000"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:5000

  backend:
    build: ./backend
    ports:
      - "5000:5000"
```

---

## 🤝 Contributing

Contributions are welcome and appreciated! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes with a clear message:
   ```bash
   git commit -m "feat: add email notification on ticket update"
   ```
4. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open** a Pull Request with a clear description of the changes

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Usage |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation changes |
| `style:` | Code formatting (no logic changes) |
| `refactor:` | Code restructuring |
| `test:` | Adding or updating tests |

### Code Standards

- Run `npm run lint` before submitting frontend PRs
- Follow PEP 8 for Python backend code
- Write descriptive variable and function names
- Add comments for non-obvious logic

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for full details.

```
MIT License

Copyright (c) 2024 Alikana Greeshma

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👩‍💻 Author

<div align="center">

**Alikana Greeshma**

*Computer Science & Engineering Student — CBIT, Osmania University*

[![GitHub](https://img.shields.io/badge/GitHub-Alikanagreeshma-181717?style=for-the-badge&logo=github)](https://github.com/Alikanagreeshma)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/your-linkedin)

</div>

---

<div align="center">

⭐ **If you found this project useful, give it a star!** ⭐

*Built with ❤️ as a portfolio project demonstrating full-stack software engineering*

</div>
