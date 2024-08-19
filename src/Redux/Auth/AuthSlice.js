import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	auth: {},
	token: "",
	email: "",
	password: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		authSignIn: (state, action) => {
			state.auth = {
				...state.auth,
				...action.payload,
			};
		},
		authSignOut: (state) => {
			state.auth = {};
		},
		authSignOutToken: (state) => {
			state.token = "";
		},
		saveToken: (state, action) => {
			state.token = action.payload;
		},
	},
});

export const { authSignIn, authSignOut, authSignOutToken, saveToken } = authSlice.actions;
export default authSlice.reducer;
