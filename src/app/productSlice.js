import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        searchResults: [],
        comments:[],
    },
    reducers: {

        setProducts(state, action) {
            state.products = action.payload;
        },

       
        addComments(state, action) {
            state.comments=[...state.comments,...action.payload];
        },
         // Search products
        categoryProducts(state, action) {
            state.searchResults =[...action.payload];
        },
        filterProducts(state, action) {
            const sortby=action.payload;

            if (sortby === 'highToLow') {
                 state.searchResults =  state.searchResults.sort((a, b) => b.price - a.price);
              } else {
                state.searchResults =  state.searchResults.sort((a, b) => a.price - b.price);
              }
        },
    },
});

export const { setProducts, addComments, categoryProducts,filterProducts } = productSlice.actions;
export default productSlice.reducer;