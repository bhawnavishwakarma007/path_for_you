import React from "react";
import '../../css/landing/LandingpageHeroSection.css'
import Poster from '../../assets/poster/Final_logo2 copy.png'
const LandingpageHeroSection = () => {
  return (
    <>
    <section className="hero">
    <img src= {Poster} alt="poster" className="hero-image1" />
    </section>
    </>
  );
};

export default LandingpageHeroSection;
