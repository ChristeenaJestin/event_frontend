# 🎉 EventHub - Frontend

A modern Event Management System frontend built with **React.js** that enables students to discover, register for, and manage campus events while providing organizers with powerful event creation and management tools.

---

## 🌐 Live Demo

Frontend: https://your-vercel-url.vercel.app

Backend API:
http://your-aws-ip:5000

---

# 📌 Features

### 👨‍🎓 Student

- User Registration & Login
- JWT Authentication
- Browse all events
- Search events
- Filter events by category
- View complete event details
- Register for events
- View registered events
- Responsive dashboard
- Profile management

---

### 👨‍💼 Organizer

- Create events
- Upload event banners
- Edit event details
- Cancel events
- View participants
- Dashboard with statistics

---

### 👨‍💻 Admin

- Manage events
- Manage users
- View registrations
- Access organizer features

---

# 🖥 Tech Stack

- React.js
- React Router DOM
- Axios
- CSS
- Vite

---

# 📂 Project Structure

```
src/
│
├── api/
├── assets/
├── components/
│   ├── common/
│   ├── events/
│   └── layout/
│
├── hooks/
├── pages/
├── services/
├── utils/
│
├── App.jsx
└── main.jsx
```

---

# ⚙ Installation

Clone the repository

```bash
git clone <frontend-repository-url>
```

Move into project

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Create a `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Run

```bash
npm run dev
```

Production Build

```bash
npm run build
```

Preview

```bash
npm run preview
```

---

# 🔑 Environment Variables

```
VITE_API_URL=
```

Example

```
VITE_API_URL=http://localhost:5000/api
```

---

# 📸 Screens

- Login
- Dashboard
- Explore Events
- Event Details
- Create Event
- Edit Event
- Profile
- Participants

---

# 🔒 Authentication

Authentication uses JWT tokens.

After login,

- token stored in Local Storage
- Axios automatically attaches Authorization header

```
Authorization: Bearer <token>
```

---

# 🚀 Deployment

Frontend deployed using

- **Vercel**

Backend hosted on AWS EC2.

---

# 👩‍💻 Developed By

**Christeena Jestin**

CUSAT
