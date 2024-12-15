/** @jsxImportSource @emotion/react */

import {Box, xcss} from "@atlaskit/primitives"
import Heading from "@atlaskit/heading";
import Image from "@atlaskit/image";
import LandingWrapper from "@pages/landing/components/Layout/landing-wrapper";
import {TerminalContainer} from "@component/ContainerImage";
import {Hidden} from "react-grid-system";

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
                    padding: "space.200",
                    textAlign: "center"
                })}>
                    <Hidden xs sm>
                        <TerminalContainer>
                            <div id="bar">
                                <Image
                                    style={{
                                        width: "auto",
                                        height: "70px",
                                        marginTop: "-23px"
                                    }}
                                    src={"./assets/images/three-dots.svg"}
                                    alt={"terminal-bar"}
                                />
                            </div>
                            <Image
                                id="image__card-terminal"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "top",
                                    backgroundColor: "#282a36"
                                }}
                                src={"./assets/images/demo-terminal.gif"}
                                alt={"terminal"}
                                testId="image"
                            />
                        </TerminalContainer>
                    </Hidden>
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