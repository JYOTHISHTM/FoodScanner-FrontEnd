import axios from "axios";

export const scanProduct = async (barcode: string, userId: string) => {
  const res = await axios.post("http://localhost:4000/api/scan", {
    barcode,
    userId,
  });

  return res.data;
};