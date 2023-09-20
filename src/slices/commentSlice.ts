import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setComment: (state, action) => {
      state.comments = action.payload;
      localStorage.setItem("comment", JSON.stringify(action.payload));
    },
  },
});

export const { setComment } = commentSlice.actions;

export default commentSlice.reducer;
