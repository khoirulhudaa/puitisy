import axios from "axios";
import { API_URL } from "./url";
import store from "../redux/store";

export const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
	async function (config) {
		const token = store.getState().Auth.token;
		console.log('token:', token)
		if (token) {
			config.headers["Authorization"] = `${token}`;
		}

		if (config.data instanceof FormData) {
			config.headers["Content-Type"] = "multipart/form-data";
		}

		return config;
	},
	function (error) {
		return Promise.reject('error:', error);
	}
);

api.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (error.response.data.message === "Unauthenticated.") {
			window.location.pathname = "/login";
		} else if (error.response.message === `You don't have access permissions.` || error.response.status === 403) {
			console.log("Error: ", error?.response);
			window.location.pathname = "/login";
		}

		return Promise.reject('erro:', error);
	}
);