import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../store/appointment/appSlice';
import userReducer from '../store/user/authSlice';


export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    user: userReducer,
    appointment: appReducer
  },
});
