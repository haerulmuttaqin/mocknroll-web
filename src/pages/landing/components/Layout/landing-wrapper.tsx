/** @jsxImportSource @emotion/react */

import React from 'react';
import {css} from "@emotion/react";

const breakpoints = [576, 768, 992, 1200, 2140]
const mediaQuery = breakpoints.map(bp => `@media (min-width: ${bp}px)`)
const LandingWrapper = ({children}: any) => {
    return (
        <div id={"content-wrapper"} css={
            css({
                [mediaQuery[0]]: {
                    paddingInline: "2rem",
                },
                [mediaQuery[1]]: {
                    paddingInline: "4rem",
                },
                [mediaQuery[2]]: {
                    paddingInline: "6rem",
                },
                [mediaQuery[3]]: {
                    paddingInline: "8rem",
                },
                [mediaQuery[4]]: {
                    paddingInline: "11rem",
                },
            })
        }>
            <div css={css({
                // paddingBottom: "2rem",
                [mediaQuery[0]]: {
                    maxWidth: "80rem",
                    margin: "0 auto",
                },
                [mediaQuery[1]]: {
                    maxWidth: "80rem",
                    margin: "0 auto",
                },
                [mediaQuery[2]]: {
                    maxWidth: "80rem",
                    margin: "0 auto",
                },
                [mediaQuery[3]]: {
                    maxWidth: "80rem",
                    margin: "0 auto",
                },
                [mediaQuery[4]]: {
                    maxWidth: "80rem",
                    margin: "0 auto",
                },
            })}>
                {children}
            </div>
        </div>
    )
}
export default LandingWrapper