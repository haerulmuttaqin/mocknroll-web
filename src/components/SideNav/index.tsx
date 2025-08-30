import {LeftSidebar} from "@atlaskit/page-layout";
import Tooltip from "@atlaskit/tooltip";
import {
    ButtonItem,
    Header,
    LoadingItems,
    NavigationContent,
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
import {useTranslation} from "next-i18next";
import {Box, xcss} from "@atlaskit/primitives";
import Popup from "@atlaskit/popup";
import Button from "@atlaskit/button/new";
import ChevronUpIcon from "@atlaskit/icon/utility/chevron-up";
import ChevronDownIcon from "@atlaskit/icon/utility/chevron-down";
import ProjectIcon from '@atlaskit/icon/core/project';

import {ButtonItem as ButtonItemMenu, MenuGroup, Section as SectionMenu} from '@atlaskit/menu';
import {useFetchProjects} from "@pages/projects/data/remote";
import {ProjectProps} from "@api/data/interfaces/project";
import AddIcon from '@atlaskit/icon/glyph/add';
import TasksIcon from "@atlaskit/icon/glyph/subtask";
import Lozenge from "@atlaskit/lozenge";
import {getMethodType} from "@utils/utils";

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
    const [isClient, setIsClient] = useState(false)

    const pathname = router.pathname.split('/')[1]?.toLowerCase()
    const pathnameSub = router.pathname.split('/')[2]?.toLowerCase()

    const [isOpenProject, setIsOpenProject] = useState(false);
    const [projects, setProjects] = useState<any>(JSON.parse(secureLocalStorage.getItem("companies") as string))
    
    // Ensure we're on the client side to prevent hydration issues
    useEffect(() => {
        setIsClient(true);
    }, []);

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

    // Don't render until we're on the client to prevent hydration mismatch
    if (!isClient) {
        return (
            <LeftSidebar
                id={isMobile ? "left-sidebar-mobile" : "left-sidebar"}
                skipLinkTitle="Navigation"
                width={280}
                isFixed={false}
                isResizable={!shouldHideResizeButton}
                testId="left-sidebar"
            >
                <div style={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    Loading...
                </div>
            </LeftSidebar>
        );
    }

    return (
        <LeftSidebar
            id={isMobile ? "left-sidebar-mobile" : "left-sidebar"}
            skipLinkTitle="Navigation"
            width={280}
            isFixed={false}
            isResizable={!shouldHideResizeButton}
            testId="left-sidebar"
        >
            <SideNavigation label="Project navigation" testId="side-navigation">
                <NavigationHeader>
                    <Header description="Next.js sidebar example">
                        {title}
                    </Header>
                </NavigationHeader>
                <NavigationContent>
                    <NestableNavigationContent
                        initialStack={[]}
                        testId="nestable-navigation-content"
                    >
                        <NestingItem
                            id="projects"
                            title="Projects"
                            iconBefore={<ProjectIcon label="" />}
                            isSelected={checkUrl("projects")}
                            onClick={(e) => navigateTo(e, "/projects")}
                        >
                            <NestingItem
                                id="create-project"
                                title="Create Project"
                                isSelected={checkUrl("create")}
                                onClick={(e) => navigateTo(e, "/projects/create")}
                            />
                        </NestingItem>
                        <NestingItem
                            id="mocks"
                            title="Mocks"
                            iconBefore={<TasksIcon label="" />}
                            isSelected={checkUrl("mocks")}
                            onClick={(e) => navigateTo(e, "/mocks")}
                        >
                            {projectSelected && (
                                <NestingItem
                                    id="create-mock"
                                    title="Create Mock"
                                    isSelected={checkUrl("create")}
                                    onClick={(e) => navigateToCreateNewMock(e, "create")}
                                />
                            )}
                        </NestingItem>
                    </NestableNavigationContent>
                </NavigationContent>
            </SideNavigation>
        </LeftSidebar>
    );
};

export default SideNav;