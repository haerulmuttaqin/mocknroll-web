import {Box, xcss} from "@atlaskit/primitives";
import React from "react";

const Divider = () => (
    <Box xcss={xcss({
        height: "size.050",
        borderColor: "color.border",
        borderStyle: "solid",
        borderBottomWidth: "border.width.outline",
        borderTopWidth: "border.width.0",
        borderRightWidth: "border.width.0",
        borderLeftWidth: "border.width.0"
    })
    }></Box>
)

export default Divider