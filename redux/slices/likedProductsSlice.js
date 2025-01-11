import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likedProducts: localStorage.getItem('likedProducts')
    ? JSON.parse(localStorage.getItem('likedProducts'))
    : [],
};

const likedProductsSlice = createSlice({
  name: 'liked',
  initialState,
  reducers: {
    addToLiked: (state, action) => {
      const existingProduct = state.likedProducts.find(
        (product) => product._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.qty += 1;
        console.log(JSON.stringify(existingProduct));
      } else {
        state.likedProducts.push({ ...action.payload, qty: 1 });
      }
      //state.likedProducts.push({ ...action.payload });

      localStorage.setItem('likedProducts', JSON.stringify(state.likedProducts));
    },
    clearLiked: (state, action) => {
      state.likedProducts = [];
      localStorage.setItem('likedProducts', []);
    },
    removeFromLiked: (state, action) => {
      const newProducts = state.likedProducts.filter(
        (product) => product._id !== action.payload
      );
      console.log(newProducts);
      state.likedProducts = newProducts;
      localStorage.setItem('likedProducts', JSON.stringify(state.likedProducts));
    },
    incrementQty: (state, action) => {
      const existingProduct = state.likedProducts.find(
        (product) => product._id === action.payload
      );
      if (existingProduct) {
        existingProduct.qty += 1;
      }
      localStorage.setItem('likedProducts', JSON.stringify(state.likedProducts));
    },
    decrementQty: (state, action) => {
      const existingProduct = state.likedProducts.find(
        (product) => product._id === action.payload
      );

      if (existingProduct && existingProduct.qty > 1) {
        existingProduct.qty -= 1;
      }

      localStorage.setItem('likedProducts', JSON.stringify(state.likedProducts));
    },
  },
});

//export const { addToLiked, removeFromLiked } = likedProductsSlice.actions;
export const {
  addToLiked,
  removeFromLiked,
  clearLiked,
  incrementQty,
  decrementQty,
} = likedProductsSlice.actions;

export default likedProductsSlice.reducer;
