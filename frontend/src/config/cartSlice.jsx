import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const item=action.payload;

          const existing= state.item.find(i=>i._id===item._id);
          if(existing){
            
          }
        }
    }
})