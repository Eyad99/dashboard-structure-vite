import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { KEY_TOKEN_COOKIE } from '@/variables/constants';
import Cookies from 'js-cookie';
 
const baseURL = 'BASE_URL';
export interface ApiResponse<T = any> {
	data: T;
	statusCode: number;
	message: string;
	meta: { currentPage: number; itemsPerPage: number; totalItems: number; totalPages: number; sortBy: [] } | null;
	link: { current: string };
}

const api: AxiosInstance = axios.create({
	baseURL,
	timeout: 180000,
	headers: {
		Accept: 'application/json',
	},
});

api.interceptors.request.use(
	(config: any) => {
		config.headers['Authorization'] = `Bearer ${Cookies.get(KEY_TOKEN_COOKIE)}`;

		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response: AxiosResponse<ApiResponse>) => response,
	(error) => {
		if (error.response) {
			if (error.response.statusCode === 401) {
				window.location.href = '/auth/sign-in';
			} else {
				// Handle other response errors

				console.error('Error: elseee', error.message);
			}
		} else if (error.request) {
			// Handle request error
			console.error('Request error:', error.request);
		} else {
			// Handle other errors
			console.error('Error:', error.message);
		}

		return Promise.reject(error?.response?.data);
	}
);

export const { get, post, put, delete: destroy, patch } = api;
