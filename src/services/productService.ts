// services/productService.ts
import axios from "axios";

export const fetchProduct = async (barcode: string) => {
  const res = await axios.get(`http://localhost:4000/api/product/${barcode}`);
  return res.data;
};