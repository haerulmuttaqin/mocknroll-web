import React from "react";
import {Anchor, Box, xcss} from "@atlaskit/primitives";
import {media} from "@atlaskit/primitives/responsive";
import {useTranslation} from "next-i18next";

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

const navLinksStyles = xcss({
    display: 'flex',
    marginBlockStart: 'space.0',
    padding: 'space.0',
    justifyContent: 'center',
    gap: 'space.400',
    listStyle: 'none',
});

const navLinkStyles = xcss({
    textDecoration: 'none',
    color: 'color.text.subtlest',
    ':hover': {
        color: 'color.text.subtle',
        textDecoration: 'underline',
    },
    ':active': {
        color: 'color.text',
    },
});

const footerStyles = xcss({
    backgroundColor: 'color.background.neutral',
    gridArea: 'footer',
});

const Footer = () => {
    const {t} = useTranslation(['common'])
    return (
        <Box as={'footer'} xcss={footerStyles}>
            <Box as={'nav'} xcss={footerNavStyles}>
                <Box as={'p'}>&copy; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME}</Box>
                <Box as={'ul'} xcss={navLinksStyles} id={'nav-links'}>
                    {/*<Box as={'li'}>*/}
                    {/*    <Anchor*/}
                    {/*        href="#"*/}
                    {/*        target="_blank"*/}
                    {/*        rel="noopener"*/}
                    {/*        xcss={navLinkStyles}*/}
                    {/*    >*/}
                    {/*        API Docs*/}
                    {/*    </Anchor>*/}
                    {/*</Box>*/}
                    {/*<Box as={'li'}>*/}
                    {/*    <Anchor*/}
                    {/*        href={`${process.env.NEXT_PUBLIC_PAGE_URL}/privacy-policy`}*/}
                    {/*        target="_blank"*/}
                    {/*        rel="noopener"*/}
                    {/*        xcss={navLinkStyles}*/}
                    {/*    >*/}
                    {/*        {t('privacy')}*/}
                    {/*    </Anchor>*/}
                    {/*</Box>*/}
                    {/*<Box as={'li'}>*/}
                    {/*    <Anchor href="/about" xcss={navLinkStyles}>*/}
                    {/*        {t('about')}*/}
                    {/*    </Anchor>*/}
                    {/*</Box>*/}
                </Box>
            </Box>
        </Box>
    )
}

export default Footer