import React, { useState } from "react";
import {
  FileDown,
  GitBranch,
  Code,
  BarChart,
  Pencil,
  Instagram,
  Mail,
  Menu,
  X,
} from "lucide-react";
import "./RightSidebar.css";

const RightSidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCLIClick = () => {
    console.log("CLI clicked");
    setIsMenuOpen(false);
  };

  const handleDownloadResume = () => {
    console.log("Download resume");
    setIsMenuOpen(false);
  };

  const handleGitHub = () => {
    window.open("https://github.com/yourusername", "_blank");
    setIsMenuOpen(false);
  };

  const handleInstagram = () => {
    window.open("https://instagram.com/yourusername", "_blank");
    setIsMenuOpen(false);
  };

  const handleEmail = () => {
    window.location.href = "mailto:your.email@example.com";
    setIsMenuOpen(false);
  };

  const menuItems = [
    { icon: FileDown, label: "Download Resume", onClick: handleDownloadResume },
    { icon: GitBranch, label: "GitHub", onClick: handleGitHub },
    { icon: Code, label: "Code", onClick: () => setIsMenuOpen(false) },
    { icon: BarChart, label: "Analytics", onClick: () => setIsMenuOpen(false) },
    { icon: Pencil, label: "Blog", onClick: () => setIsMenuOpen(false) },
    { icon: Instagram, label: "Instagram", onClick: handleInstagram },
    { icon: Mail, label: "Email", onClick: handleEmail },
  ];

  return (
    <>
      {/* Desktop: Vertical Sidebar */}
      <div className="right-sidebar desktop-only">
        <button className="right-sidebar-btn" onClick={handleCLIClick}>
          CLI
        </button>
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="sidebar-icon-btn"
            onClick={item.onClick}
            title={item.label}
          >
            <item.icon size={20} />
          </button>
        ))}
      </div>

      {/* Mobile: Hamburger Menu */}
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

        {/* Overlay */}
        {isMenuOpen && (
          <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />
        )}

        {/* Slide-in Menu */}
        <div className={`slide-menu ${isMenuOpen ? "open" : ""}`}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="slide-menu-item"
              onClick={item.onClick}
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
