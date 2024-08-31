// reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "./auth/authSlice";
import DataSlice from "./auth/dataSlice";

const rootReducer = combineReducers({
	Auth: AuthSlice,
	Data: DataSlice,
});

export default rootReducer;