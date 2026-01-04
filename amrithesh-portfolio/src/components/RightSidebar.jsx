import React from "react";
import {
  FileDown,
  GitBranch,
  Code,
  BarChart,
  Pencil,
  Instagram,
  Mail,
} from "lucide-react";
import "./RightSidebar.css";

const RightSidebar = () => {
  const handleCLIClick = () => {
    // Add CLI functionality later
    console.log("CLI clicked");
  };

  const handleDownloadResume = () => {
    // Add resume download functionality
    console.log("Download resume");
  };

  const handleGitHub = () => {
    window.open("https://github.com/yourusername", "_blank");
  };

  const handleInstagram = () => {
    window.open("https://instagram.com/yourusername", "_blank");
  };

  const handleEmail = () => {
    window.location.href = "mailto:your.email@example.com";
  };

  return (
    <div className="right-sidebar">
      <button className="right-sidebar-btn" onClick={handleCLIClick}>
        CLI
      </button>
      <button
        className="sidebar-icon-btn"
        onClick={handleDownloadResume}
        title="Download Resume"
      >
        <FileDown size={20} />
      </button>
      <button
        className="sidebar-icon-btn"
        onClick={handleGitHub}
        title="GitHub"
      >
        <GitBranch size={20} />
      </button>
      <button className="sidebar-icon-btn" title="Code">
        <Code size={20} />
      </button>
      <button className="sidebar-icon-btn" title="Analytics">
        <BarChart size={20} />
      </button>
      <button className="sidebar-icon-btn" title="Blog">
        <Pencil size={20} />
      </button>
      <button
        className="sidebar-icon-btn"
        onClick={handleInstagram}
        title="Instagram"
      >
        <Instagram size={20} />
      </button>
      <button className="sidebar-icon-btn" onClick={handleEmail} title="Email">
        <Mail size={20} />
      </button>
    </div>
  );
};

export default RightSidebar;
