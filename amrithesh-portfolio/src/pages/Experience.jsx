import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import metroImg from "../assets/metro.png";
import caminoImg from "../assets/camino.png";
import luminarImg from "../assets/luminar.png";
import cybrosysImg from "../assets/cybrosys.png";

import {
  SiPython,
  SiPostgresql,
  SiOdoo,
  SiDjango,
  SiJavascript,
  SiGit,
  SiLinux,
} from "react-icons/si";

import "./Experience.css";

/**
 * ORDER (top → bottom)
 * Newest → Oldest (Cybrosys FIRST)
 */
const experiences = [
  {
    role: "Python / Odoo Developer",
    company: "Cybrosys Technologies Ltd",
    period: "Jan 2025 — Present",
    image: cybrosysImg,
    description:
      "Developing and maintaining Odoo solutions including custom modules, integrations, migrations, training, and bug fixing.",
    skills: [
      { name: "Odoo", icon: <SiOdoo /> },
      { name: "Python", icon: <SiPython /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "Odoo Migration" },
      { name: "Odoo Customization" },
      { name: "Odoo Training" },
    ],
    details: {
      contribution:
        "Developing custom Odoo modules tailored to business requirements. Handling version migrations, database optimization, and third-party integrations. Providing technical training to clients and resolving production issues efficiently.",
      links: [],
    },
  },
  {
    role: "Python Developer Intern",
    company: "Luminar Technolab Pvt Ltd",
    period: "2024",
    image: luminarImg,
    description:
      "Python full-stack development training with Django, REST APIs, frontend basics, and version control.",
    skills: [
      { name: "Python", icon: <SiPython /> },
      { name: "Django", icon: <SiDjango /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "Git", icon: <SiGit /> },
      { name: "Linux", icon: <SiLinux /> },
    ],
    details: {
      contribution:
        "Built full-stack web applications using Django framework. Developed RESTful APIs, implemented user authentication, and created responsive frontend interfaces. Gained proficiency in version control with Git and deployment on Linux servers.",
      links: [],
    },
  },
  {
    role: "Python & Machine Learning Intern",
    company: "Camino Infotech Pvt Ltd",
    period: "2024",
    image: caminoImg,
    description:
      "Training in machine learning fundamentals including data preprocessing, model training, and evaluation using Python.",
    skills: [
      { name: "Python", icon: <SiPython /> },
      { name: "Machine Learning" },
      { name: "NumPy" },
      { name: "Pandas" },
      { name: "Data Analysis" },
    ],
    details: {
      contribution:
        "Developed machine learning models for data classification and prediction. Worked on data preprocessing pipelines, feature engineering, and model evaluation metrics. Built hands-on experience with scikit-learn and statistical analysis.",
      links: [],
    },
  },
  {
    role: "Electrical Engineering Intern",
    company: "Kochi Metro Railways Ltd",
    period: "2023",
    image: metroImg,
    description:
      "Hands-on training in transformer division covering winding, core building, assembly, testing, and industrial safety procedures.",
    skills: [
      { name: "Transformers" },
      { name: "Testing & Inspection" },
      { name: "Electrical Systems" },
      { name: "Industrial Safety" },
    ],
    details: {
      contribution:
        "Gained practical experience in transformer manufacturing processes including winding techniques, core assembly, and quality testing procedures. Participated in safety protocols and industrial best practices.",
      links: [],
    },
  },
];

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    // Detect touch device and add class to body
    function isTouchDevice() {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    }

    if (isTouchDevice()) {
      document.documentElement.classList.add("touch-device");
    } else {
      document.documentElement.classList.add("no-touch-device");
    }

    // Also add class based on window width
    function checkWidth() {
      if (window.innerWidth <= 1020) {
        document.documentElement.classList.add("mobile-width");
      } else {
        document.documentElement.classList.remove("mobile-width");
      }
    }

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="experience-page">
      <div className="timeline-wrapper">
        {/* Experiences */}
        <div className="timeline-list">
          {experiences.map((exp, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={index}
                className="timeline-item"
                style={{
                  animationDelay: `${index * 0.5 + 0.35}s`,
                }}
              >
                <div
                  className={`experience-row ${isExpanded ? "expanded" : ""}`}
                >
                  {/* Desktop: 3-column layout */}
                  {/* Mobile: Responsive grid layout */}

                  {/* LEFT - Image + Period */}
                  <div className="experience-left">
                    <img src={exp.image} alt={exp.company} />
                    <span className="period">{exp.period}</span>
                  </div>

                  {/* CENTER - Role, Company */}
                  <div className="experience-center">
                    <h3>{exp.role}</h3>
                    <p className="company">{exp.company}</p>
                    {/* Period shows here on mobile only */}
                    <span className="period-mobile">{exp.period}</span>
                    {/* Description shows here on desktop only */}
                    <p className="desc desc-desktop">{exp.description}</p>
                  </div>

                  {/* DESCRIPTION - Shows on mobile below image/role section */}
                  <div className="experience-description">
                    <p className="desc desc-mobile">{exp.description}</p>
                  </div>

                  {/* RIGHT - Skills */}
                  <div className="experience-right">
                    {exp.skills.map((skill, i) => (
                      <span key={i} className="skill-pill">
                        {skill.icon && (
                          <span className="skill-icon">{skill.icon}</span>
                        )}
                        {skill.name}
                      </span>
                    ))}
                  </div>

                  {/* TOGGLE ARROW BUTTON */}
                  <button
                    className="toggle-arrow"
                    onClick={() => toggleExpand(index)}
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                  >
                    <ChevronDown
                      size={24}
                      className={`chevron-icon ${isExpanded ? "rotated" : ""}`}
                    />
                  </button>
                </div>

                {/* EXPANDED DETAILS */}
                {isExpanded && (
                  <div className="experience-details">
                    <div className="details-content">
                      <h4>Contribution</h4>
                      <p>{exp.details.contribution}</p>

                      {exp.details.links && exp.details.links.length > 0 && (
                        <div className="details-links">
                          <h4>Links:</h4>
                          {exp.details.links.map((link, i) => (
                            <a
                              key={i}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="detail-link"
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Experience;
