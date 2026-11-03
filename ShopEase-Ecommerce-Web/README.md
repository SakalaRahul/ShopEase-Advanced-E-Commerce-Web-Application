# ShopEase – Advanced E-Commerce Web Application

ShopEase is a full-stack, enterprise-grade e-commerce web platform built using ReactJS, Node.js, Express.js, and MongoDB. It provides a seamless shopping experience with product search, filtering, cart management, checkout with mock payment integration, user reviews, order tracking, and an extensive Admin Dashboard.

## Features
- **Authentication & Authorization**: JWT-based user and admin authentication, password hashing, and role-based access control.
- **Product Management**: Category browsing, multi-criteria filtering, price sorting, search, image gallery, and customer review system.
- **Shopping Cart & Checkout**: Persistent cart, real-time stock validation, automated total calculation, address management, and mock payment gateway.
- **Order Management**: Order history, live order tracking, status updates, and email/invoice summary generation.
- **Admin Dashboard**: Comprehensive analytics, product CRUD operations, inventory management, customer support, and sales metrics.

## Tech Stack
- **Frontend**: React 18, React Router v6, Redux Toolkit, Tailwind CSS / Custom CSS3, Lucide Icons
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Bcrypt.js
- **Testing**: Jest, Supertest, React Testing Library

## Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run seed # Populate database with seed products & admin account
npm start
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```
Access the application at `http://localhost:3000`.

### Admin Credentials (Default Seed)
- **Email**: `admin@shopease.com`
- **Password**: `AdminPass123!`

## API Documentation
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user account | No |
| `POST` | `/api/auth/login` | Authenticate user & return JWT token | No |
| `GET` | `/api/products` | Get list of products with pagination/filter | No |
| `GET` | `/api/products/:id` | Get detailed product information | No |
| `POST` | `/api/orders` | Create new purchase order | Yes |
| `GET` | `/api/admin/analytics` | Get store analytics summary | Admin |

## License
MIT License.
