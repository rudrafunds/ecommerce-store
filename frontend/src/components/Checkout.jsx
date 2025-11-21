import { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

const Checkout = ({ cart, applyDiscount, fetchCart }) => {
  const [discountCode, setDiscountCode] = useState('');

  const handleCheckout = async () => {
    try {
      await axios.post(`${API_BASE}/checkout`, { discountCode: discountCode || null });
      alert('Order placed successfully!');
      setDiscountCode('');
      fetchCart();
    } catch (err) {
      alert(err.response?.data?.error || 'Checkout failed');
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Discount Code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={() => applyDiscount(discountCode)}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 mb-4"
        >
          Apply Discount
        </button>
      </div>
      <div className="text-right mb-4">
        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
      </div>
      <button
        onClick={handleCheckout}
        disabled={cart.length === 0}
        className="w-full bg-purple-500 text-white py-3 rounded hover:bg-purple-600 disabled:opacity-50"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;