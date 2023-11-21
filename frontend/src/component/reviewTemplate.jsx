import React, { useState, useEffect } from 'react';
import {
  Box,
  Input,
  Text,
  Button,
  Textarea,
  VStack,
  HStack,
  Divider,
  Heading,
} from '@chakra-ui/react';
import { getReviewsByProductId, addReviewByProductId } from '../modules/fetch/index'; // Pastikan mengganti 'yourAxiosFunctions' dengan nama berkas Anda

const ReviewsComponent = () => {
  const [productId, setProductId] = useState('');
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    const urlPath = window.location.pathname;
    const parts = urlPath.split('/');
    const productIdFromURL = parts[parts.length - 1];
    setProductId(productIdFromURL || '');
  }, []);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const fetchedReviews = await getReviewsByProductId(productId);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const handleSubmitReview = async () => {
    try {
      const addedReview = await addReviewByProductId(productId, newReview);
      setReviews([...reviews, addedReview]);
      setNewReview('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <Box>
      <VStack spacing={4}>
        <Heading as="h2" size="md" mb={4}>
          Reviews
        </Heading>
        {reviews.map((review, index) => (
          <Box key={index}>
            <Text>{review.content}</Text>
            <Divider my={2} />
          </Box>
        ))}
        <Box width="100%">
          <Textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review..."
          />
        </Box>
        <HStack>
          <Button colorScheme="blue" onClick={handleSubmitReview}>
            Submit Review
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ReviewsComponent;

