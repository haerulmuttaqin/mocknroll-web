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

interface FeatureProps {
    title: string
    desc: string
    image: string
}

const features: FeatureProps[] = [
    {
        title: "Free & Unlimited",
        desc: "Mock N' Roll is free to use, no ads, no hidden subscriptions or service limits. Your mocks will be available forever",
        image: "https://wac-cdn-bfldr.atlassian.com/K3MHR9G8/at/mk553cskk88f65k68cbsk353/Icon-Checkmark.svg"
    },
    {
        title: "Developer Friendly",
        desc: "Mock N' Roll is compatible with JS, Mobile and Server applications, featuring CORS, JSONP and GZIP responses. No authentication, just call it!",
        image: "https://wac-cdn-bfldr.atlassian.com/K3MHR9G8/at/gb5s8vfb4rvbmpf8nncg2h/Icon-Certification.svg"
    },
    {
        title: "Total control",
        desc: "New in Mock N' Roll, you can now update or delete your mocks at any time. The next release will go further and offer you request inspector.",
        image: "https://wac-cdn-bfldr.atlassian.com/K3MHR9G8/at/2qmscb2qr53mwvhxm9rw6spk/Icon-Chat.svg"
    },
    {
        title: "Unblock Client Teams",
        desc: "Stop waiting for backend APIs. Start building UI features immediately. Teams report 60% faster development cycles.",
        image: "https://wac-cdn-bfldr.atlassian.com/K3MHR9G8/at/chsr65pwjsg84gj6rqchv/Icon-Rocket.svg"
    },
]

const LandingFeatures = () => {

    return (
        <div style={{marginTop: "100px"}}>
            <LandingWrapper>
                <ContainerGrid>
                    <Row>
                        <Col sm={12} md={4} lg={4}>
                            <br/>
                            <br/>
                            <Heading level={"h800"}>
                                Get Your Custom Endpoint
                            </Heading>
                            <br/>
                            <Stack space="space.100" grow="fill">
                                <Text size={"medium"}>
                                    Unlock the power of tailored solutions with our Custom Endpoint service. Easily
                                    create and manage endpoints that fit your unique requirements, ensuring seamless
                                    integration and optimal performance for your applications. Elevate your capabilities
                                    and streamline your workflow with precision-engineered endpoints designed just for
                                    you
                                </Text>
                            </Stack>
                        </Col>
                        <Col sm={12} md={8} lg={8}>
                            <Image src={"./assets/images/Catalog_Activity.webp"} alt={"Custom Endpoint"}/>
                        </Col>
                    </Row>
                </ContainerGrid>
            </LandingWrapper>
        </div>
    )
}

export default LandingFeatures