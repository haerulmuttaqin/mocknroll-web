import {ReactElement, ReactNode} from 'react';
import {RegionProps} from "@/api/data/interfaces/region";
import {AreaProps} from "@/api/data/interfaces/area";

interface FlagProps {
    show?: boolean,
    title?: string,
    message?: string,
    success?: boolean,
    goBack?: boolean,
}

interface DispatchFlagProps {
    type: string,
    payload?: FlagProps,
}

export interface LayoutProps {
    children: ReactNode;
    isAdmin?: boolean;
    isSideNavOpen?: boolean;
    title?: string;
    description?: string;
    renderAction?: ReactElement;
    renderBottomBar?: ReactElement;
    shouldShowDescription?: boolean;
    shouldShowBreadcrumbs?: boolean;
    shouldShowPageHeader?: boolean;
    shouldShowNavBar?: boolean;
    shouldShowFooter?: boolean;
    sidebarList?: RegionProps | AreaProps | any;
    sidebarTitle?: string,
    loadingSidebar?: boolean;
}

export interface LayoutCommonProps {
    children: ReactNode;
    title: string;
}

interface ModulePermissionProps {

}

export interface LandingPageLayoutProps {
    children: ReactNode;
    title: string;
    description?: string;
}