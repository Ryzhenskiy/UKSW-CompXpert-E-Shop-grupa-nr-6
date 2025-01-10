import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shoppingListProducts: localStorage.getItem('listProducts')
    ? JSON.parse(localStorage.getItem('listProducts'))
    : [],
};

const shoppingListSlice = createSlice({
  name: 'shopping_list',
  initialState,
  reducers: {
    addToShoppingList: (state, action) => {
      state.shoppingListProducts.push({ ...action.payload });

      localStorage.setItem('listProducts', JSON.stringify(state.shoppingListProducts));
    },
    removeFromShoppingList: (state, action) => {
      const newProducts = state.shoppingListProducts.filter(
        (product) => product._id !== action.payload
      );
      console.log(newProducts);
      state.shoppingListProducts = newProducts;
      localStorage.setItem('listProducts', JSON.stringify(state.shoppingListProducts));
    },
  },
});
export const { addToShoppingList, removeFromShoppingList } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
