import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userImage: { myFile: "src/assets/blank-profile.png", userId: "" },
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.userImage = action.payload;
      localStorage.setItem("image", JSON.stringify(action.payload));
    },
  },
});

export const { setImage } = imageSlice.actions;

export default imageSlice.reducer;
