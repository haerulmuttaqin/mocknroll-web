import axios from 'axios';
import secureLocalStorage from "react-secure-storage";
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})
export const localApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_PAGE_URL + "api/",
})
api.interceptors.request.use(
    (config: any) => {
        config.headers["Authorization"] = `Bearer ${secureLocalStorage.getItem('token')}`
        config.headers["company_id"] = secureLocalStorage.getItem('company_id')
        return config;
    },
    (err) => {
        return Promise.reject(err)
    }
);
api.interceptors.response.use(
    (response) => response,
    async (err) => {
        if (err.response.status === 401 && secureLocalStorage.getItem("is_login")) {
            secureLocalStorage.setItem("is_login", false)
            window.location.href = window.location.protocol + "//" + window.location.host + "/auth"
        }
        return Promise.reject(err);
    },
);

export const authApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})