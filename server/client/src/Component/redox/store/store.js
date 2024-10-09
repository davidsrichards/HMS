import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AdminSlice from "../features/AdminSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import DoctorsSlice from "../features/DoctorsSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

//

const rootReducers = combineReducers({
  admin: AdminSlice,
  doctor: DoctorsSlice,
});

//

const persistedReducer = persistReducer(persistConfig, rootReducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getMiddleware) =>
    getMiddleware({
      serializableCheck: false,
    }),
});
