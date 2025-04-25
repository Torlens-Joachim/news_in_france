"use client";
import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import bookmarks from "@/reducers/bookmarks";
import user from "@/reducers/user";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

// configuration de Redux Persist
const reducers = combineReducers({ bookmarks, user });
const persistConfig = { key: "news-in-france-77754FFSSQ", storage };

// création du store Redux
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// création du persistor
const persistor = persistStore(store);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}
