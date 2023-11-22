// ReviewPage.jsx
import { useState, useEffect } from "react";
import {
  Alert,
  AlertIcon,
  CloseButton,
  Box,
  Button,
  Text,
  Textarea,
  VStack,
  HStack,
  Divider,
  Heading,
} from "@chakra-ui/react";
import {
  getReviewsByProductId,
  addReviewByProductId,
  putReview,
  deleteReview,
} from "../modules/fetch/";

const ReviewPage = () => {
  const [productId, setProductId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [alertData, setAlertData] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [showAllReviews] = useState(false);

  useEffect(() => {
    const urlPath = window.location.pathname;
    const parts = urlPath.split("/");
    const productIdFromURL = parts[parts.length - 1];
    setProductId(productIdFromURL || "");
  }, []);

  useEffect(() => {
    console.log("Product ID:", productId);
    if (productId) {
      fetchReviews();
    }
  }, [productId, showAllReviews]);

  const handleCloseAlert = () => {
    setAlertData(null);
  };

  const fetchReviews = async () => {
    try {
      const fetchedReviews = await getReviewsByProductId(productId);
      console.log("Fetched Reviews:", fetchedReviews);
      setReviews(fetchedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  
  const handleSubmitReview = async () => {
    try {
      await addReviewByProductId(productId, newReview);
      fetchReviews();

      setNewReview("");
      setAlertData({ type: "success", message: "Review added successfully!" });
    } catch (error) {
      console.error("Error adding review:", error);
      setAlertData({
        type: "error",
        message: "Failed to add review. Please try again.",
      });
    }
  };

  const handleEditReview = async (reviewId, updatedReview) => {
    try {
      await putReview(productId, reviewId, updatedReview);
      fetchReviews();

      setAlertData({
        type: "success",
        message: "Review updated successfully!",
      });

      setEditingReviewId(null);
      setNewReview("");
    } catch (error) {
      console.error("Error updating review:", error);
      setAlertData({
        type: "error",
        message: "Failed to update review. Please try again.",
      });
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(productId, reviewId);
      fetchReviews();

      setAlertData({
        type: "success",
        message: "Review deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting review:", error);
      setAlertData({
        type: "error",
        message: "Failed to delete review. Please try again.",
      });
    }
  };

  return (
    <Box width="100%" padding={4} borderRadius="xl">
      <VStack spacing={4} alignItems="stretch">
        <Heading as="h2" size="md" mb={4}>
          Reviews
        </Heading>
        {alertData && (
          <Alert status={alertData.type} mb={4}>
            <AlertIcon />
            {alertData.message}
            <CloseButton onClick={handleCloseAlert} ml="auto" />
          </Alert>
        )}
        {reviews.map((reviewObj) => (
          <Box
            key={reviewObj.id}
            width="100%"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="md"
            p={4}
            position="relative"
          >
            {editingReviewId === reviewObj.id ? (
              <Textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Edit your review..."
              />
            ) : (
              <Text as="p" textAlign="left">
                {String(reviewObj.review)}
              </Text>
            )}
            <HStack position="absolute" top="4px" right="4px">
              {editingReviewId === reviewObj.id ? (
                <>
                  <Button
                    color="black"
                    border="1px solid gray"
                    size="xs"
                    onClick={() => handleEditReview(reviewObj.id, newReview)}
                  >
                    Save
                  </Button>
                  <Button
                    color="black"
                    border="1px solid gray"
                    size="xs"
                    onClick={() => {
                      setEditingReviewId(null);
                      setNewReview("");
                    }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  color="black"
                  border="1px solid gray"
                  size="xs"
                  onClick={() => {
                    setEditingReviewId(reviewObj.id);
                    setNewReview(reviewObj.review);
                  }}
                >
                  Edit
                </Button>
              )}
              <Button
                color="black"
                border="1px solid gray"
                size="xs"
                onClick={() => handleDeleteReview(reviewObj.id)}
              >
                Delete
              </Button>
            </HStack>
            <Divider my="2px" />
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
          <Button
            color="black"
            border="1px solid gray"
            onClick={handleSubmitReview}
          >
            Submit Review
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ReviewPage;