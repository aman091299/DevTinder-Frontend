import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import userFeedSlice from './userFeedSlice';
console.log("inside store");
const store=configureStore({
    reducer:{
   user:userSlice ,
   feed:userFeedSlice,
    }
})

export default store;
