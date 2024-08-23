import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	book: {},
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
	},
});

export const { getBookDetail } = dataSlice.actions;
export default dataSlice.reducer;
