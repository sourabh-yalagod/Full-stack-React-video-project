import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "@/Redux/Slice/AuthSlice"; // Adjust the path as necessary
import userReducer from "@/Redux/Slice/UserSlice"; // Adjust the path as necessary

const store = configureStore({
  reducer: {
    auth: registerReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook to use dispatch with the correct type
import { useDispatch as useDispatchBase } from "react-redux";
export const useAppDispatch: () => AppDispatch = useDispatchBase;

export default store;
