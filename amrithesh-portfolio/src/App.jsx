import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import RightSidebar from "./components/RightSidebar";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Education from "./pages/Education";
import Skills from "./pages/Skills";
import Resume from "./pages/Resume";
import Achievements from "./pages/Achievements";
import "./App.css";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  // Create refs for each section
  const sectionRefs = useRef({
    home: null,
    experience: null,
    projects: null,
    resume: null,
    skills: null,
    education: null,
    achievements: null,
    contact: null,
  });

  // Scroll to section handler
  const scrollToSection = (sectionId) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Intersection Observer to track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // Trigger when section is in middle of viewport
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all sections
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="app">
      <Sidebar activeSection={activeSection} onNavigate={scrollToSection} />

      <main className="main-content">
        <section
          id="home"
          className="page-section"
          ref={(el) => (sectionRefs.current.home = el)}
        >
          <Home />
        </section>

        <section
          id="experience"
          className="page-section"
          ref={(el) => (sectionRefs.current.experience = el)}
        >
          <Experience />
        </section>

        <section
          id="projects"
          className="page-section"
          ref={(el) => (sectionRefs.current.projects = el)}
        >
          <Projects />
        </section>

        <section
          id="resume"
          className="page-section"
          ref={(el) => (sectionRefs.current.resume = el)}
        >
          <Resume />
        </section>

        <section
          id="skills"
          className="page-section"
          ref={(el) => (sectionRefs.current.skills = el)}
        >
          <Skills />
        </section>

        <section
          id="education"
          className="page-section"
          ref={(el) => (sectionRefs.current.education = el)}
        >
          <Education />
        </section>

        <section
          id="achievements"
          className="page-section"
          ref={(el) => (sectionRefs.current.achievements = el)}
        >
          <Achievements />
        </section>

        <section
          id="contact"
          className="page-section"
          ref={(el) => (sectionRefs.current.contact = el)}
        >
          <Contact />
        </section>
      </main>

      <RightSidebar />
    </div>
  );
}

export default App;
