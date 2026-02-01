import React, { useEffect, useRef } from "react";
import "./Education.css";

const educationData = [
  {
    degree: "B.Tech in Electrical & Electronics Engineering",
    institution: "School Of Engineering, Cusat, Thrikkakara",
    period: "2019 - 2023",
    score: "CGPA: 8.47/10",
    coursework: [
      "Power Systems",
      "Control Systems",
      "Electrical Machines",
      "Power Electronics",
      "Digital Signal Processing",
      "Microprocessors",
      "Renewable Energy Systems",
      "High Voltage Engineering",
    ],
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Rajas Higher Secondary School, Kottakkal",
    period: "2016 - 2018",
    score: "95.4%",
    coursework: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "Computer Science",
      "English",
    ],
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Kottakkal Vidya Bhavan, Amappara",
    period: "2015 - 2016",
    score: "95%",
    coursework: [],
  },
];

const Education = () => {
  const listRef = useRef(null);

  /*
    Cards render without .mounted → they sit at opacity:0 translateY(20px).
    One rAF later we add .mounted to every card → the CSS transition
    animates them in with the staggered delays defined via nth-child.
  */
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (listRef.current) {
        listRef.current
          .querySelectorAll(".education-card")
          .forEach((card) => card.classList.add("mounted"));
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="education-page">
      <div className="education-container">
        <div className="education-list" ref={listRef}>
          {educationData.map((edu, index) => (
            <div key={index} className="education-card">
              {/* Header */}
              <div className="education-header">
                <div className="education-period">{edu.period}</div>
              </div>

              {/* Main Content */}
              <div className="education-main">
                <div className="education-title-row">
                  <h2 className="education-degree">{edu.degree}</h2>
                  <div className="education-score">{edu.score}</div>
                </div>
                <p className="education-institution">{edu.institution}</p>

                {/* Coursework */}
                {edu.coursework.length > 0 && (
                  <div className="education-coursework">
                    <h4 className="coursework-title">Relevant Coursework</h4>
                    <div className="coursework-tags">
                      {edu.coursework.map((course, i) => (
                        <span key={i} className="coursework-tag">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
