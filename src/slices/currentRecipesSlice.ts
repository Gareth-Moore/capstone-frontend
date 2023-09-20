import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: {},
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
      localStorage.setItem("recipes", JSON.stringify(action.payload));
    },
  },
});

export const { setRecipes } = recipesSlice.actions;

export default recipesSlice.reducer;
