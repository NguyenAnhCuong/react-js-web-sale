import axios from "../utils/axios.customize";

export const fetchListUserPaginate = (query) => {
  return axios.get(`/api/v1/user?${query}}`);
};

export const deleteAUser = (id) => {
  return axios.delete(`/api/v1/user/${id}`);
};

export const getAvatar = (id) => {
  return axios.get(`/images/avatar/${id}`);
};

export const createUser = (fullName, password, email, phone) => {
  return axios.post(`/api/v1/user`, { fullName, password, email, phone });
};

export const createArrayUser = (data) => {
  return axios.post(`/api/v1/user/bulk-create`, data);
};

export const updateUser = (_id, fullName, phone) => {
  return axios.put(`/api/v1/user`, { _id, fullName, phone });
};
