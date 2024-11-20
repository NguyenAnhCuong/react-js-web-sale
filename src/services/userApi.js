import axios from "../utils/axios.customize";

export const fetchListUserPaginate = (query) => {
  return axios.get(`/api/v1/user?${query}}`);
};

export const deleteAUser = (id) => {
  return axios.delete(`/api/v1/user/${id}}`);
};

export const getAvatar = (id) => {
  return axios.get(`/images/avatar/${id}`);
};
