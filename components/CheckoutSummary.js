import React, { useState } from 'react';
import Image from 'next/image';
import Discountcodevalidator from './Discountcodevalidator';

const CheckoutSummary = ({ cart, calculateSubtotal, updateQuantity }) => {
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState(null); // State to manage error messages
  const subtotal = calculateSubtotal();
  const shipping = 50; // Example shipping cost
  const total = subtotal - discount + shipping;

  const handleApplyDiscount = (discountPercentage) => {
    const discountAmount = (subtotal * discountPercentage) / 100;
    setDiscount(discountAmount);
  };

  // Example valid discount codes to display
  const validCodes = {
    'DISCOUNT10': 10,  // 10% discount
    'DISCOUNT20': 20,  // 20% discount
  };

  // Handle quantity update with validation
  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity <= 0 || isNaN(newQuantity)) {
      setError(`Invalid quantity for ${item.title}. Please enter a valid number.`);
    } else {
      setError(null); // Clear any previous error
      updateQuantity(item.id, newQuantity); // Function to update the quantity in the cart
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center p-4 border-b border-gray-200">
              <Image
                src={item.image}
                alt={item.title}
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded-md mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-600">Price: ₹{item.price.toFixed(2)}</p>
                <div className="flex items-center">
                  <label htmlFor={`quantity-${item.id}`} className="text-gray-600 mr-2">Quantity:</label>
                  <input
                    id={`quantity-${item.id}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                    className="w-16 p-1 border border-gray-300 rounded-md text-center"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-red-600 mt-4">{error}</p>}

      <div className="mt-6 border-t border-gray-200 pt-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal:</span>
          <span className="text-gray-800 font-semibold">₹{subtotal.toFixed(2)}</span>
        </div>

        {/* Display available discount codes */}
        <div className="my-4">
          <h4 className="text-gray-700 font-medium">Available Discount Codes:</h4>
          <ul className="list-disc list-inside text-gray-600">
            {Object.keys(validCodes).map(code => (
              <li key={code}>{code} - {validCodes[code]}% off</li>
            ))}
          </ul>
        </div>

        {/* Include the Discount Code Validator */}
        <Discountcodevalidator onApplyDiscount={handleApplyDiscount} />

        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Shipping:</span>
          <span className="text-gray-800 font-semibold">₹{shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-800 font-bold">Total:</span>
          <span className="text-gray-800 font-bold">₹{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;