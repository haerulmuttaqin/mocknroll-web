/** @jsxImportSource @emotion/react */

import {Box, Stack, xcss, Text, Flex} from "@atlaskit/primitives"
import Heading from "@atlaskit/heading";
import Button from "@atlaskit/button/new";
import ContentWrapper from "@component/Layout/common/content-wrapper";

const LandingPageHero = () => {
    return (
        <>
            <Box xcss={xcss({
                paddingTop: "space.1000",
                paddingBottom: "space.1000",
                backgroundSize: "cover",
                backgroundImage: 'url("./assets/images/bg-hero.svg")'
            })}>
                <ContentWrapper>
                    <Box xcss={xcss({
                        paddingTop: "space.1000",
                        paddingBottom: "space.1000",
                        textAlign: "center"
                    })}>
                        <Heading level={"h900"}>
                            Build a world class developer experience
                        </Heading>
                        <Box xcss={xcss({paddingTop: "space.100"})}>
                            <Text size={"large"}>
                                Create your ultimate developer experience in days, not months, with easy onboarding and
                                no
                                maintenance costs.
                            </Text>
                        </Box>
                        <Box xcss={xcss({paddingTop: "space.400", textAlign: "center"})}>
                            <Button appearance="primary">Create Project Now</Button>
                            &nbsp;
                            &nbsp;
                            <Button appearance="subtle">Sign Up</Button>
                        </Box>
                    </Box>
                </ContentWrapper>
            </Box>
        </>
    )
}

export default LandingPageHero