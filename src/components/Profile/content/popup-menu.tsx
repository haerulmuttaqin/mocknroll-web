import {ButtonItem, MenuGroup, Section} from '@atlaskit/menu';
import React, {SyntheticEvent, useCallback, useEffect, useState} from "react";
import Avatar from "@atlaskit/avatar";
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right'
import {Box, Flex, Text, Stack, xcss} from "@atlaskit/primitives";
import {PopupSelect} from "@atlaskit/select";
import useThemeSwitcher from "@component/Profile/content/ThemeSwither/useThemeSwithcer";
import {useSetColorMode} from "@atlaskit/app-provider";
import {ColorMode} from "@atlaskit/app-provider/theme-provider";
import secureLocalStorage from "react-secure-storage";
import Modal, {ModalTransition} from '@atlaskit/modal-dialog';
import LogoutModal from "@component/Logout";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {useTranslation} from "next-i18next";
import Popup from "@atlaskit/popup";
import LangOptionSmall from "@component/LangOption/small";

const ProfilePopupMenu = () => {
    const router = useRouter()
    const {t, i18n} = useTranslation(['common'])
    const {options, selectedValue} = useThemeSwitcher();
    const setColorMode = useSetColorMode();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenLang, setIsOpenLang] = useState(false);
    const [user, setUser] = useState<any>();
    const openModalLogout = useCallback(() => setIsOpen(true), []);
    const closeModalLogout = useCallback(() => setIsOpen(false), []);
    const {data, status} = useSession()
    const [selectedLang, setSelectedLang] = useState<string>(secureLocalStorage.getItem("lang") as string || "en");

    const onChangeLang = (value: string) => {
        const option = value || "id";
        setSelectedLang(option)
    };

    useEffect(() => {
        i18n.changeLanguage(selectedLang)
        secureLocalStorage.setItem("lang", selectedLang)
    }, [selectedLang]);

    useEffect(() => {
        setColorMode(selectedValue as ColorMode)
        secureLocalStorage.setItem("color_mode", selectedValue)
        setUser(JSON.parse(secureLocalStorage.getItem("user") as string))
    }, [selectedValue])

    const handleProfileSetting = () => {
        router.push("/settings/profile")
    }

    const openMyProject = () => {
        router.push("/projects")
    }

    const openNewProject = () => {
        router.push("/projects/create")
    }

    return (
        <>
            <MenuGroup>
                <Section title={"Account"}>
                    <ButtonItem
                        iconBefore={<Avatar
                            size="medium"
                            name={data?.user?.name as string}
                            src={data?.user?.image as string}
                        />}
                        description={data?.user?.email as string}
                    >
                        {data?.user?.name}
                    </ButtonItem>
                </Section>
                <Section title={t("setting")} hasSeparator>
                    <ButtonItem onClick={handleProfileSetting}>
                        {t("profile_setting")}
                    </ButtonItem>
                    <Popup
                        isOpen={isOpenLang}
                        placement="left-start"
                        onClose={() => setIsOpenLang(false)}
                        content={() =>
                            (
                                <Box onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                                    <Section title={t("lang_setting_desc")}>
                                        <ButtonItem isSelected={selectedLang === 'id'}
                                                    onClick={() => onChangeLang("id")}><LangOptionSmall
                                            optionType={'id'}>{t("lang_id")}</LangOptionSmall></ButtonItem>
                                        <ButtonItem isSelected={selectedLang === 'en'}
                                                    onClick={() => onChangeLang("en")}><LangOptionSmall
                                            optionType={'en'}>{t("lang_en")}</LangOptionSmall></ButtonItem>
                                    </Section>
                                </Box>
                            )
                        }
                        trigger={(triggerProps) => (
                            <ButtonItem
                                {...triggerProps}
                                isSelected={isOpenLang}
                                onClick={() => setIsOpenLang(!isOpenLang)}
                                iconAfter={<ChevronRightIcon label="select language"/>}
                            >
                                {t("lang")}
                            </ButtonItem>
                        )}
                    />
                    <PopupSelect
                        options={options}
                        popperProps={{
                            placement: "left-start",
                            modifiers: [{name: "offset", options: {offset: [-8, 5]}}]
                        }}
                        defaultValue={options.filter((o) => o.isSelected)}
                        closeMenuOnSelect={true}
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
                                {t("theme")}
                            </ButtonItem>
                        )}
                    />
                </Section>
                <Section title={t("projects")} hasSeparator>
                    <ButtonItem onClick={openMyProject}>{t("my_projects")}</ButtonItem>
                    <ButtonItem onClick={openNewProject}>{t("create_new_project")}</ButtonItem>
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