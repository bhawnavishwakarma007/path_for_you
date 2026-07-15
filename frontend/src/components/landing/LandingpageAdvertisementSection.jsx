import React, { useState, useEffect } from "react";
import Ad1 from "../../assets/poster/ad1.jpeg";
import Ad2 from "../../assets/poster/ad2.jpeg";
import Ad3 from "../../assets/poster/ad3.jpeg";
import Ad4 from "../../assets/poster/ad4.jpeg";
import Ad5 from "../../assets/poster/ad5.jpeg";
import Ad6 from "../../assets/poster/ad6.jpeg";

const LandingpageAdvertisementSection = () => {
  const [countdown, setCountdown] = useState("");

  const ads = [
    {
      title: "50% Off on Placement Services",
      description:
        "Grab this limited-time offer to connect with top employers.",
      image: Ad1,
      tags: ["Limited Offer", "Placement"],
      rating: 4.5,
      exclusive: true,
    },
    {
      title: "Exclusive Internship Opportunities",
      description:
        "Apply now for top-tier internships across various industries.",
      image: Ad2,
      tags: ["Internship", "Career Growth"],
      rating: 4.8,
      exclusive: true,
    },
    {
      title: "Get Personalized Training",
      description: "Customized training programs for different skill sets.",
      image: Ad3,
      tags: ["Training", "Skill Development"],
      rating: 4.7,
      exclusive: false,
    },
    {
      title: "Exclusive Job Listings",
      description: "Find the latest exclusive job openings in your field.",
      image: Ad4,
      tags: ["Jobs", "Exclusive"],
      rating: 4.6,
      exclusive: true,
    },
    {
      title: "Corporate Partnership Deals",
      description: "Get exclusive deals for business partnerships.",
      image: Ad5,
      tags: ["Business", "Partnership"],
      rating: 4.9,
      exclusive: false,
    },
    {
      title: "Free Web Development Consultation",
      description: "Get a free consultation for your website project.",
      image: Ad6,
      tags: ["Web Development", "Consultation"],
      rating: 4.4,
      exclusive: false,
    },
  ];

  // Countdown Timer
  useEffect(() => {
    const targetDate = new Date().getTime() + 86400000; // 1 day from now
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval);
        setCountdown("EXPIRED");
      } else {
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container py-4">
      <marquee
        className="bg-light text-danger p-2 mb-4 rounded font-weight-bold"
        behavior="scroll"
        direction="left"
      >
        🎉 Limited-time offers available now! Check them out below! 🎉
      </marquee>
      <div className="row">
        {ads.map((ad, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              <img
                src={ad.image}
                alt={ad.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                {ad.exclusive && (
                  <span className="badge bg-warning text-dark mb-2">
                    Exclusive
                  </span>
                )}
                <h5 className="card-title">{ad.title}</h5>
                <p className="card-text text-muted">{ad.description}</p>
                <div className="mb-2">
                  {ad.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="tag me-1 p-2 text-white"
                      style={{
                        backgroundColor: "#007bff", // Blue background color
                        borderRadius: "20px", // Rounded corners
                        fontSize: "14px", // Font size
                        fontWeight: "bold", // Bold text
                        cursor: "pointer", // Cursor pointer for interactivity
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-warning fw-bold">
                  ⭐ {ad.rating.toFixed(1)} / 5
                </p>
                {ad.exclusive && (
                  <p className="text-danger fw-bold">
                    Offer ends in: {countdown}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingpageAdvertisementSection;
