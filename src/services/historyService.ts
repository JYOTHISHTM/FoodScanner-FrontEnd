import axios from "axios";

export const getHistory = async (page: number, sort: string) => {
  const res = await axios.get(
    `http://localhost:4000/api/history?page=${page}&sort=${sort}`
  );
  return res.data;
};