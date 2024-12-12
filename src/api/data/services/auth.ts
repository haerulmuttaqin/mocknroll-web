import {api, authApi} from "@/api";
import secureLocalStorage from "react-secure-storage";
import {BaseResponse} from "@/api/data/interfaces";

export const actionSignIn = async (data: SignInProps): Promise<BaseResponse> => {
    const {
        email,
        name,
        image,
        auth_method
    } = data
    try {
        const {data} = await authApi({
            method: "POST",
            url: "login",
            data: {
                email,
                name,
                image,
                auth_method
            }
        })
        if (data) {
            secureLocalStorage.setItem("is_login", true)
            secureLocalStorage.setItem("token", data?.data?.token)
            secureLocalStorage.setItem("refresh", data?.data?.refresh)
            secureLocalStorage.setItem("user", JSON.stringify(data?.data))
            return {success: true, message: "Login Successfully"}
        } else {
            secureLocalStorage.setItem("is_login", false)
            return {success: false, message: "An error occurred"}
        }
    } catch (err: any) {
        if (err.response?.data != undefined) {
            return err.response?.data
        }
        return {success: false, message: err.message}
    }
};

export const actionLogout = async (): Promise<BaseResponse> => {
    try {
        const {data} = await api({
            method: "POST",
            url: "logout",
        })
        if (data) {
            secureLocalStorage.setItem("is_login", false)
            return data
        } else {
            return {success: false, message: "An error occurred"}
        }
    } catch (err: any) {
        if (err.response?.data != undefined) {
            return err.response?.data
        }
        return {success: false, message: err.message}
    }
};