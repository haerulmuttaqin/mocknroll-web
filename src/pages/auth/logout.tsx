import React, {useEffect, useState} from "react";
import {Box, Inline, Stack, Text, xcss} from "@atlaskit/primitives";
import Spinner from "@atlaskit/spinner";
import {showFlag} from "@/store/actions/show-flag";
import {useDispatch} from "react-redux";
import secureLocalStorage from "react-secure-storage";
import {useRouter} from "next/router";
import {signOut} from "next-auth/react";

const spinnerStyles = xcss({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    textAlign: "center",
    width: '100%',
    height: '100vh',
});

const SignOut = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [message, setMessage] = useState("Logging out...")
    const onLogout = async () => {
        signOut().then(() => {
            dispatch(
                showFlag({
                    success: true,
                    title: "You're Logged Out",
                }) as any
            );
            secureLocalStorage.setItem("is_login", false)
            router.replace("/")
        })
    };

    useEffect(() => {
        if (secureLocalStorage.getItem("is_login")) {
            onLogout()
        } else {
            router.replace("/")
        }
    }, []);

    return (
        <Box xcss={spinnerStyles}>
            <Stack alignBlock="center">
                <Inline alignInline="center">
                    <Spinner size={"large"}/>
                </Inline>
                <br/>
                <Inline alignInline="center">
                    <Text size={"medium"}>{message}</Text>
                </Inline>
            </Stack>
        </Box>
    )
}

export default SignOut