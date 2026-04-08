import axiosInstance from "../api/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const scanProduct = async (barcode: string,userId: string) => {
  const res = await axiosInstance.post(API_ENDPOINTS.SCAN.BASE,{barcode,userId,});
  return res.data;
};