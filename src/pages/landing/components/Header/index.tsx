/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from 'react';
import {AtlassianNavigation, PrimaryButton} from "@atlaskit/atlassian-navigation";
import {IconButton} from "@atlaskit/button/new";
import secureLocalStorage from "react-secure-storage";
import {Box, xcss} from "@atlaskit/primitives";
import Link from "next/link";
import '@/styles/landing.module.css'
import DefaultProfile from "@component/Profile";
import {ButtonItem, MenuGroup, Section} from "@atlaskit/menu";
import ChevronRightIcon from "@atlaskit/icon/glyph/chevron-right";
import {PopupSelect} from "@atlaskit/select";
import useThemeSwitcher from "@component/Profile/content/ThemeSwither/useThemeSwithcer";
import {useSetColorMode} from "@atlaskit/app-provider";
import {useTranslation} from "next-i18next";
import Popup from "@atlaskit/popup";
import LangOptionSmall from "@component/LangOption/small";
import MenuIcon from '@atlaskit/icon/core/menu';
type ColorMode = "light" | "dark" | "auto";
import {useRouter} from "next/router";

const navStyle = xcss({
    borderBottomWidth: "1px",
    borderBottomColor: "color.border.disabled",
    borderBottomStyle: "solid",
    backgroundColor: "elevation.surface"
})

const navContainerStyle = xcss({
    height: "auto",
    width: "80rem",
    maxWidth: "100%",
    left: "space.0",
    right: "space.0",
    paddingLeft: "space.100",
    paddingRight: "space.100",
    margin: "auto",
})

const AtlassianProductHome = () => (
    <Link href={"/"}>
        <span className={'charlie-text'}
              style={{fontSize: "18px", fontWeight: "600", marginInlineEnd: "20px"}}>🤘 Mock N&apos; Roll</span>
    </Link>
);

const ButtonSignIn = () => {
    const {t, i18n} = useTranslation(['common'])
    const router = useRouter()
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {options, selectedValue} = useThemeSwitcher();
    const setColorMode = useSetColorMode();
    const [isOpenLang, setIsOpenLang] = useState(false);
    const [selectedLang, setSelectedLang] = useState<string>(secureLocalStorage.getItem("lang") as string || "en");

    const onClick = () => {
        setIsOpen(!isOpen);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    const onChangeLang = (value: string) => {
        const option = value || "id";
        setSelectedLang(option)
    };

    const handleSignIn = () => {
        router.push("/auth")
    }

    useEffect(() => {
        i18n.changeLanguage(selectedLang)
        secureLocalStorage.setItem("lang", selectedLang)
    }, [selectedLang]);

    useEffect(() => {
        setColorMode(selectedValue as ColorMode)
        secureLocalStorage.setItem("color_mode", selectedValue)
    }, [selectedValue])

    return (
        <Popup
            isOpen={isOpen}
            onClose={onClose}
            placement="bottom-end"
            content={() => (
                <MenuGroup>
                    <Section title={"Account"}>
                        <ButtonItem onClick={handleSignIn}>
                            Sign In
                        </ButtonItem>
                    </Section>
                    <Section title={t("setting")} hasSeparator>
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
                </MenuGroup>
            )}
            trigger={(triggerProps) => (
                <IconButton
                    onClick={onClick}
                    appearance="subtle"
                    icon={MenuIcon as any}
                    isSelected={isOpen}
                    label={"More"}
                    {...triggerProps}
                />
            )}
        />
    )
};

const LandingPageNavigation = () => {
    const [isLogin, setIsLogin] = useState<boolean>()
    const router = useRouter()

    const handleFeatureClick = () => {
        router.push("#features")
    }
    const handleAboutClick = () => {
        router.push("/about")
    }

    const handleGithubClick = () => {
        window.open("https://github.com/haerulmuttaqin/mocknroll-web", "_blank", "noopener,noreferrer")
    }

    useEffect(() => {
        setIsLogin(secureLocalStorage.getItem("is_login") as any)
    }, []);
    return (
        <Box xcss={navStyle}>
            <Box xcss={navContainerStyle} id={"landingpage-navigation"}>
                <AtlassianNavigation
                    label="site"
                    primaryItems={[
                        <PrimaryButton key={0} onClick={handleFeatureClick}>Features</PrimaryButton>,
                        <PrimaryButton key={1} onClick={handleAboutClick}>About</PrimaryButton>,
                        <PrimaryButton key={2} onClick={handleGithubClick}>Github <b>↗</b></PrimaryButton>,
                    ]}
                    renderProductHome={AtlassianProductHome}
                    renderSignIn={isLogin != undefined ? (isLogin ? DefaultProfile : ButtonSignIn) : ButtonSignIn}
                />
            </Box>
        </Box>
    )
}

export default LandingPageNavigation