import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      let url = 'http://localhost:5000/api/products';
      const params = {};
      if (category) params.category = category;
      if (search) params.search = search;

      const res = await axios.get(url, { params });
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("API error:", err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
        <form onSubmit={handleSearch} style={{ flexGrow: 1, display: 'flex' }}>
          <input
            type="text"
            placeholder="Search electronics, furniture..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
          <button type="submit" className="btn btn-primary" style={{ marginLeft: '0.5rem' }}>Search</button>
        </form>
        <select onChange={(e) => setCategory(e.target.value)} style={{ padding: '0.5rem', borderRadius: '6px' }}>
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Wearables">Wearables</option>
        </select>
      </div>

      <div className="grid">
        {products.map(p => (
          <div key={p._id} className="card">
            <img src={p.imageUrl} alt={p.name} />
            <h3 className="card-title">{p.name}</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>{p.category}</p>
            <p className="price">${p.price.toFixed(2)}</p>
            <Link to={`/product/${p._id}`} className="btn btn-primary" style={{ textAlign: 'center', marginTop: 'auto', textDecoration: 'none' }}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
