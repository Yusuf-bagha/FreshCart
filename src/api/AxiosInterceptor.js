import axios from "axios";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";


const apiClient = axios.create({
    baseURL: `https://ecommerce.routemisr.com/api`,
    headers: {
        "Content-Type": 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.token = token;
        }
        return config
    },

    (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401 && localStorage.getItem("token")) {
            useAuthStore().signOut();
            router.push("/login");
        }
        return Promise.reject(error);
    },
);

export default apiClient;