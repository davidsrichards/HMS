import { createSlice } from "@reduxjs/toolkit";

const doctorsSlice = createSlice({
  name: "doctors",
  initialState: {
    doctors: [],
  },
  reducers: {
    addDoctorsAction: (state, action) => {
      state.doctors.push(action.payload);
    },
  },
});

export const { addDoctorsAction } = doctorsSlice.actions;
export default doctorsSlice.reducer;
