/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from 'react';
import Image from "@atlaskit/image";
import {
    AppSwitcher,
    AtlassianNavigation,
    PrimaryButton,
    PrimaryDropdownButton,
    Settings
} from "@atlaskit/atlassian-navigation";
import {LinkButton} from "@atlaskit/button/new";
import secureLocalStorage from "react-secure-storage";
import {Box, Inline, media, Text, xcss} from "@atlaskit/primitives";
import Link from "next/link";
import '@/styles/landing.module.css'

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
        {/*<Image src={"./assets/images/logo.svg"} width={50} height={50} alt="Logo"/>*/}
    </Link>
);

const DefaultAppSwitcher = () => <AppSwitcher tooltip="Switch to..." href="/overviews"/>;
const DefaultSettings = () => <Settings tooltip="Product settings"/>;
const ButtonSignIn = () => <LinkButton appearance="primary" href="/auth">Login</LinkButton>;
const ButtonDashboard = () => <LinkButton href="/projects">My Projects</LinkButton>;

const LandingPageNavigation = () => {
    const [isLogin, setIsLogin] = useState<boolean>()
    useEffect(() => {
        setIsLogin(secureLocalStorage.getItem("is_login") as any)
    }, []);
    return (
        <Box xcss={navStyle}>
            <Box xcss={navContainerStyle} id={"landingpage-navigation"}>
                <AtlassianNavigation
                    label="site"
                    primaryItems={[
                        <PrimaryButton key={0}><span className={'charlie-text'} style={{fontSize: "18px", fontWeight: "600"}}>🤘 Mock N&apos; Roll</span></PrimaryButton>,
                        <PrimaryButton key={1}>About</PrimaryButton>,
                    ]}
                    renderProductHome={AtlassianProductHome}
                    renderSettings={isLogin ? DefaultSettings : undefined}
                    renderSignIn={isLogin != undefined ? (isLogin ? ButtonDashboard : ButtonSignIn) : ButtonSignIn}
                />
            </Box>
        </Box>
    )
}

export default LandingPageNavigation