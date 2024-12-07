import {MainMenu} from "@/api/data/interfaces";
import ScreenIcon from "@atlaskit/icon/glyph/screen";
import SettingsIcon from "@atlaskit/icon/glyph/settings";
import {Role} from "@/resources/role";
export const mainMenu: MainMenu[] = [
    {
        title: 'Home',
        locale: 'Home',
        icon: ScreenIcon,
        route: '/',
        accessor: [Role.SuperAdmin, Role.Admin, Role.User],
    },
    {
        title: 'Settings',
        locale: 'setting',
        icon: SettingsIcon,
        route: '/settings',
        accessor: [Role.SuperAdmin, Role.Admin, Role.User],
        subMenu: [
            {
                title: 'Application Settings',
                locale: 'app_setting',
                route: '',
                accessor: [Role.SuperAdmin, Role.Admin, Role.User],
                subMenu: [
                    {
                        title: 'Language',
                        locale: 'lang',
                        route: '/language',
                        accessor: [Role.SuperAdmin, Role.Admin, Role.User]
                    },
                    {
                        title: 'Theme',
                        locale: 'theme',
                        route: '/theme',
                        accessor: [Role.SuperAdmin, Role.Admin, Role.User]
                    },
                ]
            },
        ]
    },
]