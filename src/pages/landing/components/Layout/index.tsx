"use client";
import React, {FC, Fragment} from 'react';
import '@/styles/landing.module.css'
import {Box} from '@atlaskit/primitives';
import {Content, Main, PageLayout, TopNavigation,} from '@atlaskit/page-layout';
import {AppSwitcher} from "@atlaskit/atlassian-navigation";
import {NavigationProvider} from "@atlaskit/navigation-next";
import Image from "next/image";
import AppLogo from "/public/assets/images/logo.png";
import {LandingPageLayoutProps} from "@component/Layout/layout";
import Head from "next/head";
import Button from "@atlaskit/button/new";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {useRouter} from "next/router";
import LandingPageNavigation from "@/pages/landing/components/Header";

const AtlassianProductHome = () => (
    <Image src={AppLogo} width={75} height={50} alt="Picture of the author"/>
);
const ExitAdmin = () => {
    const router = useRouter()
    const handleExit = () => router.push("/overviews")
    return (
        <Button iconBefore={CloseIcon} onClick={handleExit}>Close Admin Console</Button>
    );
}
const DefaultAppSwitcher = () => <AppSwitcher tooltip="Switch to..." href={'/'}/>;

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
                <title>{`${process.env.NEXT_PUBLIC_APP_NAME} ${title || ''}`}</title>
                <meta property="og:title" content={`${process.env.NEXT_PUBLIC_APP_NAME} ${title || ''}`}
                      key="title"/>
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
