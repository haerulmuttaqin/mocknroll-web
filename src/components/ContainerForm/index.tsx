import React, {FC} from "react";
import {Box, xcss, media} from "@atlaskit/primitives"

const containerStyle = xcss({
    paddingInlineEnd: 'space.0',
    [media.above.sm]: {
        paddingInlineEnd: 'space.300',
    }
})
const ContainerForm: FC<ContainerProps> = ({children}) => {
    return (
        <Box xcss={containerStyle}>
            {children}
        </Box>
    )
}

export default ContainerForm