import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import Storage from "redux-persist/lib/storage";
import Reducers from "./Index";
import { thunk } from "redux-thunk";

const persistConfig = {
	key: "root",
	storage: Storage,
};

const persistReducers = persistReducer(persistConfig, Reducers);

export const store = configureStore({
	reducer: persistReducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
		  serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		  },
		}).concat(thunk),
});

export const persistor = persistStore(store);
export default store;