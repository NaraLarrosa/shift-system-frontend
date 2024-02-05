import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  "day": null,
  "hour": null,
  "description": null,
  "available": null,
  "doctor": null,
  "canceled": null,
  "user": null
};

export const shiftSlice = createSlice({
  name: "shift",
  initialState,
  reducers: {
    updateShifts: (state, action) => {
      state.shifts = action.payload;
    },
  },
});

export const { updateShift } = shiftSlice.actions;
export default shiftSlice.reducer;