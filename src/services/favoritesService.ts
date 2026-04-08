
import axiosInstance from "../api/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const getFavorites = async (page: number,sort: string,search: string,userId: string) => {
  const res = await axiosInstance.get(API_ENDPOINTS.FAVORITES.BASE, {params: { page, sort, search, userId },});
  return res.data;
};

export const toggleFavorite = async (userId: string,productId: string) => {
  const res = await axiosInstance.post(API_ENDPOINTS.FAVORITES.BASE, {userId,productId,});
  return res.data;
};

export const checkFavorite = async (userId: string,productId: string) => {
  const res = await axiosInstance.get(API_ENDPOINTS.FAVORITES.CHECK, {params: { userId, productId },});
  return res.data;
};