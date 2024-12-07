import {api} from "@/api";
import {BaseResponse} from "../interfaces";
import {BillingConfigPayloadProps, BillingPayloadProps} from "../interfaces/project";

export const getBillingDevices = async (payload: BillingPayloadProps): Promise<BaseResponse> => {
    try {
        const {data} = await api({
            method: "GET",
            url: "billing-data",
            headers: {
                "Content-Type": "application/json",
            },
            params: payload
        })
        if (data) {
            return data
        } else {
            return {success: false, message: "An error occurred"}
        }
    } catch (err: any) {
        if (err.response?.data != undefined) {
            return err.response?.data
        } else if (err.response?.errors != undefined) {
            return err.response?.errors
        }
        return {success: false, message: err.message}
    }
};


export const getBillingConfigs = async (): Promise<BaseResponse> => {
    return await api({
        method: 'GET',
        url: "billing-config",
    });
};

export const getBillingConfig = async (alarmconf_id: number): Promise<BaseResponse> => {
    return await api({
        method: 'GET',
        url: `billing-config/${alarmconf_id}`,
    });
};

export const addBillingConfig = async (payload: BillingConfigPayloadProps): Promise<BaseResponse> => {
    try {
        const {data} = await api({
            method: "POST",
            url: "billing-config",
            data: payload
        })
        if (data) {
            return data
        } else {
            return {success: false, message: "An error occurred"}
        }
    } catch (err: any) {
        if (err.response?.data != undefined) {
            return err.response?.data
        } else if (err.response?.errors != undefined) {
            return err.response?.errors
        }
        return {success: false, message: err.message}
    }
};

export const editBillingConfig = async (id: number, payload: BillingConfigPayloadProps): Promise<BaseResponse> => {
    try {
        const {data} = await api({
            method: "POST",
            url: `billing-config/${id}`,
            data: payload
        })
        if (data) {
            return data
        } else {
            return {success: false, message: "An error occurred"}
        }
    } catch (err: any) {
        if (err.response?.data != undefined) {
            return err.response?.data
        } else if (err.response?.errors != undefined) {
            return err.response?.errors
        }
        return {success: false, message: err.message}
    }
};

export const deleteBillingConfig = async (id: number): Promise<BaseResponse> => {
    try {
        const {data} = await api({
            method: "DELETE",
            url: `billing-config/${id}`,
        })
        if (data) {
            return data
        } else {
            return {success: false, message: "An error occurred"}
        }
    } catch (err: any) {
        if (err.response?.data != undefined) {
            return err.response?.data
        } else if (err.response?.errors != undefined) {
            return err.response?.errors
        }
        return {success: false, message: err.message}
    }
};