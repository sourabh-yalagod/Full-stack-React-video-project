import { configureStore } from "@reduxjs/toolkit";
import signInReducer from "./Slice/SignIn"
import { createNewAccount } from "./Slice/SignUp";
export const store = configureStore({
    reducer:{
        signin:signInReducer,
        signup:createNewAccount
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;