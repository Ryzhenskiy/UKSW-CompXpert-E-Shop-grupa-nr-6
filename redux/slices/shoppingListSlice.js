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

    clearShoppingList: (state, action) => {
      state.shoppingListProducts = [];
      localStorage.setItem('listProducts', []);
    },

    removeFromShoppingList: (state, action) => {
      const newProducts = state.shoppingListProducts.filter(
        (product) => product._id !== action.payload
      );
      console.log(newProducts);
      state.shoppingListProducts = newProducts;
      localStorage.setItem('listProducts', JSON.stringify(state.shoppingListProducts));
    },

    incrementQty: (state, action) => {
      const existingProduct = state.shoppingListProducts.find(
        (product) => product._id === action.payload
      );
      if (existingProduct) {
        existingProduct.qty += 1;
      }
      localStorage.setItem('listProducts', JSON.stringify(state.shoppingListProducts));
    },

    decrementQty: (state, action) => {
      const existingProduct = state.shoppingListProducts.find(
        (product) => product._id === action.payload
      );

      if (existingProduct && existingProduct.qty > 1) {
        existingProduct.qty -= 1;
      }

      localStorage.setItem('listProducts', JSON.stringify(state.shoppingListProducts));
    },
  },
});

export const {
  addToShoppingList,
  removeFromShoppingList,
  clearShoppingList,
  incrementQty,
  decrementQty,
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;