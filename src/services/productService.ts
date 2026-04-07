// services/productService.ts
import axios from "axios";

// export const fetchProduct = async (productId: string,userId: string) => {
//   const res = await axios.get(`http://192.168.20.5:4000/api/product/${productId}`,
//     {
//       params: { userId } // ✅ send userId
//     }
//   );
//   return res.data;
// };
export const fetchProduct = async (productId: string,userId: string) => {
  const res = await axios.get(`http://localhost:4000/api/product/${productId}`,
    {
      params: { userId } // ✅ send userId
    }
  );
  return res.data;
};