import { useEffect, useState } from 'react';
import { Box, Text, Button, Textarea, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import {
  fetchReviews,
  postReview,
  putReview,
  deleteReview,
} from '../modules/fetch';

const ReviewPage = () => {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewsData = await fetchReviews(productId);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchData();
  }, [productId]);

  const handlePostReview = async () => {
    try {
      await postReview(productId, newReview);
      const reviewsData = await fetchReviews(productId);
      setReviews(reviewsData);
      setNewReview('');
      toast({
        title: 'Review Posted',
        description: 'Your review has been successfully posted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error posting review:', error);
      toast({
        title: 'Error Posting Review',
        description: error?.message || 'An error occurred while posting your review.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handlePutReview = async (reviewId) => {
    try {
      await putReview(productId, reviewId, 'Updated review');
      const reviewsData = await fetchReviews(productId);
      setReviews(reviewsData);
      toast({
        title: 'Review Updated',
        description: 'Your review has been successfully updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating review:', error);
      toast({
        title: 'Error Updating Review',
        description: error?.message || 'An error occurred while updating your review.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(productId, reviewId);
      const reviewsData = await fetchReviews(productId);
      setReviews(reviewsData);
      toast({
        title: 'Review Deleted',
        description: 'Your review has been successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting review:', error);
      toast({
        title: 'Error Deleting Review',
        description: error?.message || 'An error occurred while deleting your review.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      w="65%"
      py={4}
      px={10}
      mx={2}
      mt={8}
      bgColor="white"
      shadow="lg"
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Product Reviews
      </Text>

      {reviews.map((review) => (
        <Box key={review.id} border="1px" borderRadius="lg" p={3} mb={3}>
          <Text>{review.text}</Text>
          <Button onClick={() => handlePutReview(review.id)} ml={2} colorScheme="teal">
            Update
          </Button>
          <Button onClick={() => handleDeleteReview(review.id)} ml={2} colorScheme="red">
            Delete
          </Button>
        </Box>
      ))}

      <Textarea
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
        placeholder="Write a new review..."
        borderColor="black"
        borderWidth={2}
        borderRadius="xl"
        mt={4}
      />

      <Button mt={4} colorScheme="teal" onClick={handlePostReview}>
        Post Review
      </Button>
    </Box>
  );
};

export default ReviewPage;