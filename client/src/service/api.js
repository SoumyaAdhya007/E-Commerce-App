import axios from "axios";
import { useNavigate } from "react-router-dom";
const BaseURL = "http://localhost:8080";

export const signup = async (data) => {
  try {
    const response = await axios.post(`${BaseURL}/user/signup`, data);
    if (response.status === 200) {
      const Navigate = useNavigate();
      Navigate("/login");
    }
  } catch (error) {
    return error;
  }
};
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
export const getOneProduct = async (params) => {
  try {
    const response = await axios.get(`${BaseURL}/product/one/${params}`);
    return response;
  } catch (error) {
    return error;
  }
};
export const addNewProduct = async (data) => {
  try {
    const response = await axios.post(`${BaseURL}/product`, data);
    return response;
  } catch (error) {
    console.error("Error posting product :", error);
    return error;
  }
};

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
export const getCategories = async () => {
  try {
    const response = await axios.get(`${BaseURL}/category`);
    return response;
  } catch (error) {
    return error;
  }
};
