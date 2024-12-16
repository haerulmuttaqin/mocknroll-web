"use client";
import React, {FC, Fragment} from 'react';
import '@/styles/landing.module.css'
import {Box} from '@atlaskit/primitives';
import {Content, Main, PageLayout, TopNavigation,} from '@atlaskit/page-layout';
import {NavigationProvider} from "@atlaskit/navigation-next";
import {LandingPageLayoutProps} from "@component/Layout/layout";
import Head from "next/head";
import LandingPageNavigation from "@/pages/landing/components/Header";

const LandingPageLayout: FC<LandingPageLayoutProps> = (
    {
        children,
        title,
        description,
    }
) => {
    return (
        <Box id={'landing-body'}>
            <Head>
                <title>{`${process.env.NEXT_PUBLIC_APP_NAME} - ${title || ''}`}</title>
                <meta charSet="UTF-8"/>
                <meta property="og:title" content={`${process.env.NEXT_PUBLIC_APP_NAME}`} key="title"/>
                <meta property="og:url" content={process.env.NEXT_PUBLIC_PAGE_URL}/>
                <meta property="og:description" content="Streamline your development workflow! Our platform offers instant mock API creation, real-time testing, and seamless integration" />
                <meta property="og:keywords" content="Mock API, API Generator FREE, Free Mock API" />
                <meta property="og:image" content="https://mocknroll.me/mocknroll.webp" />
                <meta name="robots" content="index, follow"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="title" content={`${process.env.NEXT_PUBLIC_APP_NAME}`} key="title"/>
                <meta name="url" content={process.env.NEXT_PUBLIC_PAGE_URL}/>
                <meta name="description" content="Streamline your development workflow! Our platform offers instant mock API creation, real-time testing, and seamless integration" />
                <meta name="keywords" content="Mock API, API Generator FREE, Free Mock API" />
                <meta name="image" content="https://mocknroll.me/mocknroll.webp" />
                <meta property="twitter:title" content={`${process.env.NEXT_PUBLIC_APP_NAME}`} key="title"/>
                <meta property="twitter:url" content={process.env.NEXT_PUBLIC_PAGE_URL}/>
                <meta property="twitter:description" content="Streamline your development workflow! Our platform offers instant mock API creation, real-time testing, and seamless integration" />
                <meta property="twitter:keywords" content="Mock API, API Generator FREE, Free Mock API" />
                <meta property="twitter:image" content="https://mocknroll.me/mocknroll.webp" />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Haerul Muttaqin" />
                <link type="image/png" sizes="16x16" rel="icon" href="./assets/images/icons8-rock-emoji-16.png"/>
                <link type="image/png" sizes="32x32" rel="icon" href="./assets/images/icons8-rock-emoji-32.png"/>
                <link type="image/png" sizes="96x96" rel="icon" href="./assets/images/icons8-rock-emoji-96.png"/>
            </Head>
            <NavigationProvider initialUIController={{isResizeDisabled: true}}>
                <Fragment>
                    <PageLayout>
                        <TopNavigation isFixed={true}>
                            <LandingPageNavigation/>
                        </TopNavigation>
                        <Content>
                            <Main>
                                {children}
                            </Main>
                        </Content>
                    </PageLayout>
                </Fragment>
            </NavigationProvider>
        </Box>
    );
};

export default LandingPageLayout
// export default Layout
