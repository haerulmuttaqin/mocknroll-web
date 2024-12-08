import {Box} from "@atlaskit/primitives";
import Image from "next/image";
import React from "react";
import englishIcon from "./../../../public/assets/icons/img_english.png";
import indoIcon from "./../../../public/assets/icons/img_indonesia.png";

export const getIcon = (type: any) => {
    switch (type) {
        case "en":
            return englishIcon;
        case "id":
        default:
            return indoIcon;
    }
};

const LangOptionSmall = ({ children, optionType } : any) => (
    <Box style={{cursor: "pointer"}}>
        <Image
            style={{ marginRight: `${8 * 1.5}px`, verticalAlign: "middle" }}
            width="24"
            height="24"
            src={getIcon(optionType)}
            alt=""
        />
        {children}
    </Box>
);

export default LangOptionSmall