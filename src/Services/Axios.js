import axios from "axios";
import { API_URL } from "./URL.js";

const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (error.response.message === "Unauthenticated.") {
			window.location.pathname = "/login";
		} else if (error.response.status === 400) {
			console.log("Error: ", error?.response);
		}

		return Promise.reject(error);
	}
);

api.interceptors.request.use(
	async function (config) {
		if (config.data instanceof FormData) {
			config.headers["Content-Type"] = "multipart/form-data";
		}

		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);


export default api;