import React from "react";
import '../../css/RnP/ResearchGuidance.css';

function ResearchGuidance() {
  return (
    <div className="research-guidance-rg">
      <div className="sidebar-rg">
        <h2>ResearchMaster</h2>
        <ul>
          <li className="active">Thesis Guidance</li>
          <li>Synopsis</li>
          <li>Paper Publications</li>
          <li>PPT Guidance</li>
        </ul>
      </div>
      <div className="main-content-rg">
        <header className="topbar-rg">
          <h3>Thesis Guidance</h3>
          <input type="text" placeholder="Search..." />
        </header>
        <div className="content-area-rg">
          <h1>Thesis Guidance Page</h1>
          <p>Step-by-step thesis-writing tutorials, tips, and resources.</p>
          <div className="thesis-tips-rg">
            <div className="tip-rg">
              <h3>Thesis Tips</h3>
              <p>Step-by-step thesis-writing tutorials, tips, and resources.</p>
            </div>
            <div className="tip-rg">
              <h3>Synopsis Tips</h3>
              <p>Tools for creating a compelling synopsis.</p>
            </div>
            <div className="tip-rg">
              <h3>Research Paper Management</h3>
              <p>Options to submit and manage research papers.</p>
            </div>
            <div className="tip-rg">
              <h3>PPT Templates</h3>
              <p>Templates and guidelines for presentations.</p>
            </div>
          </div>
          <div className="additional-materials-rg">
            <h3>Additional Materials</h3>
            <ul>
              <li>Thesis Guidance Page</li>
              <li>Synopsis Page</li>
              <li>Paper Publications Page</li>
              <li>PPT Guidance Page</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResearchGuidance;
