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
        },
        removeFeedUser(state,action){
            const newArray=state.filter(r=>{
                 return r._id !== action.payload;
            })
            return newArray;
          }
    }

})

export const { removeFeed,addFeed, removeFeedUser}=userFeedSlice.actions;

export default userFeedSlice.reducer;