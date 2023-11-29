import React, { useEffect, useState } from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'; // Import Table components from Chakra UI
import { getOrdersByUserId } from '../modules/fetch';
import { jwtDecode } from 'jwt-decode';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const token = window.localStorage.getItem('token');
  const { id: user_id } = jwtDecode(token);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrdersByUserId(user_id, token);
      setOrders(data.orders);
    };
    fetchOrders();
  }, [user_id, token]);

  return (
    <Box p={5} w="100%">
      <Text fontSize="3xl" fontWeight="bold">Order History</Text>
      <Table variant="simple" mt={4} size="lg" w="100%" border="1px solid black" style={{borderCollapse: 'collapse'}}> {/* Add borderCollapse here */}
        <Thead>
          <Tr>
            <Th border="1px solid black">Order ID</Th> {/* Add border here */}
            <Th border="1px solid black">Product ID</Th> {/* Add border here */}
            <Th border="1px solid black">Payment Method</Th> {/* Add border here */}
            {/* Add more headers as needed */}
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order.id}>
              <Td border="1px solid black">{order.id}</Td> {/* Add border here */}
              <Td border="1px solid black">{order.produk_id}</Td> {/* Add border here */}
              <Td border="1px solid black">{order.metode_pembayaran}</Td> {/* Add border here */}
              {/* Add more cells as needed */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default OrderHistory;
