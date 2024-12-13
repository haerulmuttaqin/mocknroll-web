"use client";
import React, {FC, Fragment, useEffect} from 'react';
import {Box} from '@atlaskit/primitives';
import {Content, LeftSidebarState, Main, PageLayout, TopNavigation,} from '@atlaskit/page-layout';
import {AppSwitcher} from "@atlaskit/atlassian-navigation";
import {NavigationProvider} from "@atlaskit/navigation-next";
import Image from "next/image";
import AppLogo from "/public/assets/images/logo.png";
import MobileNavigation from "@component/SideNav/Mobile";
import {LandingPageLayoutProps} from "@component/Layout/layout";
import Auth from "@/protected/auth";
import {FlagsProvider} from "@atlaskit/flag";
import Head from "next/head";
import Button from "@atlaskit/button/new";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
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
    const dispatch = useDispatch();
    const router = useRouter()
    const [wSize, setSize] = React.useState(0);
    const updateWindowDimensions = () => {
        setSize(window.innerWidth);
    };
    if (window.innerWidth !== wSize) {
        setSize(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", updateWindowDimensions);
        return () => {
            window.removeEventListener("resize", updateWindowDimensions);
        };
    });
    return (
        <FlagsProvider>
            <Box id={'landing-body'}>
                <Head>
                    <title>{`${process.env.NEXT_PUBLIC_APP_NAME} ${title || ''}`}</title>
                    <meta property="og:title" content={`${process.env.NEXT_PUBLIC_APP_NAME} ${title || ''}`}
                          key="title"/>
                </Head>
                <NavigationProvider initialUIController={{isResizeDisabled: true}}>
                    <Fragment>
                        <PageLayout
                            onLeftSidebarExpand={(state: LeftSidebarState) =>
                                console.log('onExpand', state)
                            }
                            onLeftSidebarCollapse={(state: LeftSidebarState) =>
                                console.log('onCollapse', state)
                            }
                        >
                            <TopNavigation isFixed={true}>
                                <LandingPageNavigation/>
                            </TopNavigation>
                            <Content>
                                <Main>
                                    {children}
                                    {/*<LandingPageContent*/}
                                    {/*    isAdmin={isAdmin}*/}
                                    {/*    title={title}*/}
                                    {/*    description={description}*/}
                                    {/*    renderAction={renderAction}*/}
                                    {/*    renderBottomBar={renderBottomBar}*/}
                                    {/*    shouldShowBreadcrumbs={shouldShowBreadcrumbs}*/}
                                    {/*    shouldShowPageHeader={shouldShowPageHeader}*/}
                                    {/*>*/}
                                    {/*    {children}*/}
                                    {/*</LandingPageContent>*/}
                                </Main>
                            </Content>
                        </PageLayout>
                    </Fragment>
                    {/*{wSize < 800 ? (*/}
                    {/*    <Fragment>*/}
                    {/*        <MobileNavigation title={title}/>*/}
                    {/*        <Main>*/}
                    {/*            /!*<BaseContent*!/*/}
                    {/*            /!*    isAdmin={isAdmin}*!/*/}
                    {/*            /!*    title={title}*!/*/}
                    {/*            /!*    description={description}*!/*/}
                    {/*            /!*    renderAction={renderAction}*!/*/}
                    {/*            /!*    renderBottomBar={renderBottomBar}*!/*/}
                    {/*            /!*    shouldShowBreadcrumbs={shouldShowBreadcrumbs}*!/*/}
                    {/*            /!*    shouldShowPageHeader={shouldShowPageHeader}>*!/*/}
                    {/*            /!*    {children}*!/*/}
                    {/*            /!*</BaseContent>*!/*/}
                    {/*        </Main>*/}
                    {/*    </Fragment>*/}
                    {/*) : (*/}
                    {/*    <Fragment>*/}
                    {/*        <PageLayout*/}
                    {/*            onLeftSidebarExpand={(state: LeftSidebarState) =>*/}
                    {/*                console.log('onExpand', state)*/}
                    {/*            }*/}
                    {/*            onLeftSidebarCollapse={(state: LeftSidebarState) =>*/}
                    {/*                console.log('onCollapse', state)*/}
                    {/*            }*/}
                    {/*        >*/}
                    {/*            <TopNavigation isFixed={true}>*/}
                    {/*                <LandingPageNavigation/>*/}
                    {/*            </TopNavigation>*/}
                    {/*            <Content>*/}
                    {/*                <Main>*/}
                    {/*                    {children}*/}
                    {/*                    /!*<LandingPageContent*!/*/}
                    {/*                    /!*    isAdmin={isAdmin}*!/*/}
                    {/*                    /!*    title={title}*!/*/}
                    {/*                    /!*    description={description}*!/*/}
                    {/*                    /!*    renderAction={renderAction}*!/*/}
                    {/*                    /!*    renderBottomBar={renderBottomBar}*!/*/}
                    {/*                    /!*    shouldShowBreadcrumbs={shouldShowBreadcrumbs}*!/*/}
                    {/*                    /!*    shouldShowPageHeader={shouldShowPageHeader}*!/*/}
                    {/*                    /!*>*!/*/}
                    {/*                    /!*    {children}*!/*/}
                    {/*                    /!*</LandingPageContent>*!/*/}
                    {/*                </Main>*/}
                    {/*            </Content>*/}
                    {/*        </PageLayout>*/}
                    {/*    </Fragment>*/}
                    {/*)}*/}
                </NavigationProvider>
            </Box>
        </FlagsProvider>
    );
};

export default LandingPageLayout
// export default Layout
