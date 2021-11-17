import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const UserReducer = createSlice({
  name: "User",
  initialState,
  reducers: {
    defaultAction: (state, { payload }) => {
      console.log("UserReducer state and payload", state, payload);
    },
  },
});

const { reducer, actions } = UserReducer;
export const { defaultAction } = actions;
export default reducer;
