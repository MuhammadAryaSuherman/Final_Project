import { instance } from '../axios/index';

async function registerUser(username, email, password) {
  try {
    const response = await instance.post('/register', { username, email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function loginUser(email, password) {
    try {
      const response = await instance.post('/login', { email, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Something went wrong');
    }
  }

// Function for get all books endpoint
async function getAllProduct() {
    try {
      const response = await instance.get('/produk');
      console.log('Response data:', response.data); 
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Something went wrong');
    }
  }

export{getAllProduct, loginUser, registerUser}