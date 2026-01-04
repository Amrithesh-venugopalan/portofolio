import React from "react";
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
 * Oldest → Newest (Cybrosys LAST)
 */
const experiences = [
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
  },
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
  },
];

const Experience = () => {
  return (
    <div className="experience-page">
      <div className="timeline-wrapper">
        {/* Vertical growing line */}
        <div className="timeline-line" />

        {/* Moving arrow */}
        <div className="timeline-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M12 2v14"
              stroke="#999"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M6 14l6 6 6-6"
              stroke="#999"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Experiences */}
        <div className="timeline-list">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="timeline-item"
              style={{
                // ⏱ tuned for faster arrow (2.1s total)
                animationDelay: `${index * 0.5 + 0.35}s`,
              }}
            >
              <div className="experience-row">
                {/* LEFT */}
                <div className="experience-left">
                  <img src={exp.image} alt={exp.company} />
                  <span className="period">{exp.period}</span>
                </div>

                {/* CENTER */}
                <div className="experience-center">
                  <h3>{exp.role}</h3>
                  <p className="company">{exp.company}</p>
                  <p className="desc">{exp.description}</p>
                </div>

                {/* RIGHT */}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
