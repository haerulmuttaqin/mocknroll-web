import {plainApi, userApi} from "@/api";
import {BaseResponse} from "../interfaces";

export const getRegions = async (): Promise<BaseResponse> => {
    return await plainApi({
        method: 'GET',
        url: "region",
    });
};

export const getUsers = async (): Promise<any> => {
    return await userApi({
        method: 'GET',
        url: "users",
    });
};

export const getThumbnail = async (url: string): Promise<any> => {
    return await plainApi({
        method: 'GET',
        url: `thumbnail?url=${url}`,
    });
};

// export const getMeterGroupsOverview = async (): Promise<BaseResponse> => {
//     return await api({
//         method: 'GET',
//         url: "group?overview=true",
//     });
// };
//
// export const getMeterGroup = async (group_id: number): Promise<BaseResponse> => {
//     return await api({
//         method: 'GET',
//         url: `group/${group_id}`,
//     });
// };
