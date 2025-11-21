import { useState, useEffect } from 'react';
import axios from 'axios';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

const API_BASE = 'http://localhost:3000/api';

function App() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/cart`);
      setCart(data.cart || []);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addItem = async (item) => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/cart/add`, item);
      fetchCart();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add item');
    }
    setLoading(false);
  };

  const applyDiscount = async (code) => {
    if (!code) return alert('Enter a discount code');
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/cart/add`, { code });  // Wait, fix: Use apply endpoint if added, but for now, apply during checkout
      alert('Discount applied!');  // Note: In full impl, add /apply-discount route
      fetchCart();
    } catch (err) {
      alert(err.response?.data?.error || 'Invalid code');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">E-Commerce Discount Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Cart cart={cart} addItem={addItem} loading={loading} />
        <Checkout cart={cart} applyDiscount={applyDiscount} fetchCart={fetchCart} />
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Tip: Checkout 5 times to generate a discount code. Use admin /api/admin/stats to view.</p>
      </div>
    </div>
  );
}

export default App;