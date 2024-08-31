import {api} from "./axios";

export const url_endpoint = {

	// Account ===============
	accountSignUp: (body) => {
		return api.post("/account/signup", body);
	},
	accountSignIn: (body) => {
		return api.post("/account/signin", body);
	},
	checkToken: (token) => {
		return api.get(`/account/check-token/${token}`);
	},
	getAccountById: (id) => {
		return api.get(`/account/${id}`);
	},
	updateAccountById: (user_id, data) => {
		return api.put(`/account/update/${user_id}`, data);
	},
	forgotPassword: (email) => {
		return api.post(`/email/forgot-password/`, email);
	},
	resetPassword: (id, data) => {
		return api.put(`/account/reset-password/${id}`, data);
	},


	// Poetry ===============
	createPoetry: (user_id, book_id, body) => {
		return api.post(`/poetry/${user_id}/${book_id}`, body)
	},
	getAllPoetry: () => {
		return api.get('/poetry')
	},
	getAllPoetryByBookId: (book_id) => {
		return api.get(`/poetry/${book_id}`)
	},
	getPoetryById: (id) => {
		return api.get(`/poetry/${id}`)
	},
	updatePoetryById: (poetry_id, data) => {
		return api.put(`/poetry/update/${poetry_id}`, data);
	},
	deletePoetryById: (id) => {
		return api.delete(`/poetry${id}`)
	},
	deleteAllPoetryByBookId: (book_id) => {
		return api.delete(`/poetry/remove/all/${book_id}`)
	},


	// Book ===============
	createBook: (user_id, body) => {
		return api.post(`/book/${user_id}`, body)
	},
	getAllBook: () => {
		return api.get('/book')
	},
	getBookById: (id) => {
		return api.get(`/book/${id}`)
	},
	getBookByAuthorId: (id) => {
		return api.get(`/book/author/${id}`)
	},
	updateBookById: (book_id, data) => {
		return api.put(`/book/update/${book_id}`, data);
	},
};
