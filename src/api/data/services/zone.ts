import {plainApi, playerApi} from "@/api";
import {BaseResponse} from "../interfaces";

export const getZones = async (region_of_area: string | undefined, area_of_zone: string | undefined): Promise<BaseResponse> => {
    return await plainApi({
        method: 'GET',
        url: `area/${region_of_area}/zone/${area_of_zone}`,
    });
};

export const getZoneUpdateViews = async (region_of_area: string | undefined, area_of_zone: string | undefined, index: number | undefined): Promise<BaseResponse> => {
    return await plainApi({
        method: 'PATCH',
        url: `update-view/${region_of_area}/zone/${area_of_zone}/index/${index}`,
    });
};

export const getVideo = async (url: string | undefined): Promise<any> => {
    return await playerApi({
        method: 'GET',
        url: `http://0.0.0.0:8112/video?url=${url}`,
    });
};