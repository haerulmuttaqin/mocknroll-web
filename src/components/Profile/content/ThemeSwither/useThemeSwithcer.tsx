import React, {useRef, useState} from "react";
import autoIcon from "/public/assets/icons/auto-theme-icon.png";
import darkIcon from "/public/assets/icons/dark-theme-icon.png";
import lightIcon from "/public/assets/icons/light-theme-icon.png";
import Image from "next/image";
import {Box} from "@atlaskit/primitives"
import {useColorMode} from "@atlaskit/app-provider";
import LangOption from "@component/ThemeOption";

export const getIcon = (type: any) => {
    switch (type) {
        case "dark":
            return darkIcon;
        case "auto":
            return autoIcon;
        case "light":
        default:
            return lightIcon;
    }
};


const OrderedThemeOptionsWithOriginal = ["light", "dark", "auto"];

const captions = {
    auto: {
        defaultMessage: "Match browser",
        id: "theme-switcher.auto",
        description: "Option to set theme as auto (match current system setting)"
    },
    light: {
        defaultMessage: "Light",
        id: "theme-switcher.light",
        description: "Option to set light theme"
    },
    dark: {
        defaultMessage: "Dark",
        id: "theme-switcher.dark",
        description: "Option to set dark theme"
    },
    none: {
        defaultMessage: "Original",
        id: "theme-switcher.none",
        description: "Option to remove theming"
    }
};


const useThemeSwitcher = () => {
    const colorMode = useColorMode();
    const [theme, setTheme] = useState(colorMode);
    const optionsRef = useRef(
        OrderedThemeOptionsWithOriginal.map((themeOption) => ({
            id: `${themeOption}-option`,
            item: (
                <LangOption optionType={themeOption}>
                    {(captions as any)[themeOption].defaultMessage}
                </LangOption>
            ),
            value: themeOption,
            label: (captions as any)[themeOption].defaultMessage,
            isSelected: (!theme && themeOption === "none") || theme === themeOption,
            onClick: () => {
                return setTheme(themeOption as any);
            }
        }))
    );
    return {
        selectedValue: theme,
        options: optionsRef.current
    };
};

export default useThemeSwitcher;
