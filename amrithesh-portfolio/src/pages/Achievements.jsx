import React, { useState, useEffect, useRef } from "react";
import { Award, ExternalLink } from "lucide-react";
import "./Achievements.css";
import udemy from "../assets/udemy.png";

// Achievements data
const achievementsData = [
  {
    id: 1,
    title: "100 Days of Code™: The Complete Python Pro Bootcamp",
    provider: "Udemy",
    image: udemy,
    skills: ["Python", "Html", "CSS", "Data Structures", "OOP"],
    credentialUrl: "http://ude.my/UC-ddec271d-03ff-4b38-9474-f7f530660686",
  },
  {
    id: 2,
    title: "The Complete JavaScript Course 2025: From Zero to Expert!",
    provider: "Udemy",
    image: udemy,
    skills: ["JavaScript", "ES6+", "DSA", "Web development", "OOP"],
    credentialUrl:
      "https://www.udemy.com/certificate/UC-34b55668-bb2b-4402-abc9-2e0d8124fc62/",
  },
  {
    id: 3,
    title: "The Ultimate React Course 2025: React, Next.js, Redux & More",
    provider: "Udemy",
    image: udemy,
    skills: ["React", "Next.js", "Redux", "TypeScript"],
    credentialUrl: "",
  },
  {
    id: 4,
    title: "The Complete Data Structures and Algorithms Course in Python",
    provider: "Udemy",
    image: udemy,
    skills: [
      "Python",
      "Data Structures",
      "Algorithms",
      "Problem Solving",
      "Big O",
    ],
    credentialUrl: "",
  },
  {
    id: 5,
    title: "Build Responsive Real-World Websites with HTML and CSS",
    provider: "Udemy",
    image: udemy,
    skills: ["HTML5", "CSS3", "Responsive Design", "Web Development"],
    credentialUrl:
      "https://www.udemy.com/certificate/UC-ddec271d-03ff-4b38-9474-f7f530660686/",
  },
  {
    id: 6,
    title: "Complete Web & Mobile Designer: UI/UX, Figma, +more",
    provider: "Udemy",
    image: udemy,
    skills: ["UI Design", "UX Design", "Figma", "Mobile Design", "Prototyping"],
    credentialUrl:
      "https://www.udemy.com/certificate/UC-832e0d9e-43a2-4e7d-8d6d-e042eb3caf96/",
  },
  {
    id: 7,
    title: "The Git & Github Bootcamp",
    provider: "Udemy",
    image: udemy,
    skills: [
      "Git",
      "GitHub",
      "Version Control",
      "Collaboration",
      "GitHub Operations",
    ],
    credentialUrl: "",
  },
  {
    id: 8,
    title: "The Linux Command Line Bootcamp: Beginner To Power User",
    provider: "Udemy",
    image: udemy,
    skills: ["Linux", "Shell Scripting", "CLI"],
    credentialUrl: "",
  },
  {
    id: 9,
    title: "Python for Data Science and Machine Learning Bootcamp",
    provider: "Udemy",
    image: udemy,
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Machine Learning"],
    credentialUrl: "",
  },
];

const Achievements = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [achievementsPerPage] = useState(4);
  const listRef = useRef(null);

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
        <div className="achievements-list" key={currentPage} ref={listRef}>
          {currentAchievements.map((achievement) => (
            <div key={achievement.id} className="achievement-card">
              {/* Left: Image */}
              <div className="achievement-image">
                {achievement.image ? (
                  <img src={achievement.image} alt={achievement.provider} />
                ) : (
                  <div className="achievement-image-placeholder">
                    <Award />
                  </div>
                )}
              </div>

              {/* Right: Content */}
              <div className="achievement-content">
                <div className="achievement-header">
                  <div className="achievement-info">
                    <h3 className="achievement-title">{achievement.title}</h3>
                    <div className="achievement-provider">
                      <span className="provider-name">
                        {achievement.provider}
                      </span>
                    </div>
                  </div>

                  {/* Only render button when credentialUrl is non-empty */}
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
