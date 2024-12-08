import React, {FC, Fragment, useState} from 'react';

import {Box, xcss} from "@atlaskit/primitives";
import {useTranslation} from "next-i18next";
import {showFlag} from "@/store/actions/show-flag";
import {useDispatch} from "react-redux";
import Grid from "@atlaskit/grid";

const Content: FC<any> = (props) => {
    const {t} = useTranslation(['common'])
    const dispatch = useDispatch()
    const [thumbnail, setThumbnail] = useState<string>("")

    const handleCopy = () => {
        navigator.clipboard.writeText(thumbnail)
        dispatch(
            showFlag({
                success: true,
                title: "URL copied!",
            }) as any
        );
    }
    const handleOnError = (e: any) => {
        dispatch(
            showFlag({
                success: false,
                title: "Failed, Please try again!",
            }) as any
        );
    }

    return (
        <>
            <Box
                xcss={xcss({justifyContent: "center", alignItems: "center", paddingBlock: "space.400"})}
            >
                <Grid maxWidth="wide">
                </Grid>

            </Box>
        </>
    )
}

export default Content