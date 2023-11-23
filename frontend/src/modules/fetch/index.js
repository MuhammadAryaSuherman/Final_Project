import { instance } from "../axios/index";

async function registerUser(username, email, password) {
  try {
    const response = await instance.post("/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function loginUser(email, password) {
  try {
    const response = await instance.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getAllProduct() {
  try {
    const response = await instance.get("/produk");
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getProductById(id) {
  try {
    const response = await instance.get(`/produk/${id}`);
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function createOrder(produk_id, id_game, metode_pembayaran) {
  try {
    const response = await instance.post("/order", {
      produk_id,
      metode_pembayaran,
      id_game,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getUserbyid(id) {
  try {
    const response = await instance.get(`/user/${id}`);
    console.log('Response data:', response.data); 
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function getReviewsByProductId(productId) {
  try {
    const response = await instance.get(`/produk/${productId}/reviews`);
    console.log('Response data:', response.data);

    const reviewsWithCreatedAt = response.data.map((review) => ({
      ...review,
      created_at: review.created_at,
    }));

    return reviewsWithCreatedAt;
  } catch (error) {
    console.error('Error fetching reviews:', error.response);
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

  
async function addReviewByProductId(productId, review, token) {
  try {
    const response = await instance.post(`/produk/${productId}/reviews`,{ review },
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );
    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}
  
async function fetchReviews(productId) {
  try {
    const response = await instance.get(`/produk/${productId}/reviews`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
}
  
async function putReview(productId, reviewId, updatedReview) {
  try {
    const response = await instance.put(`/produk/${productId}/reviews/${reviewId}`, {
      review: updatedReview,
    });
  return response.data;
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
}
  
async function deleteReview(productId, reviewId) {
  try {
    const response = await instance.delete(`/produk/${productId}/reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
}
  
  export {
    getAllProduct,
    getProductById,
    loginUser,
    getUserbyid,
    registerUser,
    createOrder,
    getReviewsByProductId,
    addReviewByProductId,
    fetchReviews,
    putReview,
    deleteReview
  };