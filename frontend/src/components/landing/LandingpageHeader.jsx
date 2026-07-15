import React from 'react'
import "../../css/landing/LandingpageHeader.css"

const LandingpageHeader = () => {
  return (
    <>
    <nav className="landingpage-navbar">
      <ul>
        <li>
          <a href="#" className="landingpage-nav-link">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="landingpage-nav-link">
            Contact
          </a>
        </li>
        <li>
          <a href="#" className="landingpage-nav-link">
            About Us
          </a>
        </li>
        
      </ul>
    </nav>
    </>
  )
}

export default LandingpageHeader