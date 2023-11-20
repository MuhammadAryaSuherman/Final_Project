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

async function getProductById() {
  try {
    const response = await instance.get(`/produk/${id}`);
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function createOrder(productId, paymentMethod, gameId) {
  try {
    const response = await instance.post("/order", {
      productId,
      paymentMethod,
      gameId,
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

export { getAllProduct, getProductById, loginUser, getUserbyid, registerUser, createOrder};
