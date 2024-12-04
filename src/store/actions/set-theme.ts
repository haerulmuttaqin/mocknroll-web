import * as types from "../types";
import {DispatchFlagProps, FlagProps} from "@component/Layout/layout";
import {SET_THEME} from "../types";

export const setTheme = (theme: string) => async (dispatch: any) => {
    return dispatch(
        {
            type: types.SET_THEME,
            payload: {
                colorMode: theme,
            },
        } as DispatchFlagProps
    );
};