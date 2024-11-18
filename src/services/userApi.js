import axios from "../utils/axios.customize";

export const fetchListUserPaginate = (page, limit) => {
  return axios.get(`/api/v1/user?current=${page}&pageSize=${limit}`);
};
