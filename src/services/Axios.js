import axios from "axios";
import { API_URL } from "./URL";
import store from "../redux/Store";

export const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
	async function (config) {
		const token = store.getState().Auth.token;

		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}

		if (config.data instanceof FormData) {
			config.headers["Content-Type"] = "multipart/form-data";
		}

		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (error.response.message === "Unauthenticated.") {
			window.location.pathname = "/";
		} else if (error.response.status === 400) {
			console.log("Error: ", error?.response);
		}

		return Promise.reject(error);
	}
);