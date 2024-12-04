import {Role} from "@/resources/role";
import {IconProps} from "@atlaskit/icon";
import {Action} from "@/resources/action";
import {NamedExoticComponent} from "react";

interface BaseResponse {
    success: boolean;
    message: string;
    data?: any;
    errors?: any | any[]
}

export interface MainMenu {
    title: string;
    icon?: NamedExoticComponent<IconProps>;
    route: string;
    locale: string;
    subMenu?: MainMenu[];
    accessor?: Role[];
    denied?: UserPermissionProps[];
}

export interface OptionProps {
    label: string | number
    value: string | number
}

interface UserPermissionProps {
    role: Role,
    action: Action[]
}