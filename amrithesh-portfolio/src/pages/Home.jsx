import React from "react";
import profileImage from "../assets/profile.jpg";
import "./Home.css";

const Home = () => {
  return (
    <div className="page-container">
      <div className="home-inner">
        {/* LEFT: HERO CONTENT */}
        <div className="hero-content">
          <p className="subtitle">ODOO / WEB DEVELOPER · 2025</p>

          <h1 className="name">
            Hello! I’m <span className="last-name">Amrithesh</span>
          </h1>
          <p className="description">
            I&apos;m a <span className="highlight">developer</span> who loves
            building things that make people&apos;s work a little easier.
          </p>
          <div className="availability">
            <span className="status-dot"></span>
            <span>Currently working</span>
            <span className="location">Calicut, India</span>
          </div>
        </div>

        {/* RIGHT: PROFILE IMAGE */}
        <div className="profile-side">
          <div className="profile-image-wrapper">
            <img src={profileImage} alt="Amrithesh" className="profile-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
