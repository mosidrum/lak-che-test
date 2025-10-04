# Lak-Che-Test

## 📌 Project Description
Design a simple REST API endpoint in Node.js (Express) to add a new user with `name` and `email`.  
This project demonstrates how to structure routes, connect to a PostgreSQL database using TypeORM, and add basic validation.

---

## ⚙️ Tech Stack
- Node.js
- Express.js
- TypeScript
- TypeORM
- PostgreSQL
- Nodemon (for hot reload in development)
- Docker & Docker Compose

---

## 🚀 Getting Started

### 1. Clone the repository
```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install dependencies
```sh
yarn install
```
or
```sh
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:

```env
PORT=
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
```

---

## ▶️ Running the Project

### Docker
Build and run using Docker Compose:
```sh
docker-compose up --build
```

This will start:
- **express_app** → your Node.js server on `http://localhost:5000`
- **postgres_db** → PostgreSQL database

---

## 🛠 Scripts
- `yarn dev` → Run with nodemon (development mode)
- `yarn build` → Compile TypeScript to JavaScript
- `yarn start` → Run compiled code from `dist`

---

## ✅ Notes
- Uses **TypeORM** for database connection.
- Includes **basic validation** to ensure `name` and `email` are provided.
- Nodemon is configured with `legacyWatch` for reliable hot reload inside Docker.

---


