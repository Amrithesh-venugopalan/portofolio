import React, { useState } from "react";
import { FileDown, Menu, X } from "lucide-react";
import {
  SiGithub,
  SiHashnode,
  SiLeetcode,
  SiLinkedin,
  SiGmail,
} from "react-icons/si";
import { FaMedium } from "react-icons/fa";
import resume from "../assets/resume.pdf";
import "./RightSidebar.css";

const menuItems = [
  // {
  //   icon: FileDown,
  //   label: "Download Resume",
  //   type: "resume",
  // },
  {
    icon: SiGithub,
    label: "GitHub",
    url: "https://github.com/Amrithesh-venugopalan",
  },
  {
    icon: FaMedium,
    label: "Medium",
    url: "https://medium.com/@amritheshvenugopalan",
  },
  {
    icon: SiLeetcode,
    label: "LeetCode",
    url: "https://leetcode.com/u/K_Amrithesh/",
  },
  {
    icon: SiLinkedin,
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/amrithesh-k-507786264/",
  },
  {
    icon: SiGmail,
    label: "Email",
    type: "email",
    email: "amritheshvenugopalan@gmail.com",
  },
];

const RightSidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleClick = (item) => {
    if (item.type === "resume") {
      const link = document.createElement("a");
      link.href = resume;
      link.download = "Amrithesh_Resume.pdf";
      link.click();
    } else if (item.type === "email") {
      window.location.href = `mailto:${item.email}`;
    } else if (item.url) {
      window.open(item.url, "_blank");
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* ── Desktop: Vertical Sidebar ── */}
      <div className="right-sidebar desktop-only">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="right-icon-wrapper"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <button
              className="sidebar-icon-btn"
              onClick={() => handleClick(item)}
              title={item.label}
            >
              <item.icon size={20} />
            </button>

            {/* Hover pill — mirrors Sidebar.css desktop pill, floats LEFT */}
            {hoveredIndex === index && (
              <span className="right-section-pill">{item.label}</span>
            )}
          </div>
        ))}
      </div>

      {/* ── Mobile: Hamburger Menu ── */}
      <div className="mobile-menu-container">
        <button
          className={`hamburger-btn ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="icon-wrapper">
            <Menu size={24} className="menu-icon" />
            <X size={24} className="close-icon" />
          </div>
        </button>

        {isMenuOpen && (
          <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />
        )}

        <div className={`slide-menu ${isMenuOpen ? "open" : ""}`}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="slide-menu-item"
              onClick={() => handleClick(item)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
