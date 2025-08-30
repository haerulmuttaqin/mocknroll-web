/** @jsxImportSource @emotion/react */
import type {NextPage} from "next";
import React, {SyntheticEvent, useEffect, useState} from "react";
import dynamic from "next/dynamic";
import secureLocalStorage from "react-secure-storage";
import {Radio} from "@atlaskit/radio";
import {css} from "@emotion/react";
import {token} from "@atlaskit/tokens";
import {B400} from "@atlaskit/theme/colors";
import Grid, {GridItem} from "@atlaskit/grid";
import {Inline} from "@atlaskit/primitives";
import ContentWrapper from "@component/Layout/common/content-wrapper";
import {useTranslation} from "next-i18next";
import LangOption from "@component/LangOption";
import {useRouter} from "next/router";

const Layout = dynamic(
    () => import('@component/Layout/index'),
    {ssr: false}
)

const langOptions = [
    {
        value: "id",
        locale: "lang_id",
        label: "Indonesia"
    },
    {
        value: "en",
        locale: "lang_en",
        label: "English",
    },
];

const Lang: NextPage = () => {
    const router = useRouter();
    const [selected, setSelected] = useState<string>("en");
    const [isClient, setIsClient] = useState(false);
    const {t, i18n} = useTranslation(['common'])

    // Initialize language from localStorage only on client side
    useEffect(() => {
        const storedLang = secureLocalStorage.getItem("lang") as string || "en";
        setSelected(storedLang);
        setIsClient(true);
    }, []);

    const onChange = ({currentTarget: {value}}: SyntheticEvent<HTMLInputElement>) => {
        const option = value || "id";
        setSelected(option)
    };

    useEffect(() => {
        if (isClient && selected) {
            i18n.changeLanguage(selected);
            secureLocalStorage.setItem("lang", selected);
            
            // Update the URL to reflect the language change
            router.push(router.pathname, router.asPath, { locale: selected });
        }
    }, [selected, isClient, i18n, router]);

    // Don't render until we're on the client to prevent hydration mismatch
    if (!isClient) {
        return (
            <Layout title="Language Settings" description="Select your language" isSideNavOpen={true}>
                <ContentWrapper>
                    <Grid>
                        <GridItem>
                            <div>Loading...</div>
                        </GridItem>
                    </Grid>
                </ContentWrapper>
            </Layout>
        );
    }

    return (
        <>
            <Layout title={t('lang_setting')} description={t('lang_setting_desc')} isSideNavOpen={true}>
                <ContentWrapper>
                    <Grid>
                        <GridItem>
                            <Inline spread="space-between" space="space.0">
                                <div role="radiogroup" style={{width: "100%", paddingTop: "8px", paddingBottom: "8px"}}>
                                    {langOptions.map(({value, label, locale}) => {
                                        const isChecked = selected === (value || null);
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
                                                            <LangOption optionType={value}>{t(locale)}</LangOption>
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

export default Lang;