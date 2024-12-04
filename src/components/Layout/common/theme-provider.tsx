import AppProvider, {useColorMode} from "@atlaskit/app-provider";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import secureLocalStorage from "react-secure-storage";

const AppThemeProvider = ({children}: any) => {
    return <AppProvider
        defaultColorMode={(secureLocalStorage.getItem("color_mode") || "dark") as any}>{children}</AppProvider>
}

export default AppThemeProvider