// frontend/src/components/Checkout.jsx
import { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:3000/api'; // Change to your deployed URL later

const Checkout = ({ cart, fetchCart }) => {
  const [discountCode, setDiscountCode] = useState('');
  const [message, setMessage] = useState('');

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setMessage('Cart is empty!');
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/checkout`, {
        discountCode: discountCode.trim() || null,
      });

      if (res.data.success) {
        setMessage(`Order placed! Total: $${res.data.order.total.toFixed(2)}${res.data.order.discountApplied ? ' (10% discount applied!)' : ''}`);
        setDiscountCode('');
        fetchCart(); // Refresh cart (should be empty now)
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Checkout failed';
      setMessage(`Error: ${errorMsg}`);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Discount Code (optional)</label>
        <input
          type="text"
          placeholder="e.g. SAVE10-abc123"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Tip: Checkout 5 times to generate a code → check /api/admin/stats
        </p>
      </div>

      <div className="text-right mb-6">
        <p className="text-2xl font-bold">Total: ${total.toFixed(2)}</p>
      </div>

      <button
        onClick={handleCheckout}
        disabled={cart.length === 0}
        className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
      >
        Place Order
      </button>

      {message && (
        <div className={`mt-4 p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Checkout;