import {plainApi} from "@/api";
import {BaseResponse} from "../interfaces";

export const getAreas = async (region_of_area: string): Promise<BaseResponse> => {
    return await plainApi({
        method: 'GET',
        url: `area/${region_of_area}`,
    });
};