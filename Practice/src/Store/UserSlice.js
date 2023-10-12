import { createSlice } from "@reduxjs/toolkit";

const UserSlice =createSlice({
    name: 'User',
    initialState: {userData: null, status: false},

    reducers: {
        SignIn: (state, action)=>{
        state.status = true;
        state.userData = action.payload.userData
        },
        Signout: (state, action)=>{
            state.status = false;
            state.userData = null
        }
    }

})

export const {SignIn, Signout} = UserSlice.actions

export default UserSlice.reducer