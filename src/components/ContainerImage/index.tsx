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