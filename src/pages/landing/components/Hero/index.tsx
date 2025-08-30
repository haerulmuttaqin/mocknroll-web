/** @jsxImportSource @emotion/react */

import {Box, Stack, xcss, Text, Flex} from "@atlaskit/primitives"
import Button from "@atlaskit/button/new";
import LandingWrapper from "@pages/landing/components/Layout/landing-wrapper";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import secureLocalStorage from "react-secure-storage";
import Image from "next/image";

const LandingPageHero = () => {
    const router = useRouter()
    const [isLogin, setIsLogin] = useState<boolean>()

    const handleSignUp = () => {
        if (isLogin) {
            router.push("/projects")
        } else {
            router.push("/auth")
        }
    }

    useEffect(() => {
        setIsLogin(secureLocalStorage.getItem("is_login") as any)
    }, []);
    return (
        <>
            <Box xcss={xcss({
                paddingTop: "space.1000",
                paddingBottom: "space.1000",
                backgroundSize: "cover",
                backgroundImage: 'url("./assets/images/bg-hero.svg")'
            })}>
                <LandingWrapper>
                    <Box xcss={xcss({
                        paddingTop: "space.100",
                        paddingBottom: "space.1000",
                        textAlign: "center"
                    })}>
                        <a href="https://www.producthunt.com/posts/mock-n-roll?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-mock&#0045;n&#0045;roll"
                           target="_blank" rel="noreferrer"><Image
                            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=827945&theme=neutral&t=1738168224481"
                            alt="Mock&#0032;N&#0039;&#0032;Roll - Mock&#0032;api&#0032;service&#0032;for&#0032;unparalleled&#0032;dev&#0033; | Product Hunt"
                            style={{width: "250px", height: "54px"}} width="250" height="54"/></a>

                        <div className={"heading"}
                             style={{
                                 fontSize: "35px",
                                 fontWeight: "500",
                                 letterSpacing: "-0.03em",
                                 paddingTop: "60px"
                             }}>
                            Mocks API Service for unparalleled Dev!
                        </div>
                        <Box xcss={xcss({paddingTop: "space.100"})}>
                            <Text size={"large"}>
                                Unlock efficient development: Create your ultimate mock in seconds. Streamline
                                workflows, boost productivity, and transform your development process with our
                                cutting-edge API mocking service. Experience seamless integration, real-time
                                collaboration, and expert support.
                            </Text>
                        </Box>
                        <Box xcss={xcss({paddingTop: "space.400", textAlign: "center", marginBottom: "space.1000"})}>
                            <Button onClick={() => router.push("/projects/create")} appearance="primary">Create Project
                                Now</Button>
                            &nbsp;
                            &nbsp;
                            <Button onClick={handleSignUp}
                                    appearance="subtle">{isLogin ? "Go to My Project" : "Sign Up"}</Button>
                        </Box>
                    </Box>
                </LandingWrapper>
            </Box>
        </>
    )
}

export default LandingPageHero