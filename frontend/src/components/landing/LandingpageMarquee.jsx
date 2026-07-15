import React from 'react';

const LandingpageMarquee = () => {
  return (
    <div className="landingpage-marquee-container">
      <div 
        className="landingpage-marquee text-white p-3" 
        style={{ backgroundColor: '#0d6efd' }}
      >
        <marquee>Welcome to our website! Enjoy browsing.</marquee>
      </div>
    </div>
  );
};

export default LandingpageMarquee;
