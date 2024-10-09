import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    username: "",
    showbar: false,
  },
  reducers: {
    addAdminUsernameAction: (state, action) => {
      state.username = action.payload;
    },
    handleShowBarAction: (state, action) => {
      state.showbar = action.payload;
    },
  },
});

export const { addAdminUsernameAction, handleShowBarAction } =
  adminSlice.actions;
export default adminSlice.reducer;
