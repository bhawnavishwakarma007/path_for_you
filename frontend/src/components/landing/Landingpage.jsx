import React from "react";
import LandingpageNavbar from "./LandingpageNavbar";
import LandingpageHeader from "./LandingpageHeader";
import LandingpageHeroSection from "./LandingpageHeroSection";
import LandingpageCard from "./LandingpageCard";
import LandingpageMarquee from "./LandingpageMarquee";
import LandingpageAdvertisementSection from "./LandingpageAdvertisementSection";
import LandingpageImageAd from "./LandingpageImageAd";
import LandingpageFooter from "./LandingpageFooter";
const Landingpage = () => {
  return (
    <>
      <div className="landingpage-app">
        <LandingpageNavbar />
        <LandingpageHeader />
        <LandingpageHeroSection />
        <LandingpageMarquee />
        <LandingpageCard />
        <LandingpageImageAd />
        <LandingpageAdvertisementSection />
        <LandingpageFooter />
      </div>
    </>
  );
};

export default Landingpage;
