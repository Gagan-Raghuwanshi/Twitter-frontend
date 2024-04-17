import { createSlice } from "@reduxjs/toolkit";
const tweeSlice = createSlice({
    name:"tweet",
    initialState:{
        tweets:null,
        refresh:false,
        isActive:true
    },
    reducers:{
        getAllTweets:(state,action)=>{
            state.tweets = action.payload;
        },
        getrefresh:(state)=>{
            state.refresh = !state.refresh
        },
        getIsActive:(state,action)=>{
            state.isActive = action.payload
        }
    }
});

export const {getAllTweets,getrefresh,getIsActive} = tweeSlice.actions;
export default tweeSlice.reducer;