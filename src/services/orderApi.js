import axios from "../utils/axios.customize";

export const callPlaceOrder = (data) => {
  return axios.post("/api/v1/order", {
    ...data,
  });
};

export const callOrderHistory = () => {
  return axios.get("/api/v1/history");
};
