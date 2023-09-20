import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.ts";
import { apiSlice } from "./slices/apiSlice.ts";
import recipeReducer from "./slices/currentRecipeSlice.ts";
import recipesReducer from "./slices/currentRecipesSlice.ts";
import imageReducer from "./slices/userProfileImageSlice.ts";
import commentSlice from "./slices/commentSlice.ts";
import shoppingListReducer from "./slices/shoppingListSlice.ts";

const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    auth: authReducer,
    shoppingList: shoppingListReducer,
    recipes: recipesReducer,
    image: imageReducer,
    comment: commentSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
