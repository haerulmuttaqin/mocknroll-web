"use client"
import React from "react";
import dynamic from "next/dynamic";
import LandingPageHero from "@/pages/landing/components/Hero";
import LandingHeaderCards from "@pages/landing/components/HeaderCards";
import LandingFeatures from "@pages/landing/components/Features";
import Footer from "@component/Footer";

const LandingPageLayout = dynamic(
    () => import('./components/Layout/index'),
    {ssr: false}
)

export default function LandingPage() {
    return (
        <LandingPageLayout title={"Generate your mock API"}>
            <LandingPageHero/>
            <LandingHeaderCards/>
            <LandingFeatures/>
            <br/>
            <br/>
            <br/>
            <Footer/>
        </LandingPageLayout>
    );
}
