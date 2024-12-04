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
    const [selected, setSelected] = useState<string>(secureLocalStorage.getItem("lang") as string || "id");
    const {t, i18n} = useTranslation(['common'])

    const onChange = ({currentTarget: {value}}: SyntheticEvent<HTMLInputElement>) => {
        const option = value || "id";
        setSelected(option)
    };

    useEffect(() => {
        i18n.changeLanguage(selected)
        secureLocalStorage.setItem("lang", selected)
    }, [selected]);

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