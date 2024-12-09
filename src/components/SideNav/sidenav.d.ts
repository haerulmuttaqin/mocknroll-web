import {Region, RegionProps} from "@/api/data/interfaces/region";
import {AreaProps} from "@/api/data/interfaces/area";
import {ProjectProps} from "@api/data/interfaces/project";

type SideNavContentProps = {
    shouldHideResizeButton?: boolean;
    isAdmin?: boolean;
    isOpen?: boolean;
    isMobile?: boolean;
    menuList?: ProjectProps | AreaProps | any;
    loading?: boolean;
    title?: string;
    onClick?: () => void;
};
type State = {
    drawerState: 'navigation' | 'sidebar' | 'none',
    isOpen: boolean;
};