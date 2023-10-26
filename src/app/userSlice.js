import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: [],
    },
    reducers: {
        login(state, action) {
            state.user.push(action.payload);
        },
        logout(state, action) {
            const existingUserIndex = state.user.findIndex((item) => item.token === action.payload);
            if (existingUserIndex >= 0){
                state.user = [];
            }
                
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
