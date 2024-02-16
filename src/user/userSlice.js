import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null
  // userId: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { token, userId, type } = action.payload;
      state.token = token;
      state.userId = userId;
      // state.type = type;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;