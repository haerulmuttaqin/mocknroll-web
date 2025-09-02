import {MainMenu} from "@/api/data/interfaces";
import ScreenIcon from "@atlaskit/icon/glyph/screen";
import SettingsIcon from "@atlaskit/icon/glyph/settings";
import {Role} from "@/resources/role";
export const adminMenu: MainMenu[] = [
    {
        title: 'Home',
        locale: 'Home',
        icon: ScreenIcon as any,
        route: '/',
        accessor: [Role.SuperAdmin, Role.Admin, Role.User],
    },
]