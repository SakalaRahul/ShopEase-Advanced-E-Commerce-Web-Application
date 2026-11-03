const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopease';

const sampleProducts = [
  {
    name: "Ultra-Lightweight Mechanical Keyboard",
    description: "Premium tactile switches, customizable RGB lighting, and aircraft-grade aluminum body.",
    price: 129.99,
    category: "Electronics",
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    rating: 4.8,
    numReviews: 12
  },
  {
    name: "Noise-Canceling Wireless Headphones",
    description: "Active Noise Cancellation, 35-hour battery life, and crystal-clear acoustic isolation.",
    price: 249.50,
    category: "Electronics",
    stock: 15,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    rating: 4.9,
    numReviews: 28
  },
  {
    name: "Ergonomic Desk Chair",
    description: "Full lumbar support, breathable mesh, adjustable armrests for maximum productivity.",
    price: 299.00,
    category: "Furniture",
    stock: 10,
    imageUrl: "https://images.unsplash.com/photo-1580481072645-022f9a6d1270?w=500",
    rating: 4.6,
    numReviews: 8
  },
  {
    name: "Smart Fitness Watch V2",
    description: "Heart rate monitor, GPS tracking, sleep analytics, and water resistance up to 50m.",
    price: 179.00,
    category: "Wearables",
    stock: 40,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    rating: 4.7,
    numReviews: 19
  }
];

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for Seeding...");

    await User.deleteMany({});
    await Product.deleteMany({});

    const admin = await User.create({
      name: "ShopEase Admin",
      email: "admin@shopease.com",
      password: "AdminPass123!",
      role: "admin"
    });

    const customer = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "CustomerPass123!",
      role: "customer"
    });

    await Product.insertMany(sampleProducts);

    console.log("Database Seeded Successfully!");
    console.log("Admin User: admin@shopease.com / AdminPass123!");
    console.log("Customer User: john@example.com / CustomerPass123!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding Error:", err);
    process.exit(1);
  }
}

seedDB();
