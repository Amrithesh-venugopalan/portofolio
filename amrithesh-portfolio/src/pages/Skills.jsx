import React from "react";
import {
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiMysql,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiGithub,
  SiBitbucket,
  SiNetlify,
  SiReact,
  SiNodedotjs,
  SiOdoo,
  SiC,
} from "react-icons/si";
import { TbApi, TbCode, TbDatabase, TbPlugConnected } from "react-icons/tb";
import "./Skills.css";

const skillsData = [
  {
    category: "Languages",
    skills: [
      { name: "Python", Icon: SiPython, color: "#3776AB" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "C", Icon: SiC, color: "#A8B9CC" },
      { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", Icon: SiCss3, color: "#1572B6" },
      { name: "XML", Icon: TbCode, color: "#666666" },
    ],
  },
  {
    category: "Frameworks & Runtime",
    skills: [
      { name: "React.js", Icon: SiReact, color: "#61DAFB" },
      { name: "OWL JS", Icon: SiOdoo, color: "#714B67" },
      { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
    ],
  },
  {
    category: "APIs & Integration",
    skills: [
      { name: "REST API", Icon: TbApi, color: "#0ea5e9" },
      { name: "API Development", Icon: TbPlugConnected, color: "#8b5cf6" },
    ],
  },
  {
    category: "Databases & DevOps",
    skills: [
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
      { name: "pgAdmin", Icon: TbDatabase, color: "#336791" },
      { name: "Docker", Icon: SiDocker, color: "#2496ED" },
    ],
  },
  {
    category: "Version Control & Deployment",
    skills: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "GitHub", Icon: SiGithub, color: "#181717" },
      { name: "Bitbucket", Icon: SiBitbucket, color: "#0052CC" },
      { name: "Netlify", Icon: SiNetlify, color: "#00C7B7" },
    ],
  },
  {
    category: "Odoo",
    isOdoo: true,
    skills: [
      { name: "Module Development" },
      { name: "Module Migration" },
      { name: "Database Migration" },
      { name: "API Development" },
      { name: "Third-party Integration" },
      { name: "Odoo Training" },
    ],
  },
];

const Skills = () => {
  return (
    <div className="skills-page">
      <div className="skills-container">
        <div className="skills-grid">
          {skillsData.map(({ category, skills, isOdoo }) => (
            <div key={category} className="skill-category">
              <h2 className="category-title">{category}</h2>
              <div className="skills-list">
                {skills.map(({ name, Icon, color }) => (
                  <div
                    key={name}
                    className={isOdoo ? "skill-item no-icon" : "skill-item"}
                  >
                    {Icon && (
                      <span className="skill-icon">
                        <Icon size={18} color={color} />
                      </span>
                    )}
                    <span className="skill-name">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
