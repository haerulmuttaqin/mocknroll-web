import React from "react";
import {Anchor, Box, xcss} from "@atlaskit/primitives";
import {media} from "@atlaskit/primitives/responsive";
import FooterNavigation from "@component/Footer/footer-nav";

const footerNavStyles = xcss({
    msWrapMargin: undefined,
    display: 'flex',
    gap: 'space.400',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'color.text.subtlest',
    font: 'font.body',
    paddingInlineStart: 'space.1000',
    paddingInlineEnd: 'space.1000',
    paddingBlockStart: 'space.300',
    paddingBlockEnd: 'space.300',
    [media.above.xxs]: {
        flexWrap: 'wrap',
        gap: 'space.200',
    },
});

const footerStyles = xcss({
    backgroundColor: 'color.background.neutral',
    gridArea: 'footer',
});

const Footer = () => {
    return (
        <Box as={"footer"}>
            <FooterNavigation/>
            <Box xcss={footerStyles}>
                <Box as={"nav"} xcss={footerNavStyles}>
                    <Box as={"small"}>&copy; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME}</Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Footer