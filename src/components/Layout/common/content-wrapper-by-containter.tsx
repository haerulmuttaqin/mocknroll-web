/** @jsxImportSource @emotion/react */

import React, {useEffect, useRef, useState} from 'react';
import {css} from "@emotion/react";


const cssStyle = (width: number) => {
    if (width > 1600)
        return css({
            paddingInline: "11rem",
        })
    else if (width > 1200) {
        return css({
            paddingInline: "8rem",
        })
    }
}

const cssInnerStyle = (width: number) => {
    if (width > 1600)
        return css({
            maxWidth: "100rem",
            margin: "0 auto",
        })
    else if (width > 1200) {
        return css({
            maxWidth: "100rem",
            margin: "0 auto",
        })
    }
}


const ContentWrapperByContainer = ({children}: any) => {
    const [contentWidth, setContentWidth] = useState(0)
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setContentWidth(ref.current ? ref.current.offsetWidth : 0)
    });

    return (
        <div ref={ref} id={"content-wrapper"} css={cssStyle(contentWidth)}>
            <div css={css(cssInnerStyle(contentWidth))} style={{paddingBottom: '60px'}}>
                {children}
            </div>
        </div>
    )
}
export default ContentWrapperByContainer