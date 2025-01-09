import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartProducts: localStorage.getItem('cartProducts')
    ? JSON.parse(localStorage.getItem('cartProducts'))
    : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.cartProducts.find(
        (product) => product._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.qty += 1;
        console.log(JSON.stringify(existingProduct));
      } else {
        state.cartProducts.push({ ...action.payload, qty: 1 });
      }
      localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
    },
    clearCart: (state, action) => {
      state.cartProducts = [];
      localStorage.setItem('cartProducts', []);
    },
    removeFromCart: (state, action) => {
      const newProducts = state.cartProducts.filter(
        (product) => product._id !== action.payload
      );
      console.log(newProducts);
      state.cartProducts = newProducts;
      localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
    },
    incrementQty: (state, action) => {
      const existingProduct = state.cartProducts.find(
        (product) => product._id === action.payload
      );
      if (existingProduct) {
        existingProduct.qty += 1;
      }
      localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
    },
    decrementQty: (state, action) => {
      const existingProduct = state.cartProducts.find(
        (product) => product._id === action.payload
      );

      if (existingProduct && existingProduct.qty > 1) {
        existingProduct.qty -= 1;
      }

      localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQty,
  decrementQty,
} = cartSlice.actions;
export default cartSlice.reducer;
