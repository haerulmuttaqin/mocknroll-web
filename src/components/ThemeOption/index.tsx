import {Box} from "@atlaskit/primitives";
import Image from "next/image";
import React from "react";
import {getIcon} from "@component/Profile/content/ThemeSwither/useThemeSwithcer";

const ThemeOption = ({ children, optionType } : any) => (
    <Box style={{cursor: "pointer"}}>
        <Image
            style={{ marginRight: `${8 * 1.5}px`, verticalAlign: "middle" }}
            width="64"
            height="48"
            src={getIcon(optionType)}
            alt=""
        />
        {children}
    </Box>
);
export default ThemeOption