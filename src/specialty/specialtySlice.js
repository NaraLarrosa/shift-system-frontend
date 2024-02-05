import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  "id": null,
  "name": null
}

export const specialtySlice = createSlice({
  name: "specialty",
  initialState,
  reducers: {
    updateSpecialties: (state, action) => {
      state.specialties = action.payload;
    },
  },
});

export const { updateSpecialties } = specialtySlice.actions;
export default specialtySlice.reducer;