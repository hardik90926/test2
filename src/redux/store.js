import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import rootReducer from "./reducers";

const encryptor = encryptTransform({
  secretKey: "Re@ctAdm!nP@nel",
  onError(error) {
    console.log(error);
    localStorage.clear();
    window.location.replace("/login");
  },
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  transforms: [encryptor],
};

const persistedReducer = persistReducer({ ...persistConfig }, rootReducer);

export default configureStore({
  reducer: persistedReducer,
});
