import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipe: {},
  id: -1,
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipe: (state, action) => {
      state.recipe = action.payload;
      localStorage.setItem("recipe", JSON.stringify(action.payload));
    },
    setId: (state, action) => {
      state.id = action.payload;
      localStorage.setItem("id", JSON.stringify(action.payload));
    },
  },
});

export const { setRecipe, setId } = recipeSlice.actions;

export default recipeSlice.reducer;
