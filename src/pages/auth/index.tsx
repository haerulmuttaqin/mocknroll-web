'use client'
/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from 'react';
import type {NextPage} from "next";
import dynamic from "next/dynamic";
import {FlagsProvider} from "@atlaskit/flag";
import {Box, Flex, Text, xcss} from "@atlaskit/primitives";
import Grid, {GridItem} from "@atlaskit/grid";
import Heading from "@atlaskit/heading";
import ContentWrapper from "@component/Layout/common/content-wrapper";
import {useTranslation} from "next-i18next";
import {signOut, useSession, signIn} from "next-auth/react";
import Button from "@atlaskit/button/new";
import {cardBasicStyle, cardStyle} from "@component/Common/style-util";
import {SpinnerWrapper} from "@atlaskit/media-ui/modalSpinner";
import SpinnerLoading from "@component/Spinner";

import {actionSignIn} from "@api/data/services/auth";
import {useDispatch} from "react-redux";
import {showFlag} from '@store/actions/show-flag';
import CheckAuth from '@protected/check-auth';
import secureLocalStorage from "react-secure-storage";

const Layout = dynamic(
    () => import('@component/Layout'),
    {ssr: false}
)

const GoogleSVG = () => (
    <svg width="21px" height="21px" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg"
         preserveAspectRatio="xMidYMid">
        <path
            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            fill="#4285F4"/>
        <path
            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            fill="#34A853"/>
        <path
            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            fill="#FBBC05"/>
        <path
            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            fill="#EB4335"/>
    </svg>
);

const GithubSVG = () => (
    <svg width="21px" height="21px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">

        <title>github [#142]</title>
        <desc>Created with Sketch.</desc>
        <defs>

        </defs>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="#000000">
                <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                        d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                        id="github-[#142]">

                    </path>
                </g>
            </g>
        </g>
    </svg>
);

const Auth: NextPage = () => {
    const {t} = useTranslation(['common'])
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {data: session, status} = useSession();
    const [githubError, setGithubError] = useState<string | null>(null);



    const onAuth = async () => {
        setIsLoading(true)
        const payload = {
            email: session?.user?.email as string,
            name: session?.user?.name as string,
            image: session?.user?.image as string,
            auth_method: "oauth", // Since we're using OAuth providers
        }
        await actionSignIn(payload)
            .then((res) => {
                setIsLoading(false)
                if (!res.success) {
                    showError(res)
                } else {
                    window.location.href = window.location.protocol + "//" + window.location.host + "/projects"
                }
            })
            .catch((err) => {
                setIsLoading(false)
                showError(err)
            })
    };

    if (status === 'loading' || isLoading) return (
        <Flex>
            <SpinnerWrapper>
                <SpinnerLoading size={"large"}/>
            </SpinnerWrapper>
        </Flex>
    );
    else if (status === 'authenticated') {
        if (!secureLocalStorage.getItem("is_login")) {
            onAuth()
        }
    }

    const showError = (err: any) => {
        dispatch(
            showFlag({
                success: false,
                title: "Login failed",
                message: err.message
            }) as any
        );
    }

    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/projects" });
    };

    const handleGithubSignIn = () => {
        setGithubError(null);
        signIn("github", { callbackUrl: "/projects" });
    };

    return (
        <FlagsProvider>
            <Layout
                shouldShowBreadcrumbs={false}
                shouldShowNavBar={false}
            >
                <ContentWrapper>
                    <Box
                        xcss={xcss({justifyContent: "center", alignItems: "center", paddingBlock: "space.1000"})}
                    >
                        <Grid maxWidth="wide">
                            <GridItem start={{md: 3}} span={{md: 8}}>
                                <Box xcss={cardBasicStyle}>
                                    <Box xcss={xcss({
                                        padding: "space.400",
                                    })}>
                                        <Flex direction={"column"} gap={"space.100"} justifyContent={"center"}>
                                            <Heading level="h800">
                                                <span className={'charlie-text'}
                                                      style={{
                                                          marginInlineEnd: "20px"
                                                      }}>🤘 Mock N&apos; Roll</span>
                                            </Heading>
                                            <Text>Sign in to continue managing your magic Mocks API.</Text>
                                            <br/>
                                            <Button
                                                onClick={handleGoogleSignIn}>
                                                <Flex justifyContent={"center"} alignItems={"center"}>
                                                    <GoogleSVG/>&nbsp;&nbsp;Sign In with Google
                                                </Flex>
                                            </Button>
                                            <Button
                                                onClick={handleGithubSignIn}
                                            >
                                                <Flex justifyContent={"center"} alignItems={"center"}>
                                                    <GithubSVG/>&nbsp;&nbsp;Sign In with Github
                                                </Flex>
                                            </Button>
                                            {githubError && (
                                                <Box xcss={xcss({color: "color.text.danger", marginTop: "space.200"})}>
                                                    <Text>{githubError}</Text>
                                                </Box>
                                            )}
                                        </Flex>
                                    </Box>
                                </Box>
                            </GridItem>
                        </Grid>
                    </Box>
                </ContentWrapper>
            </Layout>
        </FlagsProvider>
    );
};

export default CheckAuth(Auth);