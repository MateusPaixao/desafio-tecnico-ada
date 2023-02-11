import axios from 'axios';
import { toast } from 'react-toastify';

const apiConfig = {
	baseURL: 'http://localhost:3333',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
};

const api = axios.create(apiConfig);
const apiAuth = axios.create(apiConfig);

const credentialsPayload = {
	login: 'letscode',
	senha: 'lets@123',
};

api.interceptors.request.use(
	async (config) => {
		const accessTokenKey = 'access_token';

		const accessToken = sessionStorage.getItem(accessTokenKey);

		if (accessToken) {
			config.headers['Authorization'] = accessToken;
		} else {
			const { data } = await apiAuth.post('/login', credentialsPayload);
			const token = data ? `Bearer ${data}` : '';

			sessionStorage.setItem(accessTokenKey, token);
			config.headers['Authorization'] = token;
		}

		return config;
	},
	(error) => {
		toast.error('Erro ao realizar ação, tente novamente.');
		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			const { data } = await apiAuth.post('/login', credentialsPayload);
			const token = data ? `Bearer ${data}` : '';
			const accessTokenKey = 'access_token';

			sessionStorage.setItem(accessTokenKey, token);
			originalRequest.headers.Authorization = token;
			api.defaults.headers.Authorization = token;
			return axios.request(originalRequest);
		} else if (error.response?.status === 400) {
			toast.error('Erro na requisição, verifique se preencheu tudo corretamente.');
		} else {
			toast.error('Erro no servidor, tente novamente mais tarde.');
		}
		return Promise.reject(error);
	},
);

export default api;
