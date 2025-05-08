import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import userFeedSlice from './userFeedSlice';

const store=configureStore({
    reducer:{
   user:userSlice ,
   feed:userFeedSlice,
    }
})

export default store;
