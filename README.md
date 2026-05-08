# Team Task Manager

A full-stack Team Task Manager web application built using HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB Atlas. The application allows teams to create projects, assign tasks, track progress, and manage work efficiently with role-based access control.

---

## 🚀 Live Demo

### Live Website

[https://team-task-manager-z7xh.onrender.com](https://team-task-manager-z7xh.onrender.com)

### GitHub Repository

[https://github.com/CodeExplorerV/team-task-manager](https://github.com/CodeExplorerV/team-task-manager)

---

# 📌 Features

## 🔐 Authentication

* User Signup
* User Login
* JWT-based Authentication
* Secure Password Storage

## 👥 Role-Based Access Control

* Admin Role
* Member Role
* Admin can manage projects and tasks
* Members can update assigned task status

## 📂 Project Management

* Create Projects
* View Projects
* Manage Team Projects

## ✅ Task Management

* Create Tasks
* Assign Tasks to Team Members
* Update Task Status
* Track Task Progress
* Due Date Management

## 📊 Dashboard

* View Tasks
* Track Progress
* Overdue Task Monitoring
* Status Overview

---

# 🛠️ Tech Stack

## Frontend

* HTML
* CSS
* JavaScript

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas
* MongoDB Compass

## Deployment

* Render
* GitHub

---

# 📁 Project Structure

```bash
team-task-manager/
│
├── config/
│   └── db.js
│
├── middleware/
│   └── auth.js
│
├── models/
│   ├── User.js
│   ├── Project.js
│   └── Task.js
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── routes/
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   └── taskRoutes.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/CodeExplorerV/team-task-manager.git
```

## 2️⃣ Navigate to Project Folder

```bash
cd team-task-manager
```

## 3️⃣ Install Dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=3000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
```

---

# ▶️ Run the Project

```bash
node server.js
```

Server runs on:

```bash
http://localhost:3000
```

---

# 🌐 Deployment

The application is deployed using Render.

### Deployment Platform

* Render

### Database Hosting

* MongoDB Atlas

---

# 🔗 API Routes

## Authentication Routes

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| POST   | /api/auth/signup | Register User |
| POST   | /api/auth/login  | Login User    |

## Project Routes

| Method | Endpoint      | Description    |
| ------ | ------------- | -------------- |
| GET    | /api/projects | Get Projects   |
| POST   | /api/projects | Create Project |

## Task Routes

| Method | Endpoint       | Description |
| ------ | -------------- | ----------- |
| GET    | /api/tasks     | Get Tasks   |
| POST   | /api/tasks     | Create Task |
| PUT    | /api/tasks/:id | Update Task |

---

# 🧪 Testing Flow

## User Flow

1. Signup as Admin or Member
2. Login to the Application
3. Create a Project
4. Add Tasks
5. Assign Tasks to Members
6. Update Task Status
7. Track Progress on Dashboard

---

# 🔒 Security Features

* JWT Authentication
* Password Encryption
* Protected Routes
* Role-Based Access Control

---

# 📸 Future Enhancements

* Email Notifications
* File Attachments
* Real-time Collaboration
* Task Comments
* Team Chat Integration
* Advanced Analytics Dashboard

---

# 👩‍💻 Author

**Varshini Veeramalla**

---

# 📄 License

This project is developed for educational and assignment purposes.
