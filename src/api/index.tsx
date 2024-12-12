import axios from 'axios';
import secureLocalStorage from "react-secure-storage";
import {signOut} from "next-auth/react";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})
export const localApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_PAGE_URL + "api/",
})
export const authApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use(
    (config: any) => {
        config.headers["Authorization"] = `Bearer ${secureLocalStorage.getItem('token')}`
        config.headers["x-application-id"] = `${process.env.APP_ID || "6lqvkg65stvk4e068l636l17pkatcj72"}`
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
            signOut().then(() => {
                secureLocalStorage.setItem("is_login", false)
                window.location.href = window.location.protocol + "//" + window.location.host + "/auth/expired"
            })
        }
        return Promise.reject(err);
    },
);

authApi.interceptors.request.use(
    (config: any) => {
        config.headers["x-application-id"] = `${process.env.APP_ID || "6lqvkg65stvk4e068l636l17pkatcj72"}`
        return config;
    },
    (err) => {
        return Promise.reject(err)
    }
);