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
    removeFromLiked: (state, action) => {
      const newProducts = state.likedProducts.filter(
        (product) => product._id !== action.payload
      );
      console.log(newProducts);
      state.likedProducts = newProducts;
      localStorage.setItem('likedProducts', JSON.stringify(state.likedProducts));
    },
  },
});
export const { addToLiked, removeFromLiked } = likedProductsSlice.actions;
export default likedProductsSlice.reducer;
