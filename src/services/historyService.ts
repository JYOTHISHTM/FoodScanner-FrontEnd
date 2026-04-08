import axiosInstance from "../api/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const getHistory = async (page: number,sort: string,userId: string) => {
  const res = await axiosInstance.get(API_ENDPOINTS.HISTORY.BASE, {params: { page, sort, userId },});
  return res.data;
};