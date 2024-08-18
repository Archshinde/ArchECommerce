import React, { useState } from 'react';

const Discountcodevalidator = ({ onApplyDiscount }) => {
  const [discountCode, setDiscountCode] = useState('');
  const [discountError, setDiscountError] = useState('');

  const validateDiscountCode = () => {
    // Example validation logic
    const validCodes = {
      'DISCOUNT10': 10,  // 10% discount
      'DISCOUNT20': 20,  // 20% discount
    };

    if (validCodes[discountCode]) {
      onApplyDiscount(validCodes[discountCode]);
      setDiscountError('');
    } else {
      setDiscountError('Invalid discount code.');
    }
  };

  return (
    <div className="my-4">
      <label htmlFor="discountCode" className="block text-gray-700 font-medium mb-2">Discount Code</label>
      <div className="flex">
        <input
          type="text"
          id="discountCode"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="border p-2 rounded-l w-full"
        />
        <button
          onClick={validateDiscountCode}
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Apply
        </button>
      </div>
      {discountError && <p className="text-red-500 mt-2">{discountError}</p>}
    </div>
  );
};

export default Discountcodevalidator;