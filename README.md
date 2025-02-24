# MERN Task Manager

A simple Task Manager application built using the MERN (MongoDB, Express, React, Node.js) stack. It allows users to create, read, update, and delete (CRUD) tasks.

## Features
- Add new tasks
- View all tasks
- Edit existing tasks
- Mark tasks as completed
- Delete tasks

## Technologies Used
- **Frontend**: React, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Database**: MongoDB (Atlas or Local)
- **Authentication (Optional)**: JWT, bcrypt

## Installation & Setup

### 1. Clone the Repository
```sh
git clone <repository-url>
cd mern-task-manager
2. Backend Setup
sh
Copy
Edit
cd backend
npm install
Create a .env file in the backend folder and add:

env
Copy
Edit
MONGO_URI=<your-mongodb-connection-string>
PORT=5000
Run the backend:

sh
Copy
Edit
npm start
3. Frontend Setup
sh
Copy
Edit
cd frontend
npm install
npm start
4. API Endpoints
POST /api/tasks - Create a task
GET /api/tasks - Get all tasks
GET /api/tasks/:id - Get a task by ID
PUT /api/tasks/:id - Update a task
DELETE /api/tasks/:id - Delete a task
