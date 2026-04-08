


export const API_ENDPOINTS = {
  AUTH: {
    SEND_OTP: "/auth/send-otp",
    VERIFY_OTP: "/auth/verify-otp",
    GOOGLE_LOGIN: "/auth/google",
  },
  PROFILE: {
    UPDATE: (userId: string) => `/profile/${userId}`,
  },
  FAVORITES: {
    BASE: "/favorites",
    CHECK: "/favorites/check",
  },
  HISTORY: {
  BASE: "/history",
},
PRODUCT: {
  GET: (productId: string) => `/product/${productId}`,
},
SCAN: {
  BASE: "/scan",
},
};