import {LeftSidebar} from "@atlaskit/page-layout";
import Tooltip from "@atlaskit/tooltip";
import {
    ButtonItem,
    Header,
    LoadingItems,
    NavigationContent, NavigationFooter,
    NavigationHeader,
    NestableNavigationContent,
    NestingItem,
    Section,
    SideNavigation,
    SkeletonItem,
} from "@atlaskit/side-navigation";
import {Box, xcss} from "@atlaskit/primitives";
import {ExpandLeftSidebarKeyboardShortcut} from "../Layout/common";
import React, {useState} from "react";
import {mainMenu} from "@/resources/main-menu";
import {useRouter} from "next/router";
import secureLocalStorage from "react-secure-storage";
import {SideNavContentProps} from "@component/SideNav/sidenav";
import {useNextQueryParam} from "@/utils/hooks";
import ArrowLeftCircleIcon from '@atlaskit/icon/glyph/arrow-left-circle'
import {useTranslation} from "next-i18next";

let sideNavStyle = xcss({
    padding: "space.100",
    height: "100vh"
});

let loadingSideNavStyle = xcss({
    padding: "space.100",
    overflow: "hidden"
});


const SideNav = ({
                     shouldHideResizeButton = false,
                     isMobile = false,
                     menuList,
                     title,
                     loading,
                     onClick
                 }: SideNavContentProps) => {
    const router = useRouter()
    const user = JSON.parse(secureLocalStorage.getItem("user") as string || `{"user_role": "user"}`)
    const [userRole, serUserRole] = useState<string>(user.user_role)
    const regionId = useNextQueryParam('region_id', 2)
    const {t} = useTranslation(['common'])

    const pathname = router.pathname.split('/')[1]?.toLowerCase()
    const pathnameSub = router.pathname.split('/')[2]?.toLowerCase()
    const pathnameRegion = useNextQueryParam("region_id")
    const pathnameArea = useNextQueryParam("area_id", 3)

    const navigateTo = (e: any, route: string) => {
        e.preventDefault()
        if (onClick) {
            onClick()
        }
        router.push(route)
        return;
    };

    const navigateToArea = (e: any, route: string) => {
        e.preventDefault()
        if (onClick) {
            onClick()
        }
        router.replace(route)
        return;
    };

    const navigateToZone = (e: any, route: string) => {
        e.preventDefault()
        if (onClick) {
            onClick()
        }
        router.replace(`/zone/${regionId}/${route}/default`)
        return;
    };

    const checkUrl = (value: string) => {
        return value?.toLowerCase() === pathname
    }

    const checkSubUrl = (value: string) => {
        return value?.toLowerCase() === pathnameSub
    }

    const checkRegionUrl = (value: string) => {
        return value?.toLowerCase() === pathnameRegion
    }

    const checkAreaUrl = (value: string) => {
        return value?.toLowerCase() === pathnameArea
    }

    const currentPath = () => (router.pathname.split('/').length == 3 || router.pathname.split('/').length == 4) ? [router.pathname.split("/")[1]] : []

    const handleOnChangeNavigation = (e: any) => {
    }

    const navigateBack = () => {
        router.back()
    }

    return (
        <LeftSidebar
            id={isMobile ? "left-sidebar-mobile" : "left-sidebar"}
            skipLinkTitle="Navigation"
            isFixed={true}
            onFlyoutExpand={() => console.log('onFlyoutExpand')}
            onFlyoutCollapse={() => console.log('onFlyoutCollapse')}
            resizeGrabAreaLabel="Resize"
            resizeButtonLabel="Current"
            valueTextLabel="Width"
            overrides={
                {
                    ResizeButton: {
                        render: (Component, props) => (
                            shouldHideResizeButton ? <span></span> :
                                <Tooltip
                                    content={
                                        <p>{props.isLeftSidebarCollapsed ? 'Expand' : 'Collapse'} the
                                            navigation [
                                            <br/>(left bracket)</p>
                                    }
                                    hideTooltipOnClick
                                    position="right"
                                    testId="tooltip"
                                >
                                    <Component {...props} />
                                </Tooltip>
                        ),
                    },
                }
            }
        >
            {
                (loading && !menuList) && (
                    <Box id={"sidebar-loading"}>
                        <NavigationContent>
                            <NavigationHeader>
                                <div style={{marginTop: '8px'}}>
                                    <Header>{title}</Header>
                                </div>
                            </NavigationHeader>
                            <LoadingItems
                                isLoading
                                fallback={
                                    <>
                                        <Box xcss={loadingSideNavStyle}>
                                            <SkeletonItem isShimmering/>
                                            <SkeletonItem isShimmering/>
                                            <SkeletonItem isShimmering/>
                                            <SkeletonItem isShimmering/>
                                            <SkeletonItem isShimmering/>
                                            <SkeletonItem isShimmering/>
                                            <SkeletonItem isShimmering/>
                                            <SkeletonItem isShimmering/>
                                        </Box>
                                    </>
                                }>
                                <Box/>
                            </LoadingItems>
                        </NavigationContent>
                    </Box>
                )
            }
            {
                !menuList && !loading ?
                    <SideNavigation label="navigation" testId="side-navigation-app">
                        <Box xcss={sideNavStyle}>
                            <NestableNavigationContent initialStack={currentPath()} onChange={handleOnChangeNavigation}>
                                <Section isList>
                                    {
                                        mainMenu.map((menu, i) => {
                                            const role: any = menu.accessor?.filter((it: any) => it == userRole as any)
                                            if (role?.length == 0) return null
                                            const isNestedMenu = (menu.subMenu?.length || 0) > 0
                                            if (isNestedMenu) {
                                                return (
                                                    <NestingItem
                                                        id={menu.route.replace("/", "")}
                                                        key={`${i}-${menu.route}`}
                                                        title={t(menu.locale)}
                                                        isSelected={menu.route.replace("/", "") == pathname?.split("/")[0]}>
                                                        {
                                                            menu.subMenu?.map((subMenu, subI) => {
                                                                const role: any = subMenu.accessor?.filter((it: any) => it == userRole as any)
                                                                if (role?.length == 0) return null
                                                                return (
                                                                    <Section key={subI} title={t(subMenu.locale)}
                                                                             isList>
                                                                        {
                                                                            subMenu.subMenu?.map((subChildMenu, subChildI) => {
                                                                                const role: any = subChildMenu.accessor?.filter((it: any) => it == userRole as any)
                                                                                if (role?.length == 0) return null
                                                                                return (
                                                                                    <ButtonItem
                                                                                        id={`${subChildMenu.route}-${subChildMenu.route}`}
                                                                                        key={`${subI}-${subChildMenu.route}`}
                                                                                        isSelected={checkSubUrl(subChildMenu.route?.split('/')[1] as string)}
                                                                                        onClick={e => navigateTo(e, `${menu.route}${subChildMenu.route}`)}>
                                                                                        {t(subChildMenu.locale)}
                                                                                    </ButtonItem>
                                                                                )
                                                                            })
                                                                        }
                                                                    </Section>
                                                                )
                                                            })
                                                        }
                                                    </NestingItem>
                                                )
                                            }
                                            return (
                                                <ButtonItem
                                                    id={menu.route.replace("/", "")}
                                                    key={`${i}-${menu.route}`}
                                                    isSelected={checkUrl(menu.route?.split('/')[1] as string)}
                                                    onClick={e => navigateTo(e, menu.route)}>
                                                    {menu.title}
                                                </ButtonItem>
                                            )
                                        })
                                    }
                                </Section>
                            </NestableNavigationContent>
                        </Box>
                    </SideNavigation>
                    :
                    !loading &&
                    (<SideNavigation label="navigation" testId="side-navigation">
                        <Box xcss={sideNavStyle}>
                            <NavigationHeader>
                                <Header>{title}</Header>
                                <ButtonItem
                                    iconBefore={<ArrowLeftCircleIcon label={"back"}/>}
                                    onClick={navigateBack}>
                                    {t('go_back')}
                                </ButtonItem>
                            </NavigationHeader>
                            {menuList?.areas?.length > 0 || menuList?.regions?.length > 0 ?
                                <NavigationContent showTopScrollIndicator>
                                    {
                                        menuList?.regions?.map((menu: any, i: number) => {
                                            return (
                                                <ButtonItem
                                                    id={menu.value}
                                                    key={`${i}-${menu.value}`}
                                                    isSelected={checkRegionUrl(menu.value)}
                                                    onClick={e => navigateToArea(e, menu.value)}>
                                                    &nbsp;{menu.caption}
                                                </ButtonItem>
                                            )
                                        })
                                    }
                                    {
                                        menuList?.areas?.map((menu: any, i: number) => {
                                            return (
                                                <ButtonItem
                                                    id={menu.value}
                                                    key={`${i}-${menu.value}`}
                                                    isSelected={checkAreaUrl(menu.value)}
                                                    onClick={e => navigateToZone(e, menu.value)}>
                                                    &nbsp;{menu.caption}
                                                </ButtonItem>
                                            )
                                        })
                                    }
                                </NavigationContent>
                                : null}
                        </Box>
                    </SideNavigation>)
            }
            <ExpandLeftSidebarKeyboardShortcut/>
        </LeftSidebar>
    )
}
export default SideNav