

import axiosInstance from "../api/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const sendOtp = async (email: string) => {
  const res = await axiosInstance.post(API_ENDPOINTS.AUTH.SEND_OTP,{ email });
  return res.data;
};

export const verifyOtp = async (email: string, otp: string) => {
  const res = await axiosInstance.post(API_ENDPOINTS.AUTH.VERIFY_OTP,{ email, otp });
  return res.data;
};

export const googleLogin = async (token: string) => {
  const res = await axiosInstance.post(API_ENDPOINTS.AUTH.GOOGLE_LOGIN,{ token });
  return res.data;
};