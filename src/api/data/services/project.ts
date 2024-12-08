import {api} from "@/api";
import {BaseResponse} from "../interfaces";
import {ProjectPayloadProps} from "../interfaces/project";


export const getProjects = async (): Promise<BaseResponse> => {
    return await api({
        method: 'GET',
        url: "projects",
    });
};

export const getProject = async (project_id: string, sheet_id: string): Promise<BaseResponse> => {
    return await api({
        method: 'GET',
        url: `projects/${project_id}/${sheet_id}`,
    });
};

export const addProject = async (payload: ProjectPayloadProps): Promise<BaseResponse> => {
    try {
        const {data} = await api({
            method: "POST",
            url: "projects",
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

export const updateProject = async (id: string, sid: string, idx: number, payload: ProjectPayloadProps): Promise<BaseResponse> => {
    try {
        const {data} = await api({
            method: "POST",
            url: `projects/${sid}/${idx}/${id}`,
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