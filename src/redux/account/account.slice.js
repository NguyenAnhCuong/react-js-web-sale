import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: "",
  },
};

export const accountSlice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    doLogin: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    doGetAccount: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {},
});

export const { doLogin, doGetAccount } = accountSlice.actions;

export default accountSlice.reducer;
