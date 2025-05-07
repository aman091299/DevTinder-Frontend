import { createSlice } from "@reduxjs/toolkit";
console.log("inside user slcie")
const userSlice=createSlice({
    name:"user",
    initialState:null,
    reducers:{
        addUser(state,action){
          localStorage.setItem('user',JSON.stringify(action.payload));
          return action.payload;
        },
        removeUser(state,action){
           return null;
        },
   
    }
})

export const {addUser,removeUser}=userSlice.actions;
export default userSlice.reducer;