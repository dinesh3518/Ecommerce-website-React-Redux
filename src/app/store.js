import { configureStore } from '@reduxjs/toolkit';
import productReducer, { addComments, setProducts } from './productSlice';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
  },
});
 //products API for landing page
fetch('https://dummyjson.com/products?limit=40&skip=10')
  .then((res) => res.json())
  .then((data) => {
    store.dispatch(setProducts(data.products));
  });

  //comment API
fetch('https://dummyjson.com/comments?limit=7&skip=50')
  .then((res) => res.json())
  .then((data) => {
    store.dispatch(addComments(data.comments));
  });

export default store;
