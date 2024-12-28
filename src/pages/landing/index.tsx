import React from "react";
import LandingPageHero from "@/pages/landing/components/Hero";
import LandingHeaderCards from "@pages/landing/components/HeaderCards";
import LandingFeatures from "@pages/landing/components/Features";
import Footer from "@component/Footer";
import LandingTerminal from "@pages/landing/components/Terminal";
import LandingSubFeatures from "@pages/landing/components/SubFeatures";
import LandingPageLayout from "@pages/landing/components/Layout";


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
