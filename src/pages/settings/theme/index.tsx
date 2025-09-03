/** @jsxImportSource @emotion/react */
import type {NextPage} from "next";
import React, {SyntheticEvent, useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {useColorMode, useSetColorMode} from "@atlaskit/app-provider";
import secureLocalStorage from "react-secure-storage";
import {Radio} from "@atlaskit/radio";
import ThemeOption from "@component/ThemeOption";
import {css} from "@emotion/react";
import {token} from "@atlaskit/tokens";
import {B400} from "@atlaskit/theme/colors";
type ColorMode = "light" | "dark" | "auto";
import Grid, {GridItem} from "@atlaskit/grid";
import {Inline} from "@atlaskit/primitives";
import ContentWrapper from "@component/Layout/common/content-wrapper";
import {useTranslation} from "next-i18next";

const Layout = dynamic(
    () => import('@component/Layout/index'),
    {ssr: false}
)

const themeOptions = [
    {
        value: "light",
        locale: "light",
        label: "Light"
    },
    {
        value: "dark",
        locale: "dark",
        label: "Dark",
        includeBetaPill: true
    },
    {
        value: "auto",
        locale: "match_browser",
        label: "Match browser",
        meta: "follow system settings",
        includeBetaPill: true
    }
];

const Company: NextPage = () => {
    const colorMode = useColorMode();
    const {t} = useTranslation(['common'])
    const [theme, setTheme] = useState(colorMode as string || secureLocalStorage.getItem("color_mode") || "light");
    const setColorMode = useSetColorMode();

    const onChange = ({currentTarget: {value}}: SyntheticEvent<HTMLInputElement>) => {
        const option = value || "light";
        secureLocalStorage.setItem("color_mode", option)
        setTheme(option);
        setColorMode(option as ColorMode)
    };

    useEffect(() => {
        setTheme(colorMode);
    }, [theme, colorMode]);

    return (
        <>
            <Layout title={t('theme_setting')} description={t('theme_setting_desc')} isSideNavOpen={true}>
                <ContentWrapper>
                    <Grid>
                        <GridItem>
                            <Inline spread="space-between" space="space.0">
                                <div role="radiogroup" style={{width: "100%", paddingTop: "8px", paddingBottom: "8px"}}>
                                    {themeOptions.map(({value, label, locale}) => {
                                        const isChecked = theme === (value || null);
                                        const buttonStyles = css(
                                            {padding: "4px"},
                                            isChecked && {
                                                backgroundColor: token("color.background.selected"),
                                                boxShadow: `inset 2px 0px 0px ${token(
                                                    "color.border.selected",
                                                    B400
                                                )}`
                                            }
                                        );
                                        return (
                                            <div css={buttonStyles} key={value}>
                                                <Radio
                                                    isChecked={isChecked}
                                                    label={
                                                        <span style={{paddingTop: 200}}>
                                                            <ThemeOption optionType={value}>{t(locale)}</ThemeOption>
                                                        </span>
                                                    }
                                                    onChange={onChange}
                                                    value={value}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </Inline>
                        </GridItem>
                    </Grid>
                </ContentWrapper>
            </Layout>
        </>
    );
};

export default Company;