import React, { useState } from 'react';

const OrderInput = ({ onSubmit }) => {
  const [orderText, setOrderText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!orderText.trim()) return;
    onSubmit(orderText);
    setOrderText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={orderText}
        placeholder="Describe your order"
        onChange={(e) => setOrderText(e.target.value)}
      />
      <button type="submit">Submit Order</button>
    </form>
  );
};

export default OrderInput;