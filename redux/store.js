import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import likedProductsSlice from './slices/likedProductsSlice';
const store = configureStore({
  reducer: {
    cart: cartSlice,
    liked: likedProductsSlice,
  },
});

export default store;
