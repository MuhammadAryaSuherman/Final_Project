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
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Something went wrong');
    }
  }
  
  async function addReviewByProductId(produk_id , review) {
    try {
      const response = await instance.post(`/reviews/`, { produk_id, review });
      console.log('Response data:', response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Something went wrong');
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
  };
