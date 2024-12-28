import React, {FC, Fragment} from 'react';
import '@/styles/landing.module.css'
import {Box} from '@atlaskit/primitives';
import {Content, Main, PageLayout, TopNavigation,} from '@atlaskit/page-layout';
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
                <title>Mock N&apos; Roll</title>
                <meta name="author" content="Haerul Muttaqin"/>
                <meta name="robots" content="index, follow"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="title" content="Mock N' Roll"/>
                <meta name="url" content="https://mocknroll.me"/>
                <meta name="description"
                      content="Streamline your development workflow! Our platform offers instant mock API creation, real-time testing, and seamless integration"/>
                <meta name="keywords" content="Mock API, API Generator FREE, Free Mock API"/>
                <meta name="image" content="https://mocknroll.me/mocknroll.webp"/>
                <meta property="og:title" content="Mock N' Roll"/>
                <meta property="og:url" content="https://mocknroll.me"/>
                <meta property="og:description"
                      content="Streamline your development workflow! Our platform offers instant mock API creation, real-time testing, and seamless integration"/>
                <meta property="og:keywords" content="Mock API, API Generator FREE, Free Mock API"/>
                <meta property="og:image" content="https://mocknroll.me/mocknroll.webp"/>
                <meta itemProp="title" content="Mock N' Roll"/>
                <meta itemProp="url" content="https://mocknroll.me"/>
                <meta itemProp="description"
                      content="Streamline your development workflow! Our platform offers instant mock API creation, real-time testing, and seamless integration"/>
                <meta itemProp="keywords" content="Mock API, API Generator FREE, Free Mock API"/>
                <meta itemProp="image" content="https://mocknroll.me/mocknroll.webp"/>
                <meta property="twitter:title" content="Mock N' Roll"/>
                <meta property="twitter:url" content="https://mocknroll.me"/>
                <meta property="twitter:description"
                      content="Streamline your development workflow! Our platform offers instant mock API creation, real-time testing, and seamless integration"/>
                <meta property="twitter:keywords" content="Mock API, API Generator FREE, Free Mock API"/>
                <meta property="twitter:image" content="https://mocknroll.me/mocknroll.webp"/>
                <meta charSet="UTF-8"/>
                <link type="image/png" sizes="16x16" rel="icon" href="./assets/images/icons8-rock-emoji-16.png"/>
                <link type="image/png" sizes="32x32" rel="icon" href="./assets/images/icons8-rock-emoji-32.png"/>
                <link type="image/png" sizes="96x96" rel="icon" href="./assets/images/icons8-rock-emoji-96.png"/>
            </Head>
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
        </Box>
    );
};

export default LandingPageLayout
// export default Layout
