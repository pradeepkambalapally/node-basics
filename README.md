# NodeBase — Node.js Basics App

A full-stack app built with **Node.js + Express + MongoDB** backend and a **React + Vite** frontend.

## Features

- **Auth** — Register & login with JWT tokens, bcrypt password hashing
- **Products** — Full CRUD: add, view, edit, delete products (protected routes)
- **Image Gallery** — Upload images to Cloudinary, browse with pagination, delete (drag & drop supported)

## Tech Stack

| Layer | Tech |
|-------|------|
| Backend | Node.js, Express 5, MongoDB, Mongoose |
| Auth | JWT, bcrypt |
| File Storage | Cloudinary, Multer |
| Frontend | React 19, Vite, React Router v6 |
| UI | Custom CSS, Lucide icons, react-hot-toast |

## Getting Started

### 1. Clone

```bash
git clone https://github.com/pradeepkambalapally/node-basics.git
cd node-basics
```

### 2. Backend Setup

```bash
npm install
cp .env.example .env
# Fill in your .env values
npm run dev
```

### 3. Frontend Setup

```bash
cd client
npm install
cp .env.example .env
# Set VITE_API_URL if needed
npm run dev
```

### 4. Open

- Backend: http://localhost:3000
- Frontend: http://localhost:5173

## API Endpoints

### Auth
| Method | Path | Description |
|--------|------|-------------|
| POST | /api/users/register | Register |
| POST | /api/users/login | Login (returns JWT) |

### Products (write routes require JWT)
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get single product |
| POST | /api/products | Add product 🔒 |
| PUT | /api/products/:id | Update product 🔒 |
| DELETE | /api/products/:id | Delete product 🔒 |

### Images (all routes require JWT)
| Method | Path | Description |
|--------|------|-------------|
| POST | /api/images/upload | Upload image 🔒 |
| GET | /api/images/fetch | Get my images 🔒 |
| DELETE | /api/images/delete/:id | Delete image 🔒 |

## Environment Variables

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```
