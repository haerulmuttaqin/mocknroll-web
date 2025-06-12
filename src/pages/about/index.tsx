'use client'
/** @jsxImportSource @emotion/react */
import React, {useRef} from 'react';
import type {NextPage} from "next";
import dynamic from "next/dynamic";
import {FlagsProvider} from "@atlaskit/flag";
import {Box, Stack, xcss, Inline} from "@atlaskit/primitives";
import Heading from "@atlaskit/heading";
import {token} from "@atlaskit/tokens";
import ContentWrapper from "@component/Layout/common/content-wrapper";
import {useTranslation} from "next-i18next";
import {useColorMode} from "@atlaskit/app-provider";
import Content from "@/pages/main/content";

const Layout = dynamic(
    () => import('@component/Layout'),
    {ssr: false}
)

const About: NextPage = () => {
    const {t} = useTranslation(['common'])

    return (
        <FlagsProvider>
            <Layout
                shouldShowBreadcrumbs={false}
                title={t("About")}
                shouldShowPageHeader={false}
            >
                <ContentWrapper>
                    <Box xcss={xcss({paddingTop: "space.400", paddingBottom: "space.400"})}>
                        <Inline spread="space-between" space="space.0">
                            <Heading level="h800" as="h2">
                                {t("About")}
                            </Heading>
                        </Inline>
                        <p>Streamline your development workflow! Our platform offers instant mock API creation, real-time testing, and seamless integration</p>
                    </Box>
                    <Box>
                        <section id="our-story">
                            <h3>Our Story</h3>
                            <p>
                                Mock n Roll was founded on the principle that API development shouldnt be complicated.
                                Our team, comprised of experienced developers and tech enthusiasts, sought to streamline
                                the process. We created an intuitive platform to simplify API mocking, empowering
                                developers worldwide.
                            </p>
                        </section>
                        <br/>
                        <section id="mission">
                            <h3>Mission</h3>
                            <p>
                                Our mission is to provide an exceptional developer experience, fostering creativity,
                                productivity and innovation. We strive to make API mocking effortless, efficient and
                                accessible.
                            </p>
                        </section>
                        <br/>
                        <section id="features">
                            <h3>Key Features</h3>
                            <ul>
                                <li>Instant Mocking: Create mock APIs in seconds</li>
                                <li>Intuitive Interface: User-friendly design for seamless navigation</li>
                                <li>Real-time Testing: Validate APIs instantly</li>
                                <li>Scalable Infrastructure: Reliable and secure</li>
                                <li>Collaboration Tools: Streamline team workflows</li>
                            </ul>
                        </section>
                        <br/>
                        <section id="benefits">
                            <h3>Benefits</h3>
                            <ul>
                                <li>Accelerated Development: Save time, boost productivity</li>
                                <li>Enhanced Collaboration: Simplify team workflows</li>
                                <li>Improved Testing: Ensure API reliability</li>
                                <li>Increased Efficiency: Focus on core development tasks</li>
                            </ul>
                        </section>
                        <br/>
                        <section id="our-values">
                            <h3>Our Values</h3>
                            <ul>
                                <li>Innovation: Embracing cutting-edge technologies</li>
                                <li>Simplicity: Making complex tasks effortless</li>
                                <li>Community: Supporting developers worldwide</li>
                                <li>Excellence: Delivering exceptional user experiences</li>
                            </ul>
                        </section>
                        <br/>
                        <section id="contact">
                            <h3>Get in Touch</h3>
                            <p>
                                Email: <a
                                href="mailto:email.haerulmuttaqin@gmail.com">email.haerulmuttaqin@gmail.com</a> / <a
                                href="mailto:contact@hae.my.id">contact@hae.my.id</a>
                            </p>
                            <p>
                                LinkedIn:{" "}
                                <a href="https://id.linkedin.com/in/haerulmuttaqin" target="_blank" rel="noreferrer">
                                    Haerul Muttaqin
                                </a>
                            </p>
                            <p>
                                GitHub:{" "}
                                <a href="https://github.com/haerulmuttaqin" target="_blank" rel="noreferrer">
                                    Haerul Muttaqin
                                </a>
                            </p>
                            <p>
                                Website:{" "}
                                <a href="https://hae.my.id" target="_blank" rel="noreferrer">
                                    Haerul Muttaqin (https://hae.my.id)
                                </a>
                            </p>
                        </section>
                        <br/>
                        <br/>
                    </Box>
                </ContentWrapper>
            </Layout>
        </FlagsProvider>
    );
};

export default About;