"use client"
import React from "react";
import dynamic from "next/dynamic";
import LandingPageHero from "@/pages/landing/components/Hero";
import LandingHeaderCards from "@pages/landing/components/HeaderCards";
import LandingFeatures from "@pages/landing/components/Features";
import Footer from "@component/Footer";
import LandingTerminal from "@pages/landing/components/Terminal";
import LandingSubFeatures from "@pages/landing/components/SubFeatures";

const LandingPageLayout = dynamic(
    () => import('./components/Layout/index'),
    {ssr: false}
)

export default function LandingPage() {
    return (
        <LandingPageLayout title={"Generate your mock API"}>
            <LandingPageHero/>
            <LandingHeaderCards/>
            <LandingTerminal />
            <LandingFeatures/>
            <LandingSubFeatures/>
            <Footer/>
        </LandingPageLayout>
    );
}
