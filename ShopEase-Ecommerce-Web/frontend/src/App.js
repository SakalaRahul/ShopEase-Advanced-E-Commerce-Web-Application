import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart, User, ShieldAlert } from 'lucide-react';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-brand">ShopEase</Link>
        <div className="nav-links">
          <Link to="/">Products</Link>
          <Link to="/cart"><ShoppingCart size={20} /> Cart</Link>
          <Link to="/login"><User size={20} /> Login</Link>
          <Link to="/admin"><ShieldAlert size={20} /> Admin</Link>
        </div>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
