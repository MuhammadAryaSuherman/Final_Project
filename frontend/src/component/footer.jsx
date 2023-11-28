
import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" p={4} bgColor="#333" color="white" mt="auto" width="100%">
      <VStack spacing={2}>
        <Text>&copy; 2023 Fourstore </Text>
      </VStack>
    </Box>
  );
};

export default Footer;
