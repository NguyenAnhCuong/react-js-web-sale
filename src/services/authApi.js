import axios from "../utils/axios.customize";

export const postRegister = (fullName, email, password, phone) => {
  return axios.post("/api/v1/user/register", {
    fullName,
    email,
    password,
    phone,
  });
};

export const postLogin = (username, password) => {
  return axios.post("/api/v1/auth/login", {
    username,
    password,
  });
};

export const fetchAccount = () => {
  return axios.get("/api/v1/auth/account");
};

export const doLogOut = () => {
  return axios.post("/api/v1/auth/logout");
};

export const callUpdateAvatar = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/file/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "avatar",
    },
  });
};

export const callUpdateUserInfo = (_id, phone, fullName, avatar) => {
  return axios.put(`/api/v1/user`, {
    _id,
    phone,
    fullName,
    avatar,
  });
};

export const callUpdatePassword = (email, oldpass, newpass) => {
  return axios.post(`/api/v1/user/change-password`, {
    email,
    oldpass,
    newpass,
  });
};

export const callFetchDashboard = () => {
  return axios.get('/api/v1/database/dashboard')
}

export const callFetchListOrder = (query) => {
  return axios.get(`/api/v1/order?${query}`)
}
