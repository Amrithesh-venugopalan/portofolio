import React, { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import "./Achievements.css";

// Achievements data
const achievementsData = [
  {
    id: 1,
    title: "100 Days of Code: The Complete Python Pro Bootcamp for 2023",
    provider: "Udemy",
    credentialUrl: "#",
  },
  {
    id: 2,
    title: "Build Responsive Real-World Websites with HTML and CSS",
    provider: "Udemy",
    credentialUrl: "#",
  },
  {
    id: 3,
    title: "Complete web and mobile designer 2023",
    provider: "Udemy",
    credentialUrl: "#",
  },
  {
    id: 4,
    title: "The Complete JavaScript Course 2024: From Zero to Expert",
    provider: "Udemy",
    credentialUrl: "#",
  },
  {
    id: 5,
    title: "React - The Complete Guide 2024 (incl. Next.js, Redux)",
    provider: "Udemy",
    credentialUrl: "#",
  },
  {
    id: 6,
    title: "Node.js, Express, MongoDB & More: The Complete Bootcamp",
    provider: "Udemy",
    credentialUrl: "#",
  },
  {
    id: 7,
    title: "Advanced CSS and Sass: Flexbox, Grid, Animations and More",
    provider: "Udemy",
    credentialUrl: "#",
  },
  {
    id: 8,
    title: "The Web Developer Bootcamp 2024",
    provider: "Udemy",
    credentialUrl: "#",
  },
];

const Achievements = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [achievementsPerPage, setAchievementsPerPage] = useState(4);

  useEffect(() => {
    const updateAchievementsPerPage = () => {
      // Show 4 tiles on all screen sizes
      setAchievementsPerPage(4);
    };

    updateAchievementsPerPage();
    window.addEventListener("resize", updateAchievementsPerPage);
    return () =>
      window.removeEventListener("resize", updateAchievementsPerPage);
  }, []);

  const totalPages = Math.ceil(achievementsData.length / achievementsPerPage);
  const startIndex = (currentPage - 1) * achievementsPerPage;
  const endIndex = startIndex + achievementsPerPage;
  const currentAchievements = achievementsData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const achievementsPage = document.querySelector(".achievements-page");
    if (achievementsPage) {
      achievementsPage.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="achievements-page">
      <div className="achievements-container">
        <div className="achievements-list">
          {currentAchievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className="achievement-card"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Provider name only */}
              <div className="achievement-provider">
                <span className="provider-name">{achievement.provider}</span>
              </div>

              {/* Title */}
              <h3 className="achievement-title">{achievement.title}</h3>

              {/* Show credential link */}
              <a
                href={achievement.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="credential-link"
              >
                Show credential <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn pagination-arrow"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ‹
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="pagination-btn pagination-arrow"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;
