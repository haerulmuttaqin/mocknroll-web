/** @jsxImportSource @emotion/react */

import {Box, Stack, xcss, Text, Flex} from "@atlaskit/primitives"
import Heading from "@atlaskit/heading";
import ContainerGrid from "@components/ContainerGrid";
import {Col, Row} from "react-grid-system";
import Image from "@atlaskit/image";
import LandingWrapper from "@pages/landing/components/Layout/landing-wrapper";
import {ImageContainer, TerminalContainer} from "@component/ContainerImage";

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

const LandingTerminal = () => {

    return (
        <div style={{marginTop: "40px"}}>
            <LandingWrapper>
                <Box id={"container__card-terminal"} xcss={xcss({
                    padding: "space.300",
                    textAlign: "center"
                })}>
                    <TerminalContainer>
                        <Image
                            id="image__card-terminal"
                            style={{
                                width: "100%",
                                objectFit: "cover",
                                objectPosition: "70% center",
                                scale: 1.043,
                            }}
                            src={"./assets/images/terminal.gif"}
                            alt={"terminal"}
                            testId="image"
                        />
                    </TerminalContainer>
                    <br/>
                    <br/>
                    <Heading level={"h800"}>
                        Supercharge your engineering teams with <a href={"#"}>mocknroll.me</a> Mock API
                    </Heading>
                </Box>
            </LandingWrapper>
        </div>
    )
}

export default LandingTerminal