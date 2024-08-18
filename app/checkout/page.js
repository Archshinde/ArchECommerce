'use client';

import React from 'react';
import CheckoutForm from '../../components/CheckoutForm';
import CheckoutSummary from '../../components/CheckoutSummary';
import { useCart } from '../../context/CartContext';

const CheckoutPage = () => {
  const { cart, calculateSubtotal } = useCart();

  return (
    <main className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h1>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-8 lg:flex lg:space-x-8 lg:space-y-0">
        <div className="flex-1">
          <CheckoutSummary cart={cart} calculateSubtotal={calculateSubtotal} />
        </div>
        <div className="flex-1">
          <CheckoutForm />
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
