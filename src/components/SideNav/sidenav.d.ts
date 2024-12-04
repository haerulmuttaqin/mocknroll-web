import {Region, RegionProps} from "@/api/data/interfaces/region";
import {AreaProps} from "@/api/data/interfaces/area";

type SideNavContentProps = {
    shouldHideResizeButton?: boolean;
    isOpen?: boolean;
    isMobile?: boolean;
    menuList?: RegionProps | AreaProps | any;
    loading?: boolean;
    title?: string;
    onClick?: () => void;
};
type State = {
    drawerState: 'navigation' | 'sidebar' | 'none',
    isOpen: boolean;
};