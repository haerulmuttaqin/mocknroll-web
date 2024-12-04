import React, {useState} from "react";
import MobileHeader from "@atlaskit/mobile-header";
import {Box} from '@atlaskit/primitives';
import {useColorMode} from "@atlaskit/app-provider";
import SideNav from "@component/SideNav";
import DefaultSettings from "@component/Setting";

const MobileNavigation = (props: any) => {

    const colorScheme = useColorMode()
    const [drawer, setDrawer] = useState({drawerState: 'none', isOpen: false})

    const navOpened = () => {
        setDrawer({drawerState: 'navigation', isOpen: true});
    };

    const sidebarOpened = () => {
        setDrawer({drawerState: 'sidebar', isOpen: true});
    };

    const drawerClosed = () => {
        setDrawer({drawerState: 'none', isOpen: false});
    };

    return (
        <Box id={colorScheme == "light" ? "mobile-header" : "mobile-header-dark"}>
            <MobileHeader
                drawerState={drawer.drawerState}
                menuIconLabel={"Menu"}
                navigation={isOpen =>
                    isOpen && (
                        <SideNav menuList={props.sidebarList}
                                 title={props.sidebarTitle}
                                 shouldHideResizeButton={true}
                                 isMobile={true}
                                 onClick={drawerClosed}
                                 loading={props.loadingSideBar}
                        />
                    )
                }
                secondaryContent={<DefaultSettings/>}
                pageHeading={`ATCS / ${props.title}`}
                onNavigationOpen={navOpened}
                onDrawerClose={drawerClosed}
            />
        </Box>
    );
}

export default MobileNavigation