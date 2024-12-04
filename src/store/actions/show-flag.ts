import * as types from "../types";
import {DispatchFlagProps, FlagProps} from "@component/Layout/layout";

export const showFlag = ({title, message, success, goBack}: FlagProps) => async (dispatch: any) => {
    return dispatch(
        {
            type: types.SHOW_FLAG,
            payload: {
                show: true,
                title: title,
                message: message,
                success: success,
                goBack: goBack,
            },
        } as DispatchFlagProps
    );
};

export const resetFlag = () => async (dispatch: any) => {
    return dispatch(
        {
            type: types.SHOW_FLAG,
            payload: {
                show: false,
            },
        } as DispatchFlagProps
    );
};
