import { useState, useEffect } from 'react';
import { createOrder } from '../modules/fetch/index';
import {
  Alert, 
  AlertIcon,
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Select, 
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
    const productIdFromURL = parts[parts.length - 1];
    setProductId(productIdFromURL || '');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await createOrder(produk_id, id_game, metode_pembayaran);

      const { transactionToken } = response;
      console.log(transactionToken);
      window.snap.pay(transactionToken.token, {
        onSuccess: function (result) {
          setIsLoading(false);
          setSuccessMessage('Pembayaran berhasil!');
          setTimeout(() => {
            setSuccessMessage('');
          }, 5000);
        },
        onPending: function (result) {
          setIsLoading(false);
          setSuccessMessage('Pembayaran sedang diproses.');
          setTimeout(() => {
            setSuccessMessage('');
          }, 5000);
        },
        onError: function (result) {
          setIsLoading(false);
          setError('Pembayaran gagal. Silakan coba lagi.');
        },
        onClose: function () {
          setIsLoading(false);
          setError('Pembayaran dibatalkan.');
        },
      });
    } catch (error) {
      setIsLoading(false);
      setError('Order failed. Please try again.');
    }
  };

  return (
    <Box boxShadow="2xl" padding={8} borderRadius="xl" marginLeft={3}>
      <h2>Order Form</h2>
      {successMessage && (
        <Alert status="success" mb={4} variant="subtle" fontSize="lg" onClick={() => setSuccessMessage('')} cursor="pointer" isClosable>
          <AlertIcon />
          {successMessage}
        </Alert>
      )}
      {error && (
        <Alert status="error" mb={4} variant="subtle" fontSize="lg" onClick={() => setError('')} cursor="pointer" isClosable>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <input type="hidden" value={produk_id} name="productId" />

        <FormControl>
          <FormLabel>Payment Method:</FormLabel>
          <Select
            value={metode_pembayaran}
            onChange={(e) => setPaymentMethod(e.target.value)}
            placeholder="Select payment method"
          >
            <option value="MidTrans">MidTrans</option>
          </Select>
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
        <Button type="submit" isLoading={isLoading} border="1px solid gray">
          {isLoading ? 'Placing Order...' : 'Place Order'}
        </Button>
      </form>
    </Box>
  );
};

export default OrderForm;



