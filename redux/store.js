import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import likedProductsSlice from './slices/likedProductsSlice';
import shoppingListSlice from './slices/shoppingListSlice';
import shoppingListSlice_2 from './slices/shoppingListSlice_2';
import shoppingListSlice_3 from './slices/shoppingListSlice_3';
import shoppingListSlice_4 from './slices/shoppingListSlice_4';
import shoppingListSlice_5 from './slices/shoppingListSlice_5';

const store = configureStore({
  reducer: {
    cart: cartSlice,
    liked: likedProductsSlice,
    shopping_list: shoppingListSlice,
    shopping_list_2: shoppingListSlice_2,
    shopping_list_3: shoppingListSlice_3,
    shopping_list_4: shoppingListSlice_4,
    shopping_list_5: shoppingListSlice_5,
  },
});

export default store;
