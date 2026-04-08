import axiosInstance from "../api/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";


export const updateProfile = async (userId: string, data: any) => {
 const res = await axiosInstance.put(API_ENDPOINTS.PROFILE.UPDATE(userId),data);
  return res.data;
};