# Xeuro Sports — Full Stack Web Application

Premium sportswear manufacturer website built with MERN stack (MongoDB, Express, React, Node.js).

## 🗂️ Project Structure

```
xeuro-sports/
├── backend/          # Express + MongoDB API
└── frontend/         # React + Vite frontend
```

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Fill in your .env values (see below)
npm run dev
```

Backend runs at: `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Fill in your .env values (see below)
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🔧 Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `PORT` | Server port (default: 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `CLIENT_URL` | Frontend URL for CORS (http://localhost:5173) |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `STRIPE_SECRET_KEY` | Stripe secret key (sk_test_...) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret (whsec_...) |

### Frontend (`frontend/.env`)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API URL (http://localhost:5000/api) |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (pk_test_...) |

---

## 👤 Seeding the Admin Account

After backend is running, make a POST request to create your first admin:

```bash
curl -X POST http://localhost:5000/api/admin/seed \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@xeurosports.com", "password": "YourSecurePassword123"}'
```

> ⚠️ **Disable the `/seed` route in production** by removing it from `backend/routes/authRoutes.js`

---

## 🔐 Admin Panel

**URL:** `http://localhost:5173/admin/login`

Features:
- Dashboard with stats (products, orders, revenue)
- Add / Edit / Delete products with Cloudinary image upload
- Toggle product availability
- View and manage orders
- Update order status

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, Redux Toolkit |
| Backend | Node.js, Express 4, Mongoose |
| Database | MongoDB Atlas |
| Auth | JWT (jsonwebtoken + bcryptjs) |
| Images | Cloudinary + multer-storage-cloudinary |
| Payments | Stripe Checkout |
| Animations | Framer Motion |
| Icons | React Icons |
| SEO | React Helmet Async |

---

## 📜 Available Scripts

### Backend
```bash
npm run dev     # Start with nodemon (development)
npm start       # Start with node (production)
```

### Frontend
```bash
npm run dev     # Start Vite dev server
npm run build   # Build for production
npm run preview # Preview production build
```

---

## 🌐 API Endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/admin/login` | No | Admin login |
| POST | `/api/admin/seed` | No | Seed first admin (disable in production) |
| GET | `/api/products` | No | List products (with filters) |
| GET | `/api/products/:id` | No | Get single product |
| POST | `/api/products` | Yes | Create product + images |
| PUT | `/api/products/:id` | Yes | Update product |
| DELETE | `/api/products/:id` | Yes | Delete product + images |
| PATCH | `/api/products/:id/toggle` | Yes | Toggle availability |
| POST | `/api/orders` | No | Create order |
| POST | `/api/orders/inquiry` | No | Submit bulk inquiry |
| POST | `/api/orders/checkout` | No | Create Stripe session |
| POST | `/api/orders/webhook` | No | Stripe webhook handler |
| GET | `/api/orders` | Yes | List all orders |
| PATCH | `/api/orders/:id/status` | Yes | Update order status |
