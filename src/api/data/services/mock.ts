import {api} from "@/api";
import {BaseResponse} from "../interfaces";
import {ProjectPayloadProps} from "../interfaces/project";
import {MockPayloadProps} from "@api/data/interfaces/mock";


export const getMocks = async (pid: string, sid: string): Promise<BaseResponse> => {
    return await api({
        method: 'GET',
        url: `mocks/${pid}/${sid}`,
    });
};

export const getMock = async (mid: string, pid: string, sid: string): Promise<BaseResponse> => {
    return await api({
        method: 'GET',
        url: `mocks/${mid}/${pid}/${sid}`,
    });
};

export const addMock = async (payload: MockPayloadProps): Promise<BaseResponse> => {
    try {
        const {data} = await api({
            method: "POST",
            url: "mocks",
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

export const updateMock = async (mid: string, pid: string, sid: string, idx: number, payload: MockPayloadProps): Promise<BaseResponse> => {
    try {
        const {data} = await api({
            method: "POST",
            url: `mocks/${pid}/${sid}/${idx}/${mid}`,
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

export const deleteMock = async (pid: string, sid: string, idx: number, mid: string): Promise<BaseResponse> => {
    try {
        const {data} = await api({
            method: "DELETE",
            url: `mocks/${pid}/${sid}/${idx}/${mid}`,
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