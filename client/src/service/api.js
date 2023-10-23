import axios from "axios";
const BaseURL = "http://localhost:8080";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const instance = axios.create({
  withCredentials: true, // Allow sending cookies with the request
});
import { ToastContainer, toast } from "react-toastify";

export const jwt_expired = () => {
  console.log("JWT token expired");
  cookies.remove("token");
  window.location.reload();
};
// Function to get user details
export const getUserDetails = async () => {
  try {
    const response = await instance.get(`${BaseURL}/user/info`);
    return response;
  } catch (error) {
    console.log("Error getting user details", error.message);
    return error;
  }
};
// ---------------------------------- For User/Customer ------------------------------------------------------

// Function to initiate the process of becoming a merchant
export const becomeMerchant = async () => {
  try {
    const response = await instance.post(`${BaseURL}/user/becomeMerchant`);
    return response;
  } catch (error) {
    console.log("Error getting user details", error.message);
    return error;
  }
};

// Function to add a new address to the user's profile
export const addNewAdddress = async (data) => {
  try {
    const response = await instance.post(`${BaseURL}/user/address`, data);
    return response;
  } catch (error) {
    console.error("Error posting product :", error);
    return error;
  }
};
export const updateAdddress = async (id, data) => {
  try {
    const response = await instance.patch(
      `${BaseURL}/user/address/${id}`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error posting product :", error);
    return error;
  }
};
export const deleteAdddress = async (id) => {
  try {
    const response = await instance.delete(`${BaseURL}/user/address/${id}`);
    return response;
  } catch (error) {
    console.error("Error posting product :", error);
    return error;
  }
};

// Function to search for products based on a query
export const getProducts = async (params) => {
  try {
    const response = await axios.get(
      `${BaseURL}/product/search?query=${params}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

// Function to get details about a specific product
export const getOneProduct = async (params) => {
  try {
    const response = await axios.get(`${BaseURL}/product/${params}`);
    return response;
  } catch (error) {
    return error;
  }
};

// Function to add a product to the shopping cart
export const addToCart = async (data) => {
  try {
    const response = await instance.post(`${BaseURL}/cart`, data);

    return response;
  } catch (error) {
    console.error("Error posting product to user cart :", error.message);
    return error;
  }
};

// Function to retrieve all products in the shopping cart
export const getAllCartProducts = async () => {
  try {
    const response = await instance.get(`${BaseURL}/cart`);
    return response;
  } catch (error) {
    console.log("Error getting user details", error.message);
    return error;
  }
};

// Function to update the size and quantity of a product in the shopping cart
export const updateCartProductSizeQuantity = async (id, data) => {
  try {
    const response = await instance.patch(`${BaseURL}/cart/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error posting product :", error);
    return error;
  }
};

// Function to remove a product from the shopping cart
export const removeCartProduct = async (id) => {
  try {
    const response = await instance.delete(`${BaseURL}/cart/${id}`);
    return response;
  } catch (error) {
    console.error("Error posting product :", error);
    return error;
  }
};

// Function to initiate the payment process
export const proceedToPayment = async (data) => {
  try {
    const response = await instance.post(`${BaseURL}/payment`, data);
    return response;
  } catch (error) {
    console.error("Error posting product :", error);
    return error;
  }
};

// Function to check the payment status based on payment ID
export const checkPaymentStatus = async (paymentId) => {
  try {
    const response = await instance.get(
      `${BaseURL}/payment?paymentId=${paymentId}`
    );
    return response;
  } catch (error) {
    console.log("Error getting user details", error.message);
    return error;
  }
};

// Function to place an order
export const placeOrder = async (data) => {
  try {
    const response = await instance.post(`${BaseURL}/order`, data);
    return response;
  } catch (error) {
    console.error("Error posting product :", error);
    return error;
  }
};

// Function to retrieve a list of orders
export const getOrders = async () => {
  try {
    const response = await instance.get(`${BaseURL}/order`);
    return response;
  } catch (error) {
    return error;
  }
};

// Function to update the status of an order
export const updateOrderStatus = async (id, data) => {
  try {
    const response = await instance.patch(
      `${BaseURL}/order/status/${id}/customer`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

// ---------------------------------- For Seller ------------------------------------------------------
// Function to add a new product to the system
export const getAllMerchantProducts = async (query) => {
  try {
    let response;
    if (query) {
      response = await instance.get(
        `${BaseURL}/product/merchant?search=${query}`
      );
    }
    if (!query) {
      response = await instance.get(`${BaseURL}/product/merchant`);
    }
    return response;
  } catch (error) {
    console.error("Error posting product :", error);
    return error;
  }
};
// Function to get a list of all categories
export const getCategories = async () => {
  try {
    const response = await axios.get(`${BaseURL}/category`);
    return response;
  } catch (error) {
    return error;
  }
};
// Function to add a new subcategory to a category
export const addNewSubcategory = async (id, data) => {
  try {
    const response = await axios.post(
      `${BaseURL}/category/subcategory/${id}`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};
// Function to add a new product to the system
export const addNewProduct = async (data) => {
  try {
    const response = await instance.post(`${BaseURL}/product`, data);
    return response;
  } catch (error) {
    console.error("Error posting product :", error);
    return error;
  }
};

export const removeProductImage = async (productId, image) => {
  try {
    const response = await instance.delete(
      `${BaseURL}/product/image/${productId}`,

      { data: { image: image } }
    );
    return response;
  } catch (error) {
    console.error("Error posting product :", error);
    return error;
  }
};
export const removeProduct = async (id) => {
  try {
    const response = await instance.delete(`${BaseURL}/product/${id}`);
    return response;
  } catch (error) {
    console.error("Error posting product :", error);
    return error;
  }
};
export const updateProduct = async (id, data) => {
  try {
    const response = await instance.patch(`${BaseURL}/product/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error posting product :", error);
    return error;
  }
};
export const getMerchantOrders = async () => {
  try {
    const response = await instance.get(`${BaseURL}/order/merchant`);
    return response;
  } catch (error) {
    console.error("Error posting product :", error);
    return error;
  }
};
// Function to update the status of an order
export const updateOrderStatusByMerchant = async (id, data) => {
  try {
    const response = await instance.patch(
      `${BaseURL}/order/status/${id}/merchant`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};
