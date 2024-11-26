import axios from "../utils/axios.customize";

export const callFetchListBook = (query) => {
  return axios.get(`/api/v1/book?${query}`);
};

export const callDeleteBook = (id) => {
  return axios.delete(`/api/v1/book/${id}`);
};
