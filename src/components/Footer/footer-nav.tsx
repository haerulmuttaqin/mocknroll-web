/** @jsxImportSource @emotion/react */
import React from "react";
import { Box, xcss } from "@atlaskit/primitives";
import { media } from "@atlaskit/primitives/responsive";
import { useTranslation } from "next-i18next";
import { Col, Row } from "react-grid-system";
import ContainerGrid from "@components/ContainerGrid";
import { useRouter } from "next/router";
import LandingWrapper from "@pages/landing/components/Layout/landing-wrapper";

const navLinksStyles = xcss({
    marginBlockStart: "space.200",
    marginBlockEnd: "space.200",
    marginInlineEnd: "space.200",
    padding: "space.0",
    gap: "space.400",
    listStyle: "none",
});

const navLinkStyles = xcss({
    textDecoration: "none",
    paddingBlock: "space.050",
    cursor: "pointer",
    color: "color.text.subtlest",
    ":hover": {
        color: "color.text.subtle",
        textDecoration: "underline",
    },
    ":active": {
        color: "color.text",
    },
});

const footerStyles = xcss({
    backgroundColor: "color.background.neutral",
    gridArea: "footer",
    maxHeight: "50%",
    paddingInline: "space.100",
    paddingBlockStart: "space.300",
    [media.above.sm]: {
        maxHeight: "25%",
        paddingInline: "space.300",
    },
});


const FooterNavigation = () => {
    const { t } = useTranslation(["common"])
    const router = useRouter()
    const navigate = (args: string, isNewTab: boolean = false) => {
        if (isNewTab) {
            window?.open(args);
        } else {
            router?.push(args)
        }
    }
    return (
        <Box id={"footer-nav"} xcss={footerStyles}>
            <LandingWrapper>
                <ContainerGrid>
                    <Row>
                        <Col sm={12} md={6} lg={6}>
                            <h3>{"🤘 Mock N' Roll"}</h3>
                            <p>Mocks API Service for unparalleled Dev!</p>
                            <br />
                            <br />
                        </Col>
                        <Col sm={12} md={3} lg={3}>
                            <h5>Other Tools</h5>
                            <Box as={"ul"} xcss={navLinksStyles}>
                                <Box as={"li"}>
                                    <Box onClick={() => navigate(`https://medium.haeworks.id/`, true)}
                                        xcss={navLinkStyles}>
                                        MediumWebID <b>↗</b>
                                    </Box>
                                </Box>
                                <Box as={"li"}>
                                    <Box
                                        onClick={() => navigate(`https://github.com/haerulmuttaqin/medium-web-id-extension/releases/latest`, true)}
                                        xcss={navLinkStyles}>
                                        MediumWebID Extension <b>↗</b>
                                    </Box>
                                </Box>
                                <Box as={"li"}>
                                    <Box
                                        onClick={() => navigate(`https://ogx.web.id/`, true)}
                                        xcss={navLinkStyles}>
                                        OGX (Open Graph Image Generator) <b>↗</b>
                                    </Box>
                                </Box>

                                <Box as={"li"}>
                                    <Box onClick={() => navigate("/")}
                                        xcss={navLinkStyles}>
                                        Mock N Roll (Mock API Generator)
                                    </Box>
                                </Box>
                                <Box as={"li"}>
                                    <Box onClick={() => navigate("https://cctv.hae.my.id/", true)}
                                        xcss={navLinkStyles}>
                                        CCTV Indonesia <b>↗</b>
                                    </Box>
                                </Box>
                                <Box as={"li"}>
                                    <Box onClick={() => navigate("https://vid-thumb.hae.my.id/", true)}
                                        xcss={navLinkStyles}>
                                        HLS Video Thumbnail <b>↗</b>
                                    </Box>
                                </Box>
                            </Box>
                        </Col>
                        <Col sm={12} md={3} lg={3}>
                            <h5>Sitemap</h5>
                            <Box as={"ul"} xcss={navLinksStyles}>
                                <Box as={"li"}>
                                    <Box onClick={() => navigate("/about")} xcss={navLinkStyles}>
                                        {t("About")}
                                    </Box>
                                </Box>
                                <Box as={"li"}>
                                    <Box onClick={() => navigate(`/privacy-policy`)}
                                        xcss={navLinkStyles}>
                                        {t("Privacy Policy")}
                                    </Box>
                                </Box>
                                <Box as={"li"}>
                                    <Box onClick={() => navigate(`/projects`)}
                                        xcss={navLinkStyles}>
                                        {t("My Projects")}
                                    </Box>
                                </Box>
                                <Box as={"li"}>
                                    <Box
                                        onClick={() => navigate("https://github.com/haerulmuttaqin/mocknroll-web", true)}
                                        xcss={navLinkStyles}>
                                        Github <b>↗</b>
                                    </Box>
                                </Box>
                                <Box as={"li"}>
                                    <Box
                                        onClick={() => navigate("https://github.com/haerulmuttaqin/mocknroll-web/issues", true)}
                                        xcss={navLinkStyles}>
                                        Report Issue <b>↗</b>
                                    </Box>
                                </Box>
                            </Box>
                        </Col>
                    </Row>
                </ContainerGrid>
            </LandingWrapper>
        </Box>
    )
}

export default FooterNavigation
