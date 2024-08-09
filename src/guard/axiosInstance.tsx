import axios from 'axios';
import { message } from 'antd';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            message.error('Token is invalid or expired');
            localStorage.removeItem('access_token');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
