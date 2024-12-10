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
import {ExpandLeftSidebarKeyboardShortcut} from "../Layout/common";
import React, {useEffect, useState} from "react";
import {mainMenu} from "@/resources/main-menu";
import {useRouter} from "next/router";
import secureLocalStorage from "react-secure-storage";
import {SideNavContentProps} from "@component/SideNav/sidenav";
import {useNextQueryParam} from "@/utils/hooks";
import ArrowLeftCircleIcon from '@atlaskit/icon/glyph/arrow-left-circle'
import {useTranslation} from "next-i18next";
import Image from "@atlaskit/image";
import {Box, Inline, Stack, xcss} from "@atlaskit/primitives";
import Popup from "@atlaskit/popup";
import Button from "@atlaskit/button/new";
import ChevronUpIcon from "@atlaskit/icon/utility/chevron-up";
import ChevronDownIcon from "@atlaskit/icon/utility/chevron-down";
import ProjectIcon from '@atlaskit/icon/core/project';

import {ButtonItem as ButtonItemMenu, MenuGroup, Section as SectionMenu} from '@atlaskit/menu';
import {adminMenu} from "@resources/admin-menu";
import {useFetchProjects} from "@pages/projects/data/remote";
import {ProjectProps} from "@api/data/interfaces/project";
import AddIcon from '@atlaskit/icon/glyph/add';
import TasksIcon from "@atlaskit/icon/glyph/subtask";

let sideNavStyle = xcss({
    padding: "space.100",
    height: "100vh"
});

let loadingSideNavStyle = xcss({
    padding: "space.100",
    overflow: "hidden"
});


const MenuProject = ({data}: any) => {
    const {t} = useTranslation(["common"])
    const router = useRouter()
    const {pid, sid, id} = router.query
    const {
        data: dataProjects,
        isLoading: isLoadingProjects,
        mutate: mutateProject,
        error: errorProject
    } = useFetchProjects()

    const handleChangeProject = (project: any) => {
        if (project.id == pid) return;
        window.location.href = `/mocks/?pid=${project.id}&sid=${project.sid}&idx=${project.idx}`
    }

    const handleGoToManageProject = () => {
        router.push("/projects")
    }

    const handleCreateNewProject = () => {
        router.push("/projects/create")
    }

    return (
        <MenuGroup>
            <SectionMenu title={t("projects")}>
                {
                    !isLoadingProjects && dataProjects?.length > 0
                        ? dataProjects?.map((item: any) => {
                            return (
                                <ButtonItemMenu
                                    key={item.id as any}
                                    description={item.prefix as any}
                                    onClick={() => handleChangeProject(item)}
                                    isSelected={item.id === pid}
                                >
                                    {item.name as any}
                                </ButtonItemMenu>
                            )
                        })
                        : null
                }
            </SectionMenu>
            <SectionMenu hasSeparator>
                <ButtonItemMenu onClick={handleGoToManageProject}>{t("my_projects")}</ButtonItemMenu>
                <ButtonItemMenu onClick={handleCreateNewProject}>{t("create_new_project")}</ButtonItemMenu>
            </SectionMenu>
        </MenuGroup>
    )
}


