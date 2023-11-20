import React, { useState } from 'react';
import { createOrder } from '../modules/fetch/index'; // Replace with the correct path to your axios file

const OrderForm = () => {
  const [productId, setProductId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [gameId, setGameId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Call the createOrder function
      const response = await createOrder(productId, paymentMethod, gameId);
      setSuccessMessage('Order placed successfully!');
      console.log('Order response:', response);
    } catch (error) {
      setError(error.message || 'Something went wrong');
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h2>Order Form</h2>
      {error && <p>Error: {error}</p>}
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Product ID:
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Payment Method:
          <input
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </label>
        <br />
        <label>
          Game ID:
          <input
            type="text"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
