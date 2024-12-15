/** @jsxImportSource @emotion/react */

import {Box, Stack, xcss, Text, Flex} from "@atlaskit/primitives"
import Button from "@atlaskit/button/new";
import LandingWrapper from "@pages/landing/components/Layout/landing-wrapper";
import {useRouter} from "next/router";

const LandingPageHero = () => {
    const router = useRouter()
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
                        paddingTop: "space.300",
                        paddingBottom: "space.1000",
                        textAlign: "center"
                    })}>
                        <div className={"heading"}
                             style={{fontSize: "35px", fontWeight: "500", letterSpacing: "-0.03em"}}>
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
                            <Button onClick={() => router.push("/auth")} appearance="subtle">Sign Up</Button>
                        </Box>
                    </Box>
                </LandingWrapper>
            </Box>
        </>
    )
}

export default LandingPageHero