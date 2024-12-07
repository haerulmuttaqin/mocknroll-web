import {ButtonItem, MenuGroup, Section} from '@atlaskit/menu';
import React, {useCallback, useEffect, useState} from "react";
import Avatar from "@atlaskit/avatar";
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right'
import {PopupSelect} from "@atlaskit/select";
import useThemeSwitcher from "@component/Profile/content/ThemeSwither/useThemeSwithcer";
import {useSetColorMode} from "@atlaskit/app-provider";
import {ColorMode} from "@atlaskit/app-provider/theme-provider";
import secureLocalStorage from "react-secure-storage";
import Modal, {ModalTransition} from '@atlaskit/modal-dialog';
import LogoutModal from "@component/Logout";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";

const ProfilePopupMenu = () => {
    const router = useRouter()
    const {options, selectedValue} = useThemeSwitcher();
    const setColorMode = useSetColorMode();
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<any>();
    const openModalLogout = useCallback(() => setIsOpen(true), []);
    const closeModalLogout = useCallback(() => setIsOpen(false), []);

    const {data, status} = useSession()

    useEffect(() => {
        setColorMode(selectedValue as ColorMode)
        secureLocalStorage.setItem("color_mode", selectedValue)
        setUser(JSON.parse(secureLocalStorage.getItem("user") as string))
    }, [selectedValue])

    const handleProfileSetting = () => {
        router.push("/settings/profile")
    }

    return (
        <>
            <MenuGroup>
                <Section title={"Account"}>
                    <ButtonItem
                        iconBefore={<Avatar
                            size="medium"
                            name="ATCS Account"
                            src={data?.user?.image as string}
                        />}
                        description={data?.user?.email as string}
                    >
                        {data?.user?.name}
                    </ButtonItem>
                </Section>
                <Section title="Profile" hasSeparator>
                    <ButtonItem onClick={handleProfileSetting}>
                        Profile Setting
                    </ButtonItem>
                    <PopupSelect
                        options={options}
                        popperProps={{
                            placement: "left-start",
                            modifiers: [{name: "offset", options: {offset: [-8, 5]}}]
                        }}
                        defaultValue={options.filter((o) => o.isSelected)}
                        closeMenuOnSelect={false}
                        onChange={(option) => {
                            if (option) {
                                option.onClick();
                            }
                        }}
                        formatOptionLabel={(option) => option.item}
                        target={({isOpen, ...triggerProps}) => (
                            <ButtonItem
                                isSelected={isOpen}
                                iconAfter={<ChevronRightIcon label="select theme"/>}
                                {...triggerProps}>
                                Theme
                            </ButtonItem>
                        )}
                    />
                </Section>
                <Section hasSeparator>
                    <ButtonItem onClick={openModalLogout}>Logout</ButtonItem>
                </Section>
            </MenuGroup>
            <ModalTransition>
                {isOpen && (
                    <Modal onClose={closeModalLogout} width={"small"}>
                        <LogoutModal/>
                    </Modal>
                )}
            </ModalTransition>
        </>
    )
}

export default ProfilePopupMenu