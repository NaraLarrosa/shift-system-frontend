import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../user/userSlice";
import specialtyReducer from "../specialty/specialtySlice";
import doctorReducer from "../doctor/doctorSlice";
import shiftReducer from "../shift/shiftSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    specialty: specialtyReducer,
    doctor: doctorReducer,
    shift: shiftReducer
  },
});