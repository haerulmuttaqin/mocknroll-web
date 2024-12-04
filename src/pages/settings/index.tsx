/** @jsxImportSource @emotion/react */
import type {NextPage} from "next";
import React from "react";
import dynamic from "next/dynamic";
import {ButtonItem, MenuGroup, Section} from '@atlaskit/menu';
import {useRouter} from "next/router";
import ContentWrapper from "@component/Layout/common/content-wrapper";
import {useTranslation} from "next-i18next";
import MediaServicesBrushIcon from '@atlaskit/icon/glyph/media-services/brush'
import FlagFilledIcon from '@atlaskit/icon/glyph/flag-filled'

const Layout = dynamic(
    () => import('@component/Layout'),
    {ssr: false}
)

const Settings: NextPage = () => {
    const {t} = useTranslation(['common'])
    const router = useRouter()
    const navigateToSetting = (setting: string) => {
        router.push(`/settings/${setting}`)
    }
    return (
        <>
            <Layout
                title={t('app_setting')}
                description={t('app_setting_desc')}
                isSideNavOpen={true}
            >
                <ContentWrapper>
                    <MenuGroup>
                        <Section title={t('setting_category')}>
                            <ButtonItem
                                iconBefore={<FlagFilledIcon label={t('lang_setting')}/>}
                                description={t('lang_setting_desc')}
                                onClick={() => navigateToSetting("language")}
                            >
                                {t('lang_setting')}
                            </ButtonItem>
                            <ButtonItem
                                iconBefore={<MediaServicesBrushIcon label={t('theme_setting')}/>}
                                description={t('change_your_theme')}
                                onClick={() => navigateToSetting("theme")}
                            >
                                {t('theme_setting')}
                            </ButtonItem>
                        </Section>
                    </MenuGroup>
                </ContentWrapper>
            </Layout>
        </>
    );
};

export default Settings;