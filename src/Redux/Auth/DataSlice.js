import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	book: {},
	poetry: {},
};

const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		getBookDetail: (state, action) => {
			state.book = {
				...state.book,
				...action.payload,
			};
		},
		getPoetryDetail: (state, action) => {
			state.poetry = {
				...state.poetry,
				...action.payload,
			};
		},
	},
});

export const { getBookDetail, getPoetryDetail } = dataSlice.actions;
export default dataSlice.reducer;
