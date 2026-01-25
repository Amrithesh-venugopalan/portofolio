import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import "./Projects.css";

// Demo project data
const projectsData = [
  {
    id: 1,
    title: "Bhraman",
    subtitle: "AI-Powered Travel Companion",
    description:
      "Developed an intelligent travel planning platform that combines AI-driven personalization with comprehensive travel services for unforgettable journeys.",
    tags: [
      "React.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "Google Gemini AI",
      "Mapbox",
    ],
    status: "Completed",
    featured: "Multi-city itineraries",
    github: "https://github.com/username/bhraman",
    demo: "https://bhraman-demo.com",
  },
  {
    id: 2,
    title: "Assignment Management System",
    subtitle: "Assignment Submission Platform",
    description:
      "Created a robust assignment management system facilitating seamless interaction between instructors and students with comprehensive workflow management.",
    tags: ["MERN Stack", "JWT", "Role-based Access Control", "File Storage"],
    status: "Live",
    featured: "4-step workflow process",
    github: "https://github.com/username/assignment-system",
    demo: "https://assignment-system.com",
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    subtitle: "Full-Stack Shopping Experience",
    description:
      "Built a complete e-commerce platform with product management, cart functionality, payment integration, and order tracking for seamless online shopping.",
    tags: ["React.js", "Node.js", "MongoDB", "Stripe", "Redux"],
    status: "Completed",
    featured: "Real-time inventory",
    github: "https://github.com/username/ecommerce",
    demo: "https://ecommerce-demo.com",
  },
  {
    id: 4,
    title: "Task Management App",
    subtitle: "Productivity Tracking Tool",
    description:
      "Designed a task management application with drag-and-drop functionality, priority levels, and collaborative features for team productivity.",
    tags: ["Vue.js", "Firebase", "Tailwind CSS", "PWA"],
    status: "Live",
    featured: "Drag-and-drop interface",
    github: "https://github.com/username/task-manager",
    demo: "https://task-manager.com",
  },
  {
    id: 5,
    title: "Weather Dashboard",
    subtitle: "Real-time Weather Tracker",
    description:
      "Created a responsive weather dashboard providing real-time forecasts, weather alerts, and location-based climate data visualization.",
    tags: ["JavaScript", "API Integration", "Chart.js", "CSS Grid"],
    status: "Completed",
    featured: "7-day forecast",
    github: "https://github.com/username/weather-dashboard",
    demo: "https://weather-dashboard.com",
  },
  {
    id: 6,
    title: "Blog CMS",
    subtitle: "Content Management System",
    description:
      "Developed a content management system for bloggers with markdown support, SEO optimization, and social media integration for content creators.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Markdown"],
    status: "Live",
    featured: "SEO optimized",
    github: "https://github.com/username/blog-cms",
    demo: "https://blog-cms.com",
  },
  {
    id: 7,
    title: "Portfolio Generator",
    subtitle: "Automated Portfolio Builder",
    description:
      "Built an automated portfolio generator that creates stunning developer portfolios from GitHub data with customizable themes and templates.",
    tags: ["React.js", "GitHub API", "Styled Components", "Export PDF"],
    status: "Completed",
    featured: "Multiple themes",
    github: "https://github.com/username/portfolio-gen",
    demo: "https://portfolio-gen.com",
  },
  {
    id: 8,
    title: "Chat Application",
    subtitle: "Real-time Messaging Platform",
    description:
      "Developed a real-time chat application with group conversations, file sharing, emoji support, and end-to-end encryption for secure communication.",
    tags: ["Socket.io", "React.js", "Express", "MongoDB", "WebRTC"],
    status: "Live",
    featured: "End-to-end encryption",
    github: "https://github.com/username/chat-app",
    demo: "https://chat-app.com",
  },
];

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(4);

  // Update projects per page based on screen size
  useEffect(() => {
    const updateProjectsPerPage = () => {
      const newProjectsPerPage = window.innerWidth <= 768 ? 2 : 4;
      setProjectsPerPage(newProjectsPerPage);

      // Reset page when changing projects per page if current page would be invalid
      const newTotalPages = Math.ceil(projectsData.length / newProjectsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(1);
      }
    };

    updateProjectsPerPage();
    window.addEventListener("resize", updateProjectsPerPage);
    return () => window.removeEventListener("resize", updateProjectsPerPage);
  }, [currentPage]);

  // Calculate pagination
  const totalPages = Math.ceil(projectsData.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = projectsData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Smooth scroll to top
    const projectsPage = document.querySelector(".projects-page");
    if (projectsPage) {
      projectsPage.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="projects-page">
      <div className="projects-container">
        {/* Projects Grid */}
        <div className="projects-grid">
          {currentProjects.map((project) => (
            <div key={project.id} className="project-card">
              {/* Header */}
              <div className="project-header">
                <div className="project-title-section">
                  <h2 className="project-title">{project.title}</h2>
                  <p className="project-subtitle">{project.subtitle}</p>
                </div>
                <span
                  className={`project-status status-${project.status.toLowerCase()}`}
                >
                  {project.status}
                </span>
              </div>

              {/* Description */}
              <p className="project-description">{project.description}</p>

              {/* Tags */}
              <div className="project-tags">
                {project.tags.map((tag, index) => (
                  <span key={index} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="project-footer">
                <span className="project-featured">{project.featured}</span>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View details <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn pagination-arrow"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ‹
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="pagination-btn pagination-arrow"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
