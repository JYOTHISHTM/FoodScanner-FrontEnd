import axiosInstance from "../api/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const adminLoginService = async (email: string, password: string) => {
  const res = await axiosInstance.post(API_ENDPOINTS.ADMIN.LOGIN, { email, password });
  return res.data;
};

export const fetchUsersService = async () => {
  const res = await axiosInstance.get(API_ENDPOINTS.ADMIN.USERS, {
    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
  });
  return res.data;
};

export const toggleBlockService = async (userId: string) => {
  const res = await axiosInstance.patch(API_ENDPOINTS.ADMIN.TOGGLE_BLOCK(userId), {}, {
    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
  });
  return res.data;
};