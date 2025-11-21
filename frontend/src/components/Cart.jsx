import { useState } from 'react';

const Cart = ({ cart, addItem, loading }) => {
  const sampleItems = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <ul className="mb-4 space-y-2">
          {cart.map(item => (
            <li key={item.id} className="flex justify-between py-2 border-b">
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="space-y-2">
        {sampleItems.map(item => (
          <button
            key={item.id}
            onClick={() => addItem({ ...item, qty: 1 })}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Add {item.name} (${item.price})
          </button>
        ))}
      </div>
    </div>
  );
};

export default Cart;