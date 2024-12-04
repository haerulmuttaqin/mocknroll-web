import {SET_THEME} from "../types";

const defaultState = {colorMode: "light"}
const setThemeReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case SET_THEME:
            return {...action.payload}
        default:
            return {state}
    }
}
export default setThemeReducer