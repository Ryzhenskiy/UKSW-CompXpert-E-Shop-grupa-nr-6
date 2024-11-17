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
      state.likedProducts.push({ ...action.payload });

      localStorage.setItem('cartProducts', JSON.stringify(state.likedProducts));
    },
    removeFromLiked: (state, action) => {
      const newProducts = state.likedProducts.filter(
        (product) => product._id !== action.payload
      );
      console.log(newProducts);
      state.likedProducts = newProducts;
      localStorage.setItem('cartProducts', JSON.stringify(state.likedProducts));
    },
  },
});
export const { addToLiked, removeFromLiked } = likedProductsSlice.actions;
export default likedProductsSlice.reducer;
