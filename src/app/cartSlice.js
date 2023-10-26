import { createSlice } from '@reduxjs/toolkit';
import {serializeCartItems,deserializeCartItems} from './Jsonconert';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [
        ],
        count: 0,
    },
    reducers: {
        addProductToCart: (state, action) => {
            const product = action.payload;
            const existingProductIndex = state.cartItems.findIndex((item) => item.id === product.id);

            if (existingProductIndex !== -1) {
                state.cartItems[existingProductIndex].count++;
                state.count++;
            } else {
                state.cartItems.push({
                    ...product,
                    count: 1,
                });
                state.count++;
            }
        },
        removeItemFromCart: (state, action) => {
            const productId = action.payload;
            const existingProductIndex = state.cartItems.findIndex((item) => item.id === productId);
            state.count -= state.cartItems[existingProductIndex].count;
            state.cartItems = state.cartItems.filter((product) => product.id !== productId);
        },
        reduceQuantity: (state, action) => {
            const productId = action.payload;
            const existingProductIndex = state.cartItems.findIndex((item) => item.id === productId);

            if (state.cartItems[existingProductIndex].count > 1) {
                state.count--;
                state.cartItems[existingProductIndex].count--;
            }
        },
        //if the user is logged out ,his cart will be stored in localstorage and emptied
        emptyCart:(state,action)=>{
            localStorage.setItem(action.payload,serializeCartItems(state.cartItems));
            state.cartItems=[];
            state.count=0;
        },
         //if the user is logged in ,his cart will be retained from the localstorage
        setCartItems:(state,action)=>{
            const user=action.payload;
            if(localStorage.getItem(user)){
                state.cartItems=[...deserializeCartItems(localStorage.getItem(user))];
                let count=0;
                state.cartItems.forEach(item=>count +=item.count);
                state.count=count;
                
            }
        },
    },
});

export const { addProductToCart, removeItemFromCart, reduceQuantity,emptyCart,setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
