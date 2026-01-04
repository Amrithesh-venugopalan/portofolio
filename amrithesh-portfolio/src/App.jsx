import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import RightSidebar from "./components/RightSidebar";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import "./App.css";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  const renderPage = () => {
    switch (activeSection) {
      case "home":
        return <Home />;
      case "experience":
        return <Experience />;
      case "projects":
        return <Projects />;
      case "contact":
        return <Contact />;
      // Add more cases for other pages
      case "resume":
        return (
          <div className="page-container">
            <h1 className="page-title">Resume</h1>
          </div>
        );
      case "skills":
        return (
          <div className="page-container">
            <h1 className="page-title">Skills</h1>
          </div>
        );
      case "education":
        return (
          <div className="page-container">
            <h1 className="page-title">Education</h1>
          </div>
        );
      case "achievements":
        return (
          <div className="page-container">
            <h1 className="page-title">Achievements</h1>
          </div>
        );
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="main-content">{renderPage()}</main>
      <RightSidebar />
    </div>
  );
}

export default App;
