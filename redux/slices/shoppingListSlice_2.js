import { createSlice } from '@reduxjs/toolkit';

const name_list = 'listProducts_2';

const initialState = {
  shoppingListProducts: localStorage.getItem(name_list)
    ? JSON.parse(localStorage.getItem(name_list))
    : [],
};

const shoppingListSlice = createSlice({
  name: 'shopping_list_2',
  initialState,
  reducers: {
    addToShoppingList: (state, action) => {
      const existingProduct = state.shoppingListProducts.find(
        (product) => product._id === action.payload._id
      );
      
      if (existingProduct) {
        existingProduct.qty += 1;
        console.log(JSON.stringify(existingProduct));
      } else {
        state.shoppingListProducts.push({ ...action.payload, qty: 1 });
      }

      localStorage.setItem(name_list, JSON.stringify(state.shoppingListProducts));
    },

    clearShoppingList: (state, action) => {
      state.shoppingListProducts = [];
      localStorage.setItem(name_list, []);
    },

    removeFromShoppingList: (state, action) => {
      const newProducts = state.shoppingListProducts.filter(
        (product) => product._id !== action.payload
      );
      console.log(newProducts);
      state.shoppingListProducts = newProducts;
      localStorage.setItem(name_list, JSON.stringify(state.shoppingListProducts));
    },

    incrementQty: (state, action) => {
      const existingProduct = state.shoppingListProducts.find(
        (product) => product._id === action.payload
      );
      if (existingProduct) {
        existingProduct.qty += 1;
      }
      localStorage.setItem(name_list, JSON.stringify(state.shoppingListProducts));
    },

    decrementQty: (state, action) => {
      const existingProduct = state.shoppingListProducts.find(
        (product) => product._id === action.payload
      );

      if (existingProduct && existingProduct.qty > 1) {
        existingProduct.qty -= 1;
      }

      localStorage.setItem(name_list, JSON.stringify(state.shoppingListProducts));
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