const SideNav = ({
                     shouldHideResizeButton = false,
                     isAdmin = false,
                     isMobile = false,
                     menuList,
                     title,
                     loading,
                     onClick
                 }: SideNavContentProps) => {
    const router = useRouter()
    const [userRole, serUserRole] = useState<string>("admin")
    const {t} = useTranslation(['common'])
    const {mock_id, pid, sid, idx} = router.query
    const {
        data: dataProjects,
        isLoading: isLoadingProjects,
        mutate: mutateProject,
        error: errorProject
    } = useFetchProjects()
    const [projectSelected, setProjectSelected] = useState<ProjectProps>()

    const pathname = router.pathname.split('/')[1]?.toLowerCase()
    const pathnameSub = router.pathname.split('/')[2]?.toLowerCase()
    const pathnameRegion = useNextQueryParam("region_id")
    const pathnameArea = useNextQueryParam("area_id", 3)

    const [isOpenProject, setIsOpenProject] = useState(false);
    const [projects, setProjects] = useState<any>(JSON.parse(secureLocalStorage.getItem("companies") as string))
    const navigateTo = (e: any, route: string) => {
        e.preventDefault()
        if (onClick) {
            onClick()
        }
        router.push(route)
        return;
    };

    const navigateToCreateNewMock = (e: any, route: string) => {
        e.preventDefault()
        router.push(`/mocks/${route}/?pid=${pid}&sid=${sid}&idx=${idx}`)
        return;
    };

    const navigateToManageMock = (e: any) => {
        e.preventDefault()
        router.push(`/mocks/?pid=${pid}&sid=${sid}&idx=${idx}`)
        return;
    };

    const navigateToDetailMock = (e: any, mid: string, pid: string, sid: string, idx: number) => {
        e.preventDefault()
        router.push(`/mocks/${mid}?action=view&pid=${pid}&sid=${sid}&idx=${idx}`)
        return;
    }

    const checkUrl = (value: string) => {
        return value?.toLowerCase() === pathname
    }

    const checkSubUrl = (value: string) => {
        return value?.toLowerCase() === pathnameSub
    }

    const checkMockUrl = (value: string) => {
        return value?.toLowerCase() === mock_id
    }

    const currentPath = () => (router.pathname.split('/').length == 3 || router.pathname.split('/').length == 4) ? [router.pathname.split("/")[1]] : []

    const handleOnChangeNavigation = (e: any) => {
    }

    const navigateBack = () => {
        router.back()
    }

    useEffect(() => {
        if (dataProjects) {
            setProjectSelected(dataProjects?.find((x: any) => x.id == pid))
        }
    }, [isLoadingProjects])

    useEffect(() => {
        console.log(menuList)
    }, [menuList]);

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
                (isLoadingProjects || loading) && (
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
                !menuList && (!loading && !isLoadingProjects) ?
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
                    (!loading && !isLoadingProjects) &&
                    (<SideNavigation label="navigation" testId="side-navigation">
                        <Box xcss={sideNavStyle}>
                            <NavigationHeader>
                                <Popup
                                    isOpen={isOpenProject}
                                    onClose={() => setIsOpenProject(false)}
                                    placement="bottom-start"
                                    content={() => <MenuProject data={projects}/>}
                                    trigger={(triggerProps) => (
                                        <Button
                                            isSelected={isOpenProject}
                                            {...triggerProps}
                                            shouldFitContainer
                                            iconBefore={ProjectIcon}
                                            iconAfter={isOpenProject ? ChevronUpIcon : ChevronDownIcon}
                                            onClick={() => setIsOpenProject(!isOpenProject)}
                                        >
                                            {projectSelected?.name || "Selected Project"}
                                        </Button>
                                    )}/>
                                {/*<ButtonItem*/}
                                {/*    iconBefore={<ArrowLeftCircleIcon label={"back"}/>}*/}
                                {/*    onClick={navigateBack}>*/}
                                {/*    {t('go_back')}*/}
                                {/*</ButtonItem>*/}
                            </NavigationHeader>
                            <NavigationContent showTopScrollIndicator>
                                <ButtonItem
                                    isSelected={checkSubUrl("[mock_id]")}
                                    iconBefore={<AddIcon label="add"/>}
                                    onClick={e => navigateToCreateNewMock(e, "create")}>
                                    {t("create_new_endpoint")}
                                </ButtonItem>
                                <ButtonItem
                                    id={"mock"}
                                    isSelected={checkUrl("mocks") && pathnameSub == undefined}
                                    iconBefore={<TasksIcon label="mocks"/>}
                                    onClick={e => navigateToManageMock(e)}>
                                    {t("manage_my_endpoint")}
                                </ButtonItem>
                                {menuList?.length > 0 ?
                                    <Section title="Endpoints" isList>
                                        {
                                            menuList?.map((menu: any, i: number) => {
                                                return (
                                                    <ButtonItem
                                                        id={menu.id}
                                                        key={`${i}-${menu.name}`}
                                                        isSelected={checkMockUrl(menu.id)}
                                                        onClick={e => navigateToDetailMock(e, menu.id, menu.pid, menu.sid, menu.idx)}>
                                                        &nbsp;{menu.name}
                                                    </ButtonItem>
                                                )
                                            })
                                        }
                                    </Section>
                                    : null}
                            </NavigationContent>
                        </Box>
                    </SideNavigation>)
            }
            <ExpandLeftSidebarKeyboardShortcut/>
        </LeftSidebar>
    )
}
export default SideNav