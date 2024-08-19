import api from "./Axios";

export const url_endpoint = {

	accountSignIn: (body) => {
		return api.post("base/login", body);
	},

};
