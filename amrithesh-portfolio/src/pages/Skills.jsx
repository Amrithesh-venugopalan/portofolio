import React from "react";
import "./Skills.css";

const skillsData = {
  "Languages & Tools": [
    { name: "C", icon: "◆" },
    { name: "C++", icon: "◆" },
    { name: "Java", icon: "☕" },
    { name: "Python", icon: "🐍" },
    { name: "JavaScript", icon: "◼" },
    { name: "Git", icon: "◆" },
    { name: "GitHub Actions", icon: "⚙" },
    { name: "Vercel", icon: "▲" },
    { name: "Netlify", icon: "✦" },
    { name: "HTML5", icon: "◼" },
    { name: "CSS3", icon: "◼" },
  ],
  "Backend & APIs": [
    { name: "Node.js", icon: "⬢" },
    { name: "Express.js", icon: "ex" },
    { name: "Python", icon: "🐍" },
    { name: "REST APIs", icon: "⊕" },
    { name: "GraphQL", icon: "◈" },
    { name: "API Development", icon: "🔌" },
  ],
  "Databases & Cloud": [
    { name: "MySQL", icon: "🐬" },
    { name: "MongoDB", icon: "🍃" },
    { name: "Firebase", icon: "🔥" },
    { name: "AWS", icon: "☁" },
    { name: "GCP", icon: "☁" },
    { name: "Docker", icon: "🐋" },
  ],
};

const Skills = () => {
  return (
    <div className="skills-page">
      <div className="skills-container">
        <div className="skills-grid">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category} className="skill-category">
              <h2 className="category-title">{category}</h2>
              <div className="skills-list">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
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
