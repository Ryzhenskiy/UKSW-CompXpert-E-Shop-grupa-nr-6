import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import likedProductsSlice from './slices/likedProductsSlice';
import shoppingListSlice from './slices/shoppingListSlice';
const store = configureStore({
  reducer: {
    cart: cartSlice,
    liked: likedProductsSlice,
    shopping_list: shoppingListSlice,
  },
});

export default store;
