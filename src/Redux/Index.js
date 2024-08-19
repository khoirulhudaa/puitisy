// reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./Auth/AuthSlice";

const rootReducer = combineReducers({
	Auth: authSlice,
});

export default rootReducer;