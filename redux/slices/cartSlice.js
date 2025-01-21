import { createSlice } from '@reduxjs/toolkit';

const getInitialCartProducts = () => {
  if (typeof localStorage !== 'undefined') {
    const savedCartProducts = localStorage.getItem('cartProducts');
    return savedCartProducts ? JSON.parse(savedCartProducts) : [];
  }
  return [];
};

const initialState = {
  cartProducts: getInitialCartProducts(),
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
      } else {
        state.cartProducts.push({ ...action.payload, qty: 1 });
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(
          'cartProducts',
          JSON.stringify(state.cartProducts)
        );
      }
    },
    clearCart: (state) => {
      state.cartProducts = [];
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('cartProducts', JSON.stringify([]));
      }
    },
    removeFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product._id !== action.payload
      );
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(
          'cartProducts',
          JSON.stringify(state.cartProducts)
        );
      }
    },
    incrementQty: (state, action) => {
      const existingProduct = state.cartProducts.find(
        (product) => product._id === action.payload
      );
      if (existingProduct) {
        existingProduct.qty += 1;
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(
          'cartProducts',
          JSON.stringify(state.cartProducts)
        );
      }
    },
    decrementQty: (state, action) => {
      const existingProduct = state.cartProducts.find(
        (product) => product._id === action.payload
      );

      if (existingProduct && existingProduct.qty > 1) {
        existingProduct.qty -= 1;
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(
          'cartProducts',
          JSON.stringify(state.cartProducts)
        );
      }
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
