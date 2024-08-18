import React, { useState } from 'react';
import axios from 'axios';

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: 'credit_card'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('/api/place-order', formData);
      if (response.status === 200) {
        setSuccess('Your order has been placed successfully!');
        setFormData({
          name: '',
          address: '',
          paymentMethod: 'credit_card'
        });
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('There was an error placing your order. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping Information</h2>

      <div>
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="paymentMethod" className="block text-gray-700 font-medium mb-2">Payment Method</label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="credit_card">Credit Card</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>

      {loading && <p className="text-blue-600">Placing your order...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200 transform hover:scale-105"
      >
        Place Order
      </button>
    </form>
  );
};

export default CheckoutForm;
