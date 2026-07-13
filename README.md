# Campus Placement Portal

A full-stack web application developed to help students find job opportunities and apply for placements. The system allows students to search jobs, apply for opportunities, and track application status. Admins can manage job postings and student applications.

## 🚀 Features

## Student Features

- User Registration and Login
- JWT based Authentication
- Student Dashboard
- View Available Jobs
- Search Jobs by title, company, and location
- Apply for Jobs
- Automatic Applied Job Detection
- View My Applications
- Track Application Status
  - Pending
  - Selected
  - Rejected


## Admin Features

- Admin Dashboard
- Add New Jobs
- Update Job Details
- Delete Jobs
- Manage Job Applications
- View Student Applications
- Update Application Status


## 🛠️ Technologies Used

### Frontend

- React.js
- TypeScript
- JavaScript
- HTML5
- CSS3
- Bootstrap
- Axios


### Backend

- Node.js
- Express.js
- JavaScript
- REST API


### Database

- MongoDB


### Authentication

- JWT (JSON Web Token)


## 📂 Project Structure


Placement-Portal
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── style.css
│   │
│   └── package.json
│
├── server
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   └── applicationController.js
│   │
│   ├── middleware
│   │   └── authMiddleware.js
│   │
│   ├── models
│   │   ├── User.js
│   │   ├── Job.js
│   │   └── Application.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── applicationRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── uploads
│   ├── server.js
│   └── package.json
│
└── README.md


# ⚙️ Installation and Setup

## 1. Clone Repository

```bash
git clone <your-github-repository-url>

Move into Project folder
cd Placement-Portal

Backend Setup
Go to server folder:
cd server

Install backend dependencies:
npm install

Create a .env file inside the server folder:
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

Start backend server:
npm run dev

Backend server will run on:
http://localhost:5000

Frontend Setup
Open another terminal.
Go to client folder:
cd client

Install frontend dependencies:
npm install

Start React application:
npm run dev

Frontend will run on:
http://localhost:5173

📖 Project Description

The Campus Placement Portal is a web-based application designed to simplify the placement process for students and administrators.
Students can create accounts, login securely, view available job opportunities, apply for jobs, and track their application status.
Admins can manage job postings, update job details, delete jobs, view student applications, and update application status.
The application uses JWT authentication for secure user access and MongoDB for storing user, job, and application data.
This project follows a full-stack architecture with React.js as the frontend, Node.js and Express.js as the backend, and MongoDB as the database.


🔐 Authentication Flow

User registers with name, email, password, and role.
Password is encrypted using bcrypt before storing in database.
User logs in with email and password.
Server generates a JWT token.
Token is stored on the client side.
Protected routes verify the token before allowing access.



## 🎯 Future Enhancements

- Resume Upload and Management
- Email Notifications for Application Updates
- Interview Scheduling System
- Company/Recruiter Dashboard
- Advanced Job Search and Filtering
- Student Profile Management
- Online Assessment Integration
- Placement Analytics Dashboard

## 👨‍💻 Developed By

**Kumari Kaki**