import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const addToCart = () => {
    const existing = JSON.parse(localStorage.getItem('cart') || '[]');
    existing.push(product);
    localStorage.setItem('cart', JSON.stringify(existing));
    alert('Added to Shopping Cart!');
    navigate('/cart');
  };

  if (!product) return <h2>Loading product details...</h2>;

  return (
    <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', background: 'white', padding: '2rem', borderRadius: '10px' }}>
      <img src={product.imageUrl} alt={product.name} style={{ width: '400px', height: '300px', objectFit: 'cover', borderRadius: '8px' }} />
      <div>
        <h2>{product.name}</h2>
        <p style={{ color: '#059669', fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>${product.price.toFixed(2)}</p>
        <p style={{ marginBottom: '1rem', color: '#475569' }}>{product.description}</p>
        <p><strong>Stock Available:</strong> {product.stock} units</p>
        <button onClick={addToCart} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Add to Cart</button>
      </div>
    </div>
  );
}
