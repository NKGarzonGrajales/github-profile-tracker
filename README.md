# 🚀 GitHub Profile Tracker

An elegant and minimalist Full-Stack application that allows users to search for GitHub profiles using the public API, while maintaining a global visit counter powered by a custom backend.

## ✨ Features

- 🔍 **Profile Search Engine:** Asynchronous integration with the public GitHub API to fetch real-time data.
- 📊 **Global Visit Counter:** Persistent tracking of page views, managed by a custom REST API.
- 🎨 **Professional UI/UX Design:** Minimalist interface, restricted color palette, and clear visual hierarchy.


## 🛠️ Tech Stack

**Frontend:**
- React (v18)
- Vite (Build tool)
- CSS3 (Variables, Flexbox, Custom Animations)

**Backend & Database:**
- Node.js
- Express.js
- PostgreSQL (`pg` driver)
- CORS & Dotenv

---

## ⚙️ Local Setup and Installation

To run this project on your local machine, follow these steps:

### 1. Database Setup (PostgreSQL)
Ensure you have PostgreSQL installed and running. Execute the following SQL script in your database client (e.g., DBeaver or pgAdmin) to create the required table:

```sql
CREATE TABLE visits (
    id SERIAL PRIMARY KEY,
    ip_hash VARCHAR(255) NOT NULL,
    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Backend Configuration
Open a terminal inside the `backend` folder:

```bash
cd backend
npm install
```
Create a `.env` file in the root of the `backend` directory with the following variables:
```env
PORT=3001
DATABASE_URL=postgres://your_username:your_password@localhost:5432/postgres
```
Start the server:
```bash
node index.js
```

### 3. Frontend Configuration
Open a **new terminal** inside the `frontend` folder:

```bash
cd frontend
npm install
npm run dev
```

---

## 👨‍💻 Author

Developed by **Nidia** - Full-Stack Developer exploring React, Node.js, and PostgreSQL.