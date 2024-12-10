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
        return {success: false, message: err.message}
    }
};

export const deleteProject = async (id: string, sid: string, idx: number): Promise<BaseResponse> => {
    try {
        const {data} = await api({
            method: "DELETE",
            url: `projects/${sid}/${idx}/${id}`,
        })
        if (data) {
            return data
        } else {
            return {success: false, message: "An error occurred"}
        }
    } catch (err: any) {
        return {success: false, message: err.message}
    }
};