"use client";

import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import Image from "next/image";
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, calculateSubtotal } = useCart();
  const [discount, setDiscount] = useState(0);

  // Set a random discount value between 0 and 100 when the component mounts
  useEffect(() => {
    const randomDiscount = Math.floor(Math.random() * 101);
    setDiscount(randomDiscount);
  }, []);

  const handleDiscountChange = (event) => {
    const value = Number(event.target.value);
    setDiscount(value >= 0 ? value : 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = discount > 0 ? (discount / 100) * subtotal : 0;
    return subtotal - discountAmount;
  };

  return (
    <main className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          Your Cart
        </h1>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is currently empty.</p>
        ) : (
          <div>
            {/* Cart Items List */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-4 border-b last:border-b-0"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={120}
                    height={120}
                    className="object-cover rounded-md"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">₹{item.price}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        className="w-16 text-center border rounded-md text-black font-bold"
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value > 0) updateQuantity(item.id, value);
                        }}
                      />
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-white shadow rounded-lg mt-6 p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Cart Summary
              </h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-800 font-semibold">
                  ₹{calculateSubtotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Discount (%):</span>
                <input
                  type="number"
                  value={discount}
                  min="0"
                  max="100"
                  onChange={handleDiscountChange}
                  className="w-24 text-center border rounded-md text-black"
                />
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-800 font-semibold">Total:</span>
                <span className="text-gray-800 font-semibold">
                  ₹{calculateTotal().toFixed(2)}
                </span>
              </div>
              <button className="bg-blue-500 text-white p-3 rounded-md w-full hover:bg-blue-600 transition">
                <Link href="/checkout">Checkout</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
