import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	auth: {},
	token: "",
};

const AuthSlice = createSlice({
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
			state.token = "";
		},
		saveToken: (state, action) => {
			state.token = action.payload;
		},
	},
});

export const { authSignIn, authSignOut, saveToken } = AuthSlice.actions;
export default AuthSlice.reducer;
