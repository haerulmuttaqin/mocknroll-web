import {combineReducers} from 'redux'
import showFlagReducer from './flag'
import setThemeReducer from "@/store/reducers/theme";

const rootReducer = combineReducers({
    flag: showFlagReducer,
    theme: setThemeReducer
})

export default rootReducer