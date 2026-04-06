import axios from "axios";

export const getHistory = async (page: number, sort: string,userId:string) => {
  // const res = await axios.get(
  //   `http://localhost:4000/api/history?page=${page}&sort=${sort}`
  // );
  // return res.data;

  const res = await axios.get(
    `http://localhost:4000/api/history`,
    {
      params: { page, sort, userId } // ✅ send userId
    }
  );
  return res.data;
};