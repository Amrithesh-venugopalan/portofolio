import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import "./Blogs.css";
import blog1 from "../assets/blog_1.png";

// Blog data
const blogsData = [
  {
    id: 1,
    title: "Getting Started with Odoo Development",
    excerpt:
      "A comprehensive guide to setting up your Odoo development environment and creating your first custom module from scratch.",
    coverImage: blog1,
    date: "Jan 15, 2026",
    readTime: "8 min read",
    category: "Development",
    tags: ["Odoo", "Python", "Development"],
  },
  {
    id: 2,
    title: "Odoo 17: New Features and Improvements",
    excerpt:
      "Explore the latest features and enhancements in Odoo 17, including UI improvements, performance optimizations, and new modules.",
    coverImage: blog1,
    date: "Jan 10, 2026",
    readTime: "6 min read",
    category: "Updates",
    tags: ["Odoo 17", "Features", "Update"],
  },
  {
    id: 3,
    title: "Customizing Odoo Views: A Complete Guide",
    excerpt:
      "Learn how to customize Odoo views to match your business requirements, from basic modifications to advanced customizations.",
    coverImage: blog1,
    date: "Jan 5, 2026",
    readTime: "10 min read",
    category: "Tutorial",
    tags: ["Odoo", "Views", "XML"],
  },
  {
    id: 4,
    title: "Odoo Performance Optimization Tips",
    excerpt:
      "Discover best practices and techniques to optimize your Odoo instance for better performance and faster response times.",
    coverImage: blog1,
    date: "Dec 28, 2025",
    readTime: "7 min read",
    category: "Performance",
    tags: ["Odoo", "Performance", "Optimization"],
  },
  {
    id: 5,
    title: "Building Custom Odoo Reports",
    excerpt:
      "Master the art of creating custom reports in Odoo using QWeb templates and Python controllers for dynamic data presentation.",
    coverImage: blog1,
    date: "Dec 20, 2025",
    readTime: "9 min read",
    category: "Tutorial",
    tags: ["Odoo", "Reports", "QWeb"],
  },
  {
    id: 6,
    title: "Odoo Integration with Third-Party APIs",
    excerpt:
      "Step-by-step guide to integrating Odoo with external services and APIs for enhanced functionality and automation.",
    coverImage: blog1,
    date: "Dec 15, 2025",
    readTime: "11 min read",
    category: "Integration",
    tags: ["Odoo", "API", "Integration"],
  },
  {
    id: 7,
    title: "Odoo Security Best Practices",
    excerpt:
      "Essential security practices to protect your Odoo deployment, including access control, data encryption, and user management.",
    coverImage: blog1,
    date: "Dec 10, 2025",
    readTime: "8 min read",
    category: "Security",
    tags: ["Odoo", "Security", "Best Practices"],
  },
  {
    id: 8,
    title: "Migrating to Odoo: A Complete Roadmap",
    excerpt:
      "Planning to migrate to Odoo? This comprehensive roadmap covers everything from data migration to user training.",
    coverImage: blog1,
    date: "Dec 5, 2025",
    readTime: "12 min read",
    category: "Migration",
    tags: ["Odoo", "Migration", "Planning"],
  },
  {
    id: 9,
    title: "Odoo Studio: No-Code Customization",
    excerpt:
      "Learn how to leverage Odoo Studio for no-code customizations, allowing you to modify your system without programming knowledge.",
    coverImage: blog1,
    date: "Nov 30, 2025",
    readTime: "6 min read",
    category: "Tutorial",
    tags: ["Odoo Studio", "No-Code", "Customization"],
  },
  {
    id: 10,
    title: "Advanced ORM Techniques in Odoo",
    excerpt:
      "Deep dive into Odoo's ORM framework with advanced techniques for complex queries, optimizations, and data manipulation.",
    coverImage: blog1,
    date: "Nov 25, 2025",
    readTime: "10 min read",
    category: "Development",
    tags: ["Odoo", "ORM", "Python"],
  },
  {
    id: 11,
    title: "Odoo Inventory Management Essentials",
    excerpt:
      "Master Odoo's inventory management features including stock operations, warehouse management, and automated replenishment.",
    coverImage: blog1,
    date: "Nov 20, 2025",
    readTime: "9 min read",
    category: "Modules",
    tags: ["Odoo", "Inventory", "Management"],
  },
  {
    id: 12,
    title: "Creating Odoo Wizards for Complex Operations",
    excerpt:
      "Learn to build interactive wizards in Odoo for handling complex multi-step operations with user-friendly interfaces.",
    coverImage: blog1,
    date: "Nov 15, 2025",
    readTime: "8 min read",
    category: "Development",
    tags: ["Odoo", "Wizards", "Development"],
  },
];

const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(4);
  const gridRef = useRef(null);

  useEffect(() => {
    const updateBlogsPerPage = () => {
      const newBlogsPerPage = window.innerWidth <= 768 ? 2 : 4;
      setBlogsPerPage(newBlogsPerPage);

      const newTotalPages = Math.ceil(blogsData.length / newBlogsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(1);
      }
    };

    updateBlogsPerPage();
    window.addEventListener("resize", updateBlogsPerPage);
    return () => window.removeEventListener("resize", updateBlogsPerPage);
  }, [currentPage]);

  /*
    After each page change the grid remounts (via key={currentPage}).
    Cards render without .mounted → they sit at opacity:0 translateY(20px).
    One rAF later we add .mounted to every card → the CSS transition
    animates them in with the staggered delays.
    Using rAF ensures the browser has painted the initial hidden state first.
  */
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (gridRef.current) {
        gridRef.current
          .querySelectorAll(".blog-card")
          .forEach((card) => card.classList.add("mounted"));
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [currentPage]);

  const totalPages = Math.ceil(blogsData.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const currentBlogs = blogsData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const blogsPage = document.querySelector(".blogs-page");
    if (blogsPage) {
      blogsPage.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="blogs-page">
      <div className="blogs-container">
        {/* key={currentPage} destroys & recreates the grid on every page change */}
        <div className="blogs-grid" key={currentPage} ref={gridRef}>
          {currentBlogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <div className="blog-image-container">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="blog-image"
                />
                <span className="blog-category">{blog.category}</span>
              </div>

              <div className="blog-content">
                <h2 className="blog-title">{blog.title}</h2>
                <p className="blog-excerpt">{blog.excerpt}</p>

                <div className="blog-tags">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="blog-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="blog-footer">
                  <div className="blog-meta">
                    <span className="blog-date">
                      <Calendar size={14} />
                      {blog.date}
                    </span>
                    <span className="blog-read-time">
                      <Clock size={14} />
                      {blog.readTime}
                    </span>
                  </div>
                  <a href="#" className="blog-link">
                    Read more <ArrowRight size={16} />
                  </a>
                </div>
              </div>
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

export default Blogs;
