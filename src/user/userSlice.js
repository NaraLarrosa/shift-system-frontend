import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { token, userId } = action.payload;
      state.token = token;
      state.userId = userId;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;