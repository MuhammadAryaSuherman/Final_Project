import React, { useState, useEffect } from 'react';
import { createOrder } from '../modules/fetch/index';
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react';

const OrderForm = () => {
  const [produk_id, setProductId] = useState('');
  const [metode_pembayaran, setPaymentMethod] = useState('');
  const [id_game, setGameId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const urlPath = window.location.pathname;
    const parts = urlPath.split('/');
    const productIdFromURL = parts[parts.length - 1]; // Get the last part of the URL
    setProductId(productIdFromURL || '');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await createOrder(produk_id, id_game, metode_pembayaran);
      setSuccessMessage('Order placed successfully!');
      console.log('Order response:', response);
    } catch (error) {
      setError(error.message || 'Something went wrong');
    }

    setIsLoading(false);
  };

  return (
    <Box>
      <h2>Order Form</h2>
      {error && <p>Error: {error}</p>}
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        {/* Hidden input field for productId */}
        <input type="hidden" value={produk_id} name="productId" />

        <FormControl>
          <FormLabel>Payment Method:</FormLabel>
          <Input
            type="text"
            value={metode_pembayaran}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Game ID:</FormLabel>
          <Input
            type="text"
            value={id_game}
            onChange={(e) => setGameId(e.target.value)}
          />
        </FormControl>
        <br />
        <Button type="submit" isLoading={isLoading}>
          {isLoading ? 'Placing Order...' : 'Place Order'}
        </Button>
      </form>
    </Box>
  );
};

export default OrderForm;


