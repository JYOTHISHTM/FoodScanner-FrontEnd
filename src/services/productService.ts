import axiosInstance from "../api/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const fetchProduct = async (productId: string,userId: string) => {
  const res = await axiosInstance.get(API_ENDPOINTS.PRODUCT.GET(productId),{params: { userId },});
  return res.data;
};