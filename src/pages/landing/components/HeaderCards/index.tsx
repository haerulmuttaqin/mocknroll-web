
/** @jsxImportSource @emotion/react */

import {Box, Stack, xcss, Text, Flex} from "@atlaskit/primitives"
import Heading from "@atlaskit/heading";
import Button from "@atlaskit/button/new";
import ContainerGrid from "@components/ContainerGrid";
import {Col, Row} from "react-grid-system";
import ContentWrapper from "@component/Layout/common/content-wrapper";
import Image from "next/image";
import {useState} from "react";
import LandingWrapper from "@pages/landing/components/Layout/landing-wrapper";

const cardStyle = xcss({
    margin: "space.100",
    backgroundColor: "elevation.surface.raised",
    boxShadow: "elevation.shadow.raised",
    borderRadius: "border.radius.200",
    transition: "200ms",
    ":hover": {
        backgroundColor: "elevation.surface.hovered",
        boxShadow: "elevation.shadow.overlay",
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

const LandingHeaderCards = () => {

    return (
        <div style={{marginTop: "-160px"}}>
            <LandingWrapper>
                <ContainerGrid>
                    <Row>
                        {
                            features.map((item: FeatureProps, index: number) =>
                                <Col key={`${item.title}-${index}`} sm={12} md={6} lg={3}>
                                    <Box xcss={cardStyle}>
                                        <div style={{minHeight: "17rem", maxHeight: "19rem", overflow: "hidden"}}>
                                            <Box
                                                xcss={xcss({
                                                    paddingTop: "space.400",
                                                    paddingLeft: "space.200",
                                                    paddingRight: "space.200",
                                                    paddingBottom: "space.300",
                                                })}
                                            >
                                                <Stack space="space.200">
                                                    <Image
                                                        src={item.image}
                                                        alt={""} width={70} height={70}/>
                                                    <Heading level={"h600"}>
                                                        {item.title}
                                                    </Heading>
                                                    <Stack space="space.100" grow="fill">
                                                        <Text size={"medium"}>
                                                            {item.desc}
                                                        </Text>
                                                    </Stack>
                                                </Stack>
                                            </Box>
                                        </div>
                                    </Box>
                                </Col>
                            )
                        }
                    </Row>
                </ContainerGrid>
            </LandingWrapper>
        </div>
    )
}

export default LandingHeaderCards