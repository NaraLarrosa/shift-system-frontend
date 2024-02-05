import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../user/userSlice";
import specialtyReducer from "../specialty/specialtySlice";
import doctorReducer from "../doctor/doctorSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    specialty: specialtyReducer,
    doctor: doctorReducer
  },
});