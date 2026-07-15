import React from "react";

const cardData = [
  {
    title: "Placement & Job-Oriented Training & Technical Internship",
    description:
      "Providing opportunities for technical and non-technical roles.",
    link: "/modulei/p&rregister",  ///modulei/p&rhome
  },
  {
    title: "Research & Publication Guidance",
    description: "Expert support for academic and industrial research.",
    link: "/moduleii/research-publication-guidance",
  },
  {
    title: "Corporate Staffing & Manpower Support",
    description: "Streamlined hiring solutions for businesses.",
    link: "/corporate-staffing",
  },
  {
    title: "Web Development Services",
    description: "Professional web design and development solutions.",
    link: "/web-development",
  },
  {
    title: "Employee Training",
    description: "Customized training to boost employee performance.",
    link: "/employee-training",
  },
];

const LandingpageCard = () => {
  return (
    <div className="row row-cols-1 row-cols-md-5 g-4 mt-3 mx-3">
      {cardData.map((card, index) => (
        <div className="col" key={index}>
          <div className="card h-100" style={{ minHeight: "220px"  }}>
            <div className="card-body position-relative ">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.description}</p>
              <a
                href={card.link}
                className="btn btn-primary position-absolute bottom-0 end-0 mb-3 me-3"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LandingpageCard;
