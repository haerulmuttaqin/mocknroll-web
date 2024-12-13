import React, {Fragment, useEffect, useState} from "react";

import {LinkButton} from '@atlaskit/button/new';

import {
    AppSwitcher,
    AtlassianNavigation,
    PrimaryButton,
    PrimaryDropdownButton,
    Settings,
} from '@atlaskit/atlassian-navigation';
import secureLocalStorage from "react-secure-storage";
import {Content, Main} from "@atlaskit/page-layout";
import EmptyState from "@atlaskit/empty-state";
import Image from "@atlaskit/image";
import {Box, xcss} from '@atlaskit/primitives';

const boxStyles = xcss({
    borderColor: 'color.border.discovery',
    borderStyle: 'solid',
    borderRadius: 'border.radius',
    borderWidth: 'border.width',
});

const AtlassianProductHome = () => (
    <Image src={"./assets/images/ems.png"} width={75} height={50} alt="Picture of the author"/>
);
const DefaultAppSwitcher = () => <AppSwitcher tooltip="Switch to..." href="/overviews"/>;
const DefaultSettings = () => <Settings tooltip="Product settings"/>;
const ButtonSignIn = () => <LinkButton appearance="primary" href="/auth">Login</LinkButton>;
const ButtonDashboard = () => <LinkButton href="/overviews">My Dashboard</LinkButton>;


export default function LandingPage() {
    const [isLogin, setIsLogin] = useState<boolean>()
    useEffect(() => {
        setIsLogin(secureLocalStorage.getItem("is_login") as any)
    }, []);
    return (
        <Fragment>
            <AtlassianNavigation
                label="site"
                primaryItems={[
                    <PrimaryButton key={0}>Home</PrimaryButton>,
                    <PrimaryDropdownButton key={1}>Feature</PrimaryDropdownButton>,
                    <PrimaryDropdownButton key={2}>Blog</PrimaryDropdownButton>,
                    <PrimaryButton key={3}>Contact Sales </PrimaryButton>,
                ]}
                renderAppSwitcher={DefaultAppSwitcher}
                renderProductHome={AtlassianProductHome}
                renderSettings={isLogin ? DefaultSettings : undefined}
                renderSignIn={isLogin != undefined ? (isLogin ? ButtonDashboard : ButtonSignIn) : ButtonSignIn}
            />
            <Content>
                <Main>
                    <Box padding="space.400" backgroundColor="color.background.discovery" xcss={boxStyles}></Box>
                    <EmptyState
                        header="Landing Page (Undermaintenance)"
                        description="The page is temporarily unavailable for maintenance, but we'll be up and running shortly. Thank you for your understanding."
                        headingLevel={3}
                        imageUrl={"assets/images/brand_component.png"}
                        imageWidth={400}
                        maxImageHeight={400}
                        maxImageWidth={400}
                    />
                </Main>
            </Content>
        </Fragment>
    );
}
