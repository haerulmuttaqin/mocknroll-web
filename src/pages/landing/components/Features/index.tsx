/** @jsxImportSource @emotion/react */

import {Box, Stack, xcss, Text, Flex} from "@atlaskit/primitives"
import Heading from "@atlaskit/heading";
import ContainerGrid from "@components/ContainerGrid";
import {Col, Row} from "react-grid-system";
import Image from "@atlaskit/image";
import LandingWrapper from "@pages/landing/components/Layout/landing-wrapper";

const cardStyle = xcss({
    margin: "space.100",
    backgroundColor: "elevation.surface.raised",
    boxShadow: "elevation.shadow.raised",
    borderRadius: "border.radius.100",
    transition: "200ms",
    ":hover": {
        backgroundColor: "elevation.surface.hovered",
        cursor: "pointer",
    },
    ':active': {
        backgroundColor: "elevation.surface.pressed",
    },
})

const LandingFeatures = () => {

    return (
        <div style={{marginTop: "100px"}}>
            <LandingWrapper>
                <ContainerGrid>
                    <Row>
                        <Col sm={12} md={4} lg={4}>
                            <Box paddingInlineStart={"space.100"} paddingInlineEnd={"space.300"}>
                                <br/>
                                <br/>
                                <Heading level={"h800"}>
                                    Get Your Custom Endpoint
                                </Heading>
                                <br/>
                                <Stack space="space.100" grow="fill">
                                    <Text size={"large"}>
                                        Unlock the power of tailored solutions with our Custom Endpoint service. Easily
                                        create and manage endpoints that fit your unique requirements, ensuring seamless
                                        integration and optimal performance for your applications. Elevate your
                                        capabilities
                                        and streamline your workflow with precision-engineered endpoints designed just
                                        for you
                                    </Text>
                                </Stack>
                            </Box>
                        </Col>
                        <Col sm={12} md={8} lg={8}>
                            <Image src={"./assets/images/create-endpoint.png"} alt={"Custom Endpoint"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} lg={12}>
                            <Box paddingBlock={"space.600"}></Box>
                        </Col>
                        <Col sm={12} md={8} lg={8}>
                            <Image src={"./assets/images/create-project.png"} alt={"Custom Endpoint"}/>
                        </Col>
                        <Col sm={12} md={4} lg={4}>
                            <Box paddingInlineStart={"space.100"} paddingInlineEnd={"space.300"}>
                                <br/>
                                <br/>
                                <Heading level={"h800"}>
                                    Manage Unlimited Project
                                </Heading>
                                <br/>
                                <Stack space="space.100" grow="fill">
                                    <Text size={"large"}>
                                        Effortlessly manage unlimited projects with precision and ease. Our intuitive
                                        platform enables seamless task delegation, real-time collaboration, and in-depth
                                        progress tracking, ensuring unparalleled productivity and success.
                                    </Text>
                                </Stack>
                            </Box>
                        </Col>
                    </Row>
                </ContainerGrid>
            </LandingWrapper>
            <div className={"gradient-bottom"}></div>
        </div>
    )
}

export default LandingFeatures