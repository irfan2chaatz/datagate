# DataGate

🚀 **DataGate** is a full-stack **CSV Validation & Upload System** built with **React, NestJS, and MySQL**.  
Upload, validate, store, and analyze CSV data with automatic error logging and downloadable reports.

---

## ✨ Features
- 📤 Upload single or multiple CSV files
- ✅ Validate rows before inserting into database
- 🗂 Save valid records in MySQL
- ⚠️ Log invalid records to error CSV (downloadable by user)
- 📊 Upload summary (Inserted / Failed counts)
- 🌐 Responsive UI (desktop + mobile)
- 🛡️ Modular backend (controller, service, model, dto, middleware, utils)

---

## 🛠️ Tech Stack
- **Frontend**: React (Vite), TailwindCSS, Axios, Lucide Icons, Sonner (toasts)
- **Backend**: NestJS, TypeORM, MySQL, Multer, CSV-Parser, Class-Validator
- **Database**: MySQL 8 (Docker + Adminer for DB UI)

---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/irfan2chaatz/datagate.git
cd datagate
```

### 2. Backend Setup
```bash
cd backend
npm install
docker compose up -d  # starts MySQL + Adminer
npm run start:dev
# Backend runs at: http://localhost:3000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Frontend runs at: http://localhost:5173
```

## 🔑 Environment Variables

### 4. Create a .env file in backend/:
```bash
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=datagate
DB_PASS=datagatepass
DB_NAME=datagate

LOG_LEVEL=debug
```


