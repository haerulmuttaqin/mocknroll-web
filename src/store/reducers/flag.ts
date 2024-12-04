import {DispatchFlagProps, FlagProps} from "@component/Layout/layout";
import {SHOW_FLAG} from "../types";

const initialState: FlagProps = {
    show: false,
}
const showFlagReducer = (state = initialState, action: DispatchFlagProps) => {
    switch (action.type) {
        case SHOW_FLAG:
            return {...action.payload}
        default:
            return {state}
    }
}
export default showFlagReducer