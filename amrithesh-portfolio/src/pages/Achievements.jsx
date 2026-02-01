import React, { useState, useEffect, useRef } from "react";
import { Award, ExternalLink } from "lucide-react";
import "./Achievements.css";
import udemy from "../assets/udemy.png";

// Achievements data
const achievementsData = [
  {
    id: 1,
    title: "100 Days of Code: The Complete Python Pro Bootcamp for 2023",
    provider: "Udemy",
    image: udemy,
    skills: [
      "Python",
      "Data Structures",
      "Automation",
      "Web Scraping",
      "HTML5",
      "CSS3",
      "Flexbox",
      "Grid",
      "Responsive Design",
      "UI Design",
      "UX Design",
      "Figma",
      "Mobile Design",
    ],
    credentialUrl: "http://ude.my/UC-ddec271d-03ff-4b38-9474-f7f530660686",
  },
  {
    id: 2,
    title: "Build Responsive Real-World Websites with HTML and CSS",
    provider: "Udemy",
    image: udemy,
    skills: ["HTML5", "CSS3", "Flexbox", "Grid", "Responsive Design"],
    credentialUrl: "http://ude.my/UC-ddec271d-03ff-4b38-9474-f7f530660686",
  },
  {
    id: 3,
    title: "Complete Web and Mobile Designer 2023",
    provider: "Udemy",
    image: udemy,
    skills: ["UI Design", "UX Design", "Figma", "Mobile Design"],
    credentialUrl: "http://ude.my/UC-ddec271d-03ff-4b38-9474-f7f530660686",
  },
  {
    id: 4,
    title: "The Complete JavaScript Course 2024: From Zero to Expert",
    provider: "Udemy",
    image: udemy,
    skills: ["JavaScript", "ES6+", "Async/Await", "DOM"],
    credentialUrl: "http://ude.my/UC-ddec271d-03ff-4b38-9474-f7f530660686",
  },
  {
    id: 5,
    title: "React - The Complete Guide 2024 (incl. Next.js, Redux)",
    provider: "Udemy",
    image: udemy,
    skills: ["React", "Next.js", "Redux", "Hooks"],
    credentialUrl: "#",
  },
  {
    id: 6,
    title: "Node.js, Express, MongoDB & More: The Complete Bootcamp",
    provider: "Udemy",
    image: udemy,
    skills: ["Node.js", "Express", "MongoDB", "REST APIs"],
    credentialUrl: "#",
  },
  {
    id: 7,
    title: "Advanced CSS and Sass: Flexbox, Grid, Animations and More",
    provider: "Udemy",
    image: udemy,
    skills: ["CSS", "Sass", "Animations", "Flexbox", "Grid"],
    credentialUrl: "#",
  },
  {
    id: 8,
    title: "The Web Developer Bootcamp 2024",
    provider: "Udemy",
    image: udemy,
    skills: ["Full Stack", "HTML", "CSS", "JavaScript", "Node.js"],
    credentialUrl: "#",
  },
];

const Achievements = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [achievementsPerPage, setAchievementsPerPage] = useState(4);
  const listRef = useRef(null);

  useEffect(() => {
    const updateAchievementsPerPage = () => {
      setAchievementsPerPage(4);
    };

    updateAchievementsPerPage();
    window.addEventListener("resize", updateAchievementsPerPage);
    return () =>
      window.removeEventListener("resize", updateAchievementsPerPage);
  }, []);

  /*
    After each page change the list remounts (via key={currentPage}).
    Cards render without .mounted → opacity:0 translateY(20px).
    One rAF later we add .mounted → CSS transition animates them in
    with staggered delays. Hover translateY(-4px) works freely.
  */
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (listRef.current) {
        listRef.current
          .querySelectorAll(".achievement-card")
          .forEach((card) => card.classList.add("mounted"));
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [currentPage]);

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
        {/* key={currentPage} remounts list on page change */}
        <div className="achievements-list" key={currentPage} ref={listRef}>
          {currentAchievements.map((achievement) => (
            <div key={achievement.id} className="achievement-card">
              {/* Left: Image */}
              <div className="achievement-image">
                {achievement.image ? (
                  <img src={achievement.image} alt={achievement.title} />
                ) : (
                  <div className="achievement-image-placeholder">
                    <Award />
                  </div>
                )}
              </div>

              {/* Right: Content */}
              <div className="achievement-content">
                {/* Top row: title + provider + credentials button */}
                <div className="achievement-header">
                  <div className="achievement-info">
                    <h3 className="achievement-title">{achievement.title}</h3>
                    <div className="achievement-provider">
                      <span className="provider-name">
                        {achievement.provider}
                      </span>
                    </div>
                  </div>

                  {/* Show Credentials Button */}
                  {achievement.credentialUrl && (
                    <a
                      href={achievement.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="credential-btn"
                    >
                      <span className="credential-btn-text">
                        show credentials
                      </span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>

                {/* Skills as pills */}
                <div className="achievement-skills">
                  {achievement.skills.map((skill, i) => (
                    <span key={i} className="skill-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
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
