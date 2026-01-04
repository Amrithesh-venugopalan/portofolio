import React from "react";
import { navigationItems } from "../constants/navigation";
import "./Sidebar.css";

const Sidebar = ({ activeSection, onNavigate }) => {
  return (
    <div className="sidebar">
      {navigationItems.map(({ id, Icon, label }) => (
        <button
          key={id}
          className={`sidebar-btn ${activeSection === id ? "active" : ""}`}
          onClick={() => onNavigate(id)}
          title={label}
        >
          <Icon size={20} />
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
