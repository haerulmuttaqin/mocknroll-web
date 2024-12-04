import React, {FC} from "react";
import {Box, Inline, Stack, xcss} from "@atlaskit/primitives";
import Spinner from "@atlaskit/spinner";
import {SpinnerProps} from "@component/Spinner/spinner";

const spinnerStyles = xcss({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    textAlign: "center",
    width: '100%',
    height: '70vh',
});
const SpinnerLoading: FC<SpinnerProps> = (props) => {
    const {size} = props
    return (
        <Box xcss={spinnerStyles}>
            <Stack alignBlock="center">
                <Inline alignInline="center">
                    <Spinner size={size || "medium"}/>
                </Inline>
            </Stack>
        </Box>
    )
}
export default SpinnerLoading