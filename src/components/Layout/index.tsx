"use client";
import React, {FC, Fragment, useEffect, useState} from 'react';
import {Content, LeftSidebarState, Main, PageLayout, TopNavigation,} from '@atlaskit/page-layout';
import {AppSwitcher, AtlassianNavigation, PrimaryButton, SignIn} from "@atlaskit/atlassian-navigation";
import SideNav from "@component/SideNav";
import MobileNavigation from "@component/SideNav/Mobile";
import {LayoutProps} from "@component/Layout/layout";
import BaseContent from "./content";
import {FlagsProvider} from "@atlaskit/flag";
import Head from "next/head";
import DefaultSettings from "@component/Setting";
import DefaultHelp from "@component/Help";
import {useRouter} from "next/router";
import {Box, Text, xcss} from "@atlaskit/primitives";
import {useTranslation} from "next-i18next";
import Button from "@atlaskit/button";
import DropdownMenu, {DropdownItemRadio, DropdownItemRadioGroup} from '@atlaskit/dropdown-menu';
import secureLocalStorage from "react-secure-storage";
import Tooltip from "@atlaskit/tooltip";
import DefaultProfile from "@component/Profile";
import {useSession} from "next-auth/react";
import {LinkButton} from "@atlaskit/button/new";
import Link from "next/link";

const AtlassianProductHome = () => (
    <Link href={"/"}>
        <span className={'charlie-text'}
              style={{fontSize: "18px", fontWeight: "600", marginInlineEnd: "20px"}}>🤘 Mock N&apos; Roll</span>
    </Link>
);

const DefaultSignIn = () => <SignIn href="/auth" tooltip="Sign in"/>;

const Layout: FC<LayoutProps> = (
    {
        children,
        title,
        isAdmin,
        isSideNavOpen,
        description,
        shouldShowPageHeader,
        shouldShowBreadcrumbs,
        shouldShowNavBar = true,
        shouldShowFooter,
        renderAction,
        renderBottomBar,
        loadingSidebar,
        sidebarList,
        sidebarTitle,
    }
) => {
    const {t} = useTranslation(['common'])
    const router = useRouter()
    const [wSize, setSize] = React.useState(0);
    const [isClient, setIsClient] = useState(false);
    const {data: session, status} = useSession()

    // Ensure we're on the client side to prevent hydration issues
    useEffect(() => {
        setIsClient(true);
        setSize(window.innerWidth);
    }, []);

    const updateWindowDimensions = () => {
        setSize(window.innerWidth);
    };

    useEffect(() => {
        if (isClient) {
            window.addEventListener("resize", updateWindowDimensions);
            return () => {
                window.removeEventListener("resize", updateWindowDimensions);
            };
        }
    }, [isClient]);

    const openHome = () => {
        router.replace("/")
    }

    const openProject = () => {
        router.replace("/projects")
    }

    const openApiDoc = () => {
        router.push(`${process.env.NEXT_PUBLIC_PAGE_URL}/docs`)
    }

    const openAbout = () => {
        router.push(`${process.env.NEXT_PUBLIC_PAGE_URL}/about`)
    }

    // Don't render until we're on the client to prevent hydration mismatch
    if (!isClient) {
        return (
            <FlagsProvider>
                <Head>
                    <title>{`${title || process.env.NEXT_PUBLIC_APP_NAME}`}</title>
                    <meta property="og:title" content={`${process.env.NEXT_PUBLIC_APP_NAME} - ${title}`} key="title"/>
                    <meta name="robots" content="index, follow"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta charSet="UTF-8"/>
                    <link type="image/png" sizes="16x16" rel="icon" href="./assets/images/icons8-rock-emoji-16.png"/>
                    <link type="image/png" sizes="32x32" rel="icon" href="./assets/images/icons8-rock-emoji-32.png"/>
                    <link type="image/png" sizes="96x96" rel="icon" href="./assets/images/icons8-rock-emoji-96.png"/>
                </Head>
                <div style={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    Loading...
                </div>
            </FlagsProvider>
        );
    }

    return (
        <FlagsProvider>
            <Head>
                <title>{`${title || process.env.NEXT_PUBLIC_APP_NAME}`}</title>
                <meta property="og:title" content={`${process.env.NEXT_PUBLIC_APP_NAME} - ${title}`} key="title"/>
                <meta property="og:url" content={window?.location?.href as string || process.env.NEXT_PUBLIC_PAGE_URL}/>
                <meta name="robots" content="index, follow"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta charSet="UTF-8"/>
                <link type="image/png" sizes="16x16" rel="icon" href="./assets/images/icons8-rock-emoji-16.png"/>
                <link type="image/png" sizes="32x32" rel="icon" href="./assets/images/icons8-rock-emoji-32.png"/>
                <link type="image/png" sizes="96x96" rel="icon" href="./assets/images/icons8-rock-emoji-96.png"/>
            </Head>
            {wSize < 800 ? (
                <Fragment>
                    {isSideNavOpen && (
                        <MobileNavigation title={title} sidebarList={sidebarList} sidebarTitle={sidebarTitle}
                                          loadingSideBar={loadingSidebar}/>)}
                    <Main>
                        <BaseContent
                            isSideNavOpen={isSideNavOpen}
                            isAdmin={isAdmin}
                            title={title}
                            description={description}
                            renderAction={renderAction}
                            renderBottomBar={renderBottomBar}
                            shouldShowBreadcrumbs={shouldShowBreadcrumbs}
                            shouldShowPageHeader={shouldShowPageHeader}
                            shouldShowFooter={shouldShowFooter}>
                            {children}
                        </BaseContent>
                    </Main>
                </Fragment>
            ) : (
                <Fragment>
                    <PageLayout
                        onLeftSidebarExpand={(state: LeftSidebarState) =>
                            console.log('onExpand', state)
                        }
                        onLeftSidebarCollapse={(state: LeftSidebarState) =>
                            console.log('onCollapse', state)
                        }
                    >
                        {
                            shouldShowNavBar &&
                            (
                                <TopNavigation isFixed={true}>
                                    <AtlassianNavigation
                                        label="dashboard"
                                        primaryItems={[
                                            <PrimaryButton key={0} onClick={openHome}>{t('home')}</PrimaryButton>,
                                            status == "authenticated" ? <PrimaryButton key={1}
                                                                                       onClick={openProject}>{t('my_projects')}</PrimaryButton> : null,
                                            <PrimaryButton key={3} onClick={openAbout}>{t('about')}</PrimaryButton>,
                                        ]}
                                        renderProductHome={AtlassianProductHome}
                                        renderSettings={DefaultSettings}
                                        renderProfile={status == "authenticated" ? DefaultProfile : DefaultSignIn}
                                    />
                                </TopNavigation>
                            )
                        }
                        <Content>
                            {isSideNavOpen &&
                                <SideNav isAdmin={isAdmin} menuList={sidebarList} title={sidebarTitle}
                                         loading={loadingSidebar}/>}
                            <Main>
                                <BaseContent
                                    isSideNavOpen={isSideNavOpen}
                                    isAdmin={isAdmin}
                                    title={title}
                                    description={description}
                                    renderAction={renderAction}
                                    renderBottomBar={renderBottomBar}
                                    shouldShowBreadcrumbs={shouldShowBreadcrumbs}
                                    shouldShowPageHeader={shouldShowPageHeader}
                                    shouldShowFooter={shouldShowFooter}
                                >
                                    {children}
                                </BaseContent>
                            </Main>
                        </Content>
                    </PageLayout>
                </Fragment>
            )}
        </FlagsProvider>
    );
};

export default Layout