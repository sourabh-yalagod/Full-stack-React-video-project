import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/Redux/Slice/AuthSlice";
import userReducer from "@/Redux/Slice/UserSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user"], // Ensure the correct slice is listed
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const rootReducer = combineReducers({
  auth: authReducer,
  user: persistedUserReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);

export { store, persistor };
