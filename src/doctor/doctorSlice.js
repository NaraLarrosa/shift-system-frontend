import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  "name": null,
  "surname": null,
  "dni": null,
  "specialty": null
};

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    updateDoctors: (state, action) => {
      state.doctors = action.payload;
    },
  },
});

export const { updateDoctors } = doctorSlice.actions;
export default doctorSlice.reducer;