# Lak-Che-Test

## 📌 Project Description
This project demonstrates a simple REST API built with Node.js and Express to create users with `name` and `email`.  
It showcases structured routing, database connection using TypeORM with PostgreSQL, and basic validation for user input.

---

## ⚙️ Tech Stack
- Node.js
- Express.js
- TypeScript
- TypeORM
- PostgreSQL
- Nodemon (for hot reload in development)
- Docker & Docker Compose
- Helmet & CORS for security and cross-origin handling

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install dependencies
```bash
yarn install
```
or
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name
```

---

## ▶️ Running the Project

### Docker
Build and run using Docker Compose:
```bash
docker-compose up --build
```

This will start:
- **express_app** → Node.js server on `http://localhost:5000`
- **postgres_db** → PostgresSQL database

### Local Development (without Docker)
```bash
yarn dev
```
This runs the server using **nodemon** for live reload.

---

## 🛠 Scripts
- `yarn dev` → Run the app in development mode (hot reload)
- `yarn build` → Compile TypeScript to JavaScript
- `yarn start` → Run compiled code from `dist` folder

---

## 📬 API Usage

### Create a User

- **Route:**
```
POST /api/v1/users/create
```

- **Request Headers:**
```http
Content-Type: application/json
```

- **Request Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

- **Success Response (201 Created):**
```json
{
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

- **Error Response (if email already exists):**
```json
{
  "message": "A user with this email already exists"
}
```

---

### Testing with curl
```bash
curl -X POST http://localhost:5000/api/v1/users/create   -H "Content-Type: application/json"   -d '{"name":"John Doe","email":"john.doe@example.com"}'
```
