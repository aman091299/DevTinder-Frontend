const { createSlice } = require("@reduxjs/toolkit");

const userFeedSlice=createSlice({
    name:"feed",
    initialState:[],
    reducers:{
        addFeed:(state,action)=>{
            return action.payload;;
        },
        removeFeed:(state,action)=>{
            return [];
        }
    }

})

export const { removeFeed,addFeed}=userFeedSlice.actions;

export default userFeedSlice.reducer;