import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/admin/analytics', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setStats(res.data))
    .catch(err => console.error(err));
  }, []);

  if (!stats) return <p style={{ marginTop: '2rem' }}>Loading Admin Analytics (Requires Admin JWT)...</p>;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Admin Control & Sales Dashboard</h2>
      <div className="grid" style={{ marginTop: '1rem' }}>
        <div className="card" style={{ background: '#3b82f6', color: 'white' }}>
          <h3>Total Customers</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalUsers}</p>
        </div>
        <div className="card" style={{ background: '#10b981', color: 'white' }}>
          <h3>Total Products</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalProducts}</p>
        </div>
        <div className="card" style={{ background: '#8b5cf6', color: 'white' }}>
          <h3>Total Orders</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalOrders}</p>
        </div>
        <div className="card" style={{ background: '#f59e0b', color: 'white' }}>
          <h3>Total Sales Volume</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>${stats.totalSales}</p>
        </div>
      </div>
    </div>
  );
}
