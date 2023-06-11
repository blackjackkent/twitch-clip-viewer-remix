/* eslint-disable no-underscore-dangle */
import type { AxiosInstance } from "axios";
import axios from "axios";
import qs from "qs";

let axiosApiInstance: AxiosInstance | undefined;

const getAxiosInstance = async () => {
	if (!axiosApiInstance) {
		axiosApiInstance = axios.create();
		await init();
	}
	return axiosApiInstance;
};

let accessToken: string | null = null;
const clientId = process.env.TWITCH_CLIENT_ID;
const clientSecret = process.env.TWITCH_CLIENT_SECRET;

export const logAxiosError = (e: any) => {
	if (!axios.isAxiosError(e)) {
		console.error({
			code: e.code,
			url: e?.response?.config.url,
			data: e?.response?.data,
		});
		console.trace();
	} else {
		console.error(e);
	}
};

const refreshAccessToken = async () => {
	const params = qs.stringify({
		client_id: clientId,
		client_secret: clientSecret,
		grant_type: "client_credentials",
	});
	try {
		const response = await axios.post(
			"https://id.twitch.tv/oauth2/token",
			params
		);
		accessToken = response.data.access_token;
	} catch (e) {
		logAxiosError(e);
	}
};

const init = async () => {
	await refreshAccessToken();

	axiosApiInstance?.interceptors.request.use(
		async (config) => {
			// eslint-disable-next-line no-param-reassign
			config.headers.Authorization = `Bearer ${accessToken}`;
			config.headers.Accept = "application/json";
			config.headers["Content-Type"] = "application/x-www-form-urlencoded";
			config.headers.set("Client-Id", clientId);
			return config;
		},
		(error) => {
			Promise.reject(error);
		}
	);

	// Response interceptor for API calls
	axiosApiInstance?.interceptors.response.use(
		(response) => response,
		async (error) => {
			if (!axiosApiInstance) {
				return Promise.reject("Missing axios instance.");
			}
			logAxiosError(error);
			const originalRequest = error.config;
			if (error.response.status === 403 && !originalRequest._retry) {
				originalRequest._retry = true;
				await refreshAccessToken();
				axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
				return axiosApiInstance(originalRequest);
			}
			return Promise.reject(error);
		}
	);
};
export default getAxiosInstance;
