import axios from "axios";

export const getFavorites = (page: number, sort: string, search: string, userId: string) =>
  axios.get(`http://localhost:4000/api/favorites?page=${page}&sort=${sort}&search=${search}&userId=${userId}`);

export const toggleFavorite = (userId: string, productId : string) =>
  axios.post("http://localhost:4000/api/favorites", { userId, productId  });

export const checkFavorite = (userId: string, productId: string) =>
  axios.get(`http://localhost:4000/api/favorites/check?userId=${userId}&productId=${productId}`);