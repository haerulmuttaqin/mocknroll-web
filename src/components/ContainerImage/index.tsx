import React, {FC} from "react";
import {Box, xcss} from "@atlaskit/primitives";

export const ImageContainer: FC<ImageContainerProps> = ({children, noBorder}) => {
    let boxStyles = xcss({
        width: "100%",
        textAlign: "left",
        borderWidth: "border.width",
        borderColor: "color.border",
        borderRadius: "border.radius.100",
        borderStyle: "solid"
    });
    if (noBorder) {
        boxStyles = xcss({
            width: "100%",
            textAlign: "left",
        });
    }
    return <Box id={"image-container"} xcss={boxStyles}>{children}</Box>;
};


export const TerminalContainer: FC<ImageContainerProps> = ({children}) => {
    let boxStyles = xcss({
        width: "100%",
        textAlign: "center",
        borderWidth: "border.width",
        borderColor: "color.border",
        borderRadius: "border.radius.200",
        borderStyle: "solid"
    });
    return <Box id={"terminal-container"} xcss={boxStyles}>{children}</Box>;
};