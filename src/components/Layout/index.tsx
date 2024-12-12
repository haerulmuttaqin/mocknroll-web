"use client";
import React, {FC, Fragment, useEffect, useState} from 'react';
import {Content, LeftSidebarState, Main, PageLayout, TopNavigation,} from '@atlaskit/page-layout';
import {AppSwitcher, AtlassianNavigation, PrimaryButton, SignIn} from "@atlaskit/atlassian-navigation";
import {NavigationProvider} from "@atlaskit/navigation-next";
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

const AtlassianProductHome = () => (
    <Box xcss={xcss({marginRight: "space.250"})}>
        <Text weight={'bold'} size={'large'} color={'color.text.brand'}>
            Mock {" "}
        </Text>
        <Text size={'large'} color={'color.text.brand'}>
            N Roll
        </Text>
    </Box>
);

const DefaultAppSwitcher = () => <AppSwitcher tooltip="Switch to..." href={'/'}/>;
const DefaultLangSwitcher = () => {
    const router = useRouter()
    const {pathname, asPath, query, locale} = router
    const [selected, setSelected] = useState<string>(secureLocalStorage.getItem("lang") as string || "id");
    const {t, i18n} = useTranslation(['common'])

    const submitSelected = (lang: string) => {
        setSelected(lang)
    }

    useEffect(() => {
        i18n.changeLanguage(selected)
        secureLocalStorage.setItem("lang", selected)
        router.push({pathname, query}, asPath, {locale: selected});
    }, [selected]);

    return (
        <DropdownMenu<HTMLButtonElement>
            trigger={({triggerRef, ...props}) => (
                <Tooltip content={t("lang_setting_desc")}>
                    {(tooltipProps) => (
                        <div {...tooltipProps} >
                            <Button appearance="subtle"{...props} ref={triggerRef}>{selected.toUpperCase()}</Button>
                        </div>
                    )}
                </Tooltip>
            )}
            shouldRenderToParent
        >
            <DropdownItemRadioGroup title={t("lang")} id="actions">
                <DropdownItemRadio
                    id="id"
                    onClick={() => submitSelected('id')}
                    isSelected={selected === 'id'}
                >
                    {t('lang_id')}
                </DropdownItemRadio>
                <DropdownItemRadio
                    id="en"
                    onClick={() => submitSelected('en')}
                    isSelected={selected === 'en'}
                >
                    {t('lang_en')}
                </DropdownItemRadio>
            </DropdownItemRadioGroup>
        </DropdownMenu>
    );
};
const DefaultSignIn = () => <SignIn href="/auth" tooltip="Sign in"/>;
const ButtonProject = () => <LinkButton href="/projects">My Projects</LinkButton>;


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
    const activeLanguage = router.locale;
    const {data: session, status} = useSession()

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

    return (
        <FlagsProvider>
            <Head>
                <title>{`${title || process.env.NEXT_PUBLIC_APP_NAME}`}</title>
                <meta property="og:title" content={`${process.env.NEXT_PUBLIC_APP_NAME} - ${title}`} key="title"/>
                <meta property="og:url" content={window?.location?.href as string || process.env.NEXT_PUBLIC_PAGE_URL}/>
                <meta name="robots" content="index, follow"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta charSet="UTF-8"/>
            </Head>
            <NavigationProvider initialUIController={{isResizeDisabled: true}}>
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
                                            renderAppSwitcher={DefaultAppSwitcher}
                                            renderProductHome={AtlassianProductHome}
                                            // renderNotifications={DefaultLangSwitcher}
                                            renderHelp={DefaultHelp}
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
            </NavigationProvider>
        </FlagsProvider>
    );
};

export default Layout