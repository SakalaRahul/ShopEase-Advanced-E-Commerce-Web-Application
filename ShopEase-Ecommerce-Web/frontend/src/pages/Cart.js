import React, { useState, useEffect } from 'react';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(items);
  }, []);

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
  };

  const total = cart.reduce((acc, i) => acc + i.price, 0);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <div>
          {cart.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'white', margin: '0.5rem 0', borderRadius: '6px' }}>
              <span>{item.name}</span>
              <strong>${item.price.toFixed(2)}</strong>
            </div>
          ))}
          <div style={{ marginTop: '1rem', textAlign: 'right' }}>
            <h3>Total: ${total.toFixed(2)}</h3>
            <button onClick={() => alert('Mock Order Placed Successfully!')} className="btn btn-primary" style={{ marginTop: '0.5rem', marginRight: '0.5rem' }}>Checkout Order</button>
            <button onClick={clearCart} className="btn" style={{ background: '#ef4444', color: 'white' }}>Clear Cart</button>
          </div>
        </div>
      )}
    </div>
  );
}
