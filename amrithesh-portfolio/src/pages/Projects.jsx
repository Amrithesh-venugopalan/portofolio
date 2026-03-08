import React, { useState, useEffect, useRef } from "react";
import "./Projects.css";

const projectsData = [
  // ── ★★ TOP PRIORITY ──────────────────────────────────────────────────────
  {
    id: 1,
    title: "Deliverect Integration with Odoo",
    subtitle: "Food Delivery Aggregator × Odoo POS",
    description:
      "Integrated Deliverect — a leading food delivery management platform — with Odoo's Point of Sale. Orders from third-party delivery apps (Uber Eats, Deliveroo, etc.) flow automatically into Odoo POS in real time, eliminating manual entry, syncing menus across all delivery channels, and providing a unified order management dashboard.",
    tags: ["Odoo", "POS", "Deliverect API", "Python", "JavaScript", "OWL"],
    status: "Completed",
    featured: "Real-time multi-channel order sync",
  },
  {
    id: 2,
    title: "Power BI Integration with Odoo",
    subtitle: "Embedded Analytics & Dataset Management",
    description:
      "Built a bidirectional integration between Odoo and Microsoft Power BI. Push datasets directly from Odoo to Power BI, manage tables and dataset schemas from within Odoo, and view live Power BI dashboards embedded inside the Odoo backend. Supports incremental dataset refresh and full dataset update triggered from Odoo.",
    tags: [
      "Odoo",
      "Power BI API",
      "Python",
      "REST API",
      "Embedded Dashboard",
      "OWL",
    ],
    status: "Completed",
    featured: "Embedded Power BI dashboards in Odoo",
  },

  // ── ★ PRIORITY ────────────────────────────────────────────────────────────
  {
    id: 3,
    title: "Network International Payment Terminal",
    subtitle: "POS Payment Integration — UAE & MENA",
    description:
      "Integrated Network International's card payment terminal with Odoo POS, enabling seamless in-store card transactions across the UAE and MENA region. Handles authorisation, capture, refunds, and transaction status updates directly within the POS session with full reconciliation support.",
    tags: [
      "Odoo",
      "POS",
      "Network International",
      "Payment Terminal",
      "Python",
      "OWL",
    ],
    status: "Completed",
    featured: "Card-present transactions for MENA region",
  },
  {
    id: 4,
    title: "PayPlug Payment Integration",
    subtitle: "Online Payment Gateway for Odoo",
    description:
      "Developed a native PayPlug payment provider module for Odoo, enabling secure online card payments for e-commerce and invoicing flows. Supports 3D Secure authentication, payment capture, refunds, and webhook-driven status updates with full Odoo accounting reconciliation.",
    tags: ["Odoo", "PayPlug API", "Payment Provider", "Python", "Webhooks"],
    status: "Completed",
    featured: "3D Secure & automated reconciliation",
  },
  {
    id: 5,
    title: "Solar Renewable Energy Management",
    subtitle: "End-to-End Solar ERP Module",
    description:
      "Developed a comprehensive Odoo custom module covering the full lifecycle of solar energy projects — from customer enquiry and site survey to product configuration, installation scheduling, and post-sale maintenance. Includes solar order management, product catalogue, field service dispatching, and maintenance tracking.",
    tags: [
      "Odoo",
      "Custom Module",
      "Field Service",
      "Python",
      "OWL",
      "Solar ERP",
    ],
    status: "Completed",
    featured: "Full solar project lifecycle management",
  },

  // ── STANDARD ──────────────────────────────────────────────────────────────
  {
    id: 6,
    title: "RazorPay Payment Integration",
    subtitle: "Online Payment Gateway for Odoo",
    description:
      "Integrated Razorpay as a payment provider in Odoo, supporting online order payments, payment links, and invoice collection. Covers payment capture, refunds, and real-time webhook handling for instant order confirmation.",
    tags: ["Odoo", "Razorpay API", "Payment Provider", "Python", "Webhooks"],
    status: "Completed",
    featured: "Payment links & instant order confirmation",
  },
  {
    id: 7,
    title: "PayU Payment Integration",
    subtitle: "Online Payment Gateway for Odoo",
    description:
      "Built a PayU payment provider integration for Odoo, enabling businesses in Central & Eastern Europe and emerging markets to accept online card payments, local payment methods, and instalment options with automated reconciliation.",
    tags: ["Odoo", "PayU API", "Payment Provider", "Python", "Webhooks"],
    status: "Completed",
    featured: "Multi-market payment method support",
  },
  {
    id: 8,
    title: "MultiSafePay Payment Integration",
    subtitle: "Online Payment Gateway for Odoo",
    description:
      "Developed a MultiSafePay integration for Odoo, supporting a wide range of European payment methods including iDEAL, Bancontact, SOFORT, and card payments. Implements order status synchronisation via webhooks and full refund management.",
    tags: [
      "Odoo",
      "MultiSafePay API",
      "Payment Provider",
      "Python",
      "iDEAL",
      "Webhooks",
    ],
    status: "Completed",
    featured: "10+ European payment methods",
  },
  {
    id: 9,
    title: "Advanced Tender Management",
    subtitle: "Construction Tender Lifecycle Module",
    description:
      "Built a full-featured Odoo module for managing the end-to-end construction tender process — from tender creation and product/BOQ management to bid submission, bid evaluation, and automatic purchase order generation upon bid award.",
    tags: [
      "Odoo",
      "Custom Module",
      "Python",
      "OWL",
      "Procurement",
      "Construction",
    ],
    status: "Completed",
    featured: "Automated PO generation on bid award",
  },
  {
    id: 10,
    title: "Compraquí Payment Terminal",
    subtitle: "POS Terminal Integration — Latin America",
    description:
      "Integrated the Compraquí payment terminal with Odoo POS, enabling card-present transactions for Latin American merchants. Built the communication layer between Odoo's POS frontend and the Compraquí terminal protocol, handling transaction requests, responses, and error flows.",
    tags: ["Odoo", "POS", "Compraquí", "Payment Terminal", "Python", "OWL"],
    status: "Completed",
    featured: "In-store card payments for LATAM",
  },
  {
    id: 11,
    title: "Library Management System",
    subtitle: "Complete Library ERP Module",
    description:
      "Created a full-featured library management module in Odoo covering book cataloguing, member registration, book checkouts and returns, overdue penalty calculation, invoice generation, donation tracking, and automated email notifications for due dates and overdue reminders.",
    tags: ["Odoo", "Custom Module", "Python", "OWL", "Mail", "Invoicing"],
    status: "Completed",
    featured: "Automated penalties & mail notifications",
  },
  {
    id: 12,
    title: "JSON Widget for Odoo",
    subtitle: "Custom Field Widget",
    description:
      "Built a custom Odoo field widget for managing structured JSON data directly within any form view. Supports creating and editing key-value pairs with inline validation for both keys and values, providing a clean UI alternative to raw JSON text fields.",
    tags: ["Odoo", "OWL", "JavaScript", "Custom Widget", "Field Component"],
    status: "Completed",
    featured: "Inline JSON editor with validation",
  },
  {
    id: 13,
    title: "Odoo Database Migration",
    subtitle: "v16 → v18 & v17 → v19",
    description:
      "Executed full Odoo database migrations across major version jumps, including data model changes, deprecated field handling, custom module compatibility updates, and post-migration validation. Ensured data integrity and functional parity across all migrated environments.",
    tags: [
      "Odoo",
      "Migration",
      "Python",
      "PostgreSQL",
      "v16",
      "v17",
      "v18",
      "v19",
    ],
    status: "Completed",
    featured: "Zero data loss cross-version migration",
  },
  {
    id: 14,
    title: "Odoo Module Migration",
    subtitle: "v16 / v17 / v18 Module Upgrades",
    description:
      "Migrated custom Odoo modules across versions v16, v17, and v18 — updating Python models, OWL component syntax, view definitions, and asset declarations to comply with each version's framework changes and deprecations.",
    tags: ["Odoo", "Module Migration", "Python", "OWL", "v16", "v17", "v18"],
    status: "Completed",
    featured: "Full API & OWL compatibility updates",
  },
  {
    id: 15,
    title: "Mapify",
    subtitle: "Real-Time Workout Tracker on Google Maps",
    description:
      "Built a web application that tracks workouts live on an interactive Google Maps view. Calculates real-time metrics including distance covered, pace, and estimated calories burnt based on user profile data. Supports multiple workout types with session history and performance summaries.",
    tags: ["React.js", "Google Maps API", "Geolocation", "Node.js", "MongoDB"],
    status: "Completed",
    featured: "Live GPS tracking with calorie estimation",
  },
  {
    id: 16,
    title: "The Cook Book",
    subtitle: "Recipe Discovery & Personal Collection App",
    description:
      "Developed a web application that lets users search millions of recipes from a public recipe API and save their favourites to a personal collection. Users can also create and store their own recipes with ingredients, steps, and serving details.",
    tags: ["React.js", "Recipe API", "JavaScript", "CSS", "Local Storage"],
    status: "Completed",
    featured: "Search, save & create personal recipes",
  },
];

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(() =>
    window.innerWidth <= 768 ? 2 : 4,
  );
  const gridRef = useRef(null);

  useEffect(() => {
    const updateProjectsPerPage = () => {
      const newProjectsPerPage = window.innerWidth <= 768 ? 2 : 4;
      setProjectsPerPage(newProjectsPerPage);

      const newTotalPages = Math.ceil(projectsData.length / newProjectsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(1);
      }
    };

    updateProjectsPerPage();
    window.addEventListener("resize", updateProjectsPerPage);
    return () => window.removeEventListener("resize", updateProjectsPerPage);
  }, [currentPage]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (gridRef.current) {
        gridRef.current
          .querySelectorAll(".project-card")
          .forEach((card) => card.classList.add("mounted"));
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [currentPage]);

  const totalPages = Math.ceil(projectsData.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = projectsData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const projectsPage = document.querySelector(".projects-page");
    if (projectsPage) {
      projectsPage.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="projects-page">
      <div className="projects-container">
        <div className="projects-grid" key={currentPage} ref={gridRef}>
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

              {/* Footer — info only, no link */}
              {/* <div className="project-footer">
                <span className="project-featured">{project.featured}</span>
              </div> */}
            </div>
          ))}
        </div>

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
