import {api} from "./Axios";

export const url_endpoint = {

	// Account
	accountSignUp: (body) => {
		return api.post("/account/signup", body);
	},
	accountSignIn: (body) => {
		return api.post("/account/signin", body);
	},
	getAccountById: (id) => {
		return api.get(`/account/${id}`);
	},
	updateAccountById: (user_id, data) => {
		console.log(user_id)
		return api.post(`/account/update/${user_id}`, data);
	},


	// Poetry
	getAllPoetry: () => {
		return api.get('/poetry')
	}
};
