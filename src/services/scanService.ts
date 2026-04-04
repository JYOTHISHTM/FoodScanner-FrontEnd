import axios from "axios";

export const getScans = async (page: number, sort: string) => {
  const res = await axios.get(
    `http://localhost:4000/api/scans?page=${page}&sort=${sort}`
  );
  return res.data;
};