'use client'
/** @jsxImportSource @emotion/react */
import React, {useRef} from 'react';
import type {NextPage} from "next";
import dynamic from "next/dynamic";
import {FlagsProvider} from "@atlaskit/flag";
import {Box, Stack, xcss} from "@atlaskit/primitives";
import Grid, {GridItem} from "@atlaskit/grid";
import Heading from "@atlaskit/heading";
import {token} from "@atlaskit/tokens";
import ContentWrapper from "@component/Layout/common/content-wrapper";
import {useTranslation} from "next-i18next";
import {useColorMode} from "@atlaskit/app-provider";
import Content from "@/pages/main/content";

const Layout = dynamic(
    () => import('@component/Layout'),
    {ssr: false}
)

const Main: NextPage = () => {
    const {t} = useTranslation(['region', 'common'])
    const refContent = useRef<HTMLDivElement>(null)
    const colorMode = useColorMode();

    return (
        <FlagsProvider>
            <Layout
                shouldShowBreadcrumbs={false}
            >
                <Box
                    style={{
                        backgroundColor: token("color.background.accent.blue.subtler"),
                        backgroundSize: "cover, 1440px",
                        backgroundImage: 'url("https://loremflickr.com/830/240/arts")',
                    }}
                >
                    <Box
                        style={{
                            backgroundColor: colorMode == 'dark' ? "rgb(13 42 99 / 76%)" : "#9cc7ff9e",
                        }}
                    >
                        <Box
                            xcss={xcss({justifyContent: "center", alignItems: "center", paddingBlock: "space.1000"})}
                        >
                            <br/><br/><br/>
                        </Box>
                    </Box>
                </Box>
                <Box xcss={xcss({
                    backgroundColor: "color.background.selected",
                    display: "block",
                    paddingBlock: "space.400",
                    marginBottom: "space.400"
                })}>
                    <Grid maxWidth="wide">
                        <GridItem start={{md: 3}} span={{md: 8}}>
                            <Stack space="space.100">
                                <div>
                                    <Heading level="h700">
                                        {process.env.NEXT_PUBLIC_APP_NAME}
                                    </Heading>
                                    <p>
                                        {process.env.NEXT_PUBLIC_APP_DESC}
                                    </p>
                                </div>
                                {/*<div style={{paddingTop: "10px"}}>
                                    <Button appearance="primary"
                                            onClick={handleScrollToContent}>{t("find_out_more")}</Button>
                                </div>*/}
                            </Stack>
                        </GridItem>
                    </Grid>
                </Box>
                <ContentWrapper>
                    <div ref={refContent}>
                        <Content/>
                    </div>
                </ContentWrapper>
            </Layout>
        </FlagsProvider>
    );
};

export default Main;