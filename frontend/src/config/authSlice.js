import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:null
    },
    reducers:{
        AddUser:(state,action)=>{
            state.user=action.payload;
        }
    }
})
export const { AddUser } = authSlice.actions;
export default authSlice.reducer;