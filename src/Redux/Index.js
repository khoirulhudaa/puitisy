// reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/AuthSlice";
import DataSlice from "./auth/DataSlice";

const rootReducer = combineReducers({
	Auth: authSlice,
	Data: DataSlice,
});

export default rootReducer;