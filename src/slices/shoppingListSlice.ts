import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shoppingList: {},
};

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    setShoppingList: (state, action) => {
      state.shoppingList = action.payload;
      localStorage.setItem("shoppingList", JSON.stringify(action.payload));
    },
  },
});

export const { setShoppingList } = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
