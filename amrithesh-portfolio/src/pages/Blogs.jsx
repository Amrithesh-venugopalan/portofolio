import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import "./Blogs.css";
import blog1 from "../assets/components.png";
import blog2 from "../assets/hooks.png";
import blog3 from "../assets/templates.png";
import blog4 from "../assets/services.png";
import blog5 from "../assets/environment.png";

// Blog data
const blogsData = [
  {
    id: 1,
    title: "Mastering Odoo OWL Components: A Beginner's Guide",
    excerpt:
      "Learn the fundamentals of OWL components in Odoo, including component structure, templates, state management, asset loading, and how to register components using the Odoo registry.",
    coverImage: blog1,
    date: "Mar 1, 2026",
    readTime: "8 min read",
    category: "Odoo OWL",
    tags: ["Odoo", "OWL", "Components", "Frontend"],
    link: "https://medium.com/@amritheshvenugopalan/basics-of-owl-js-components-771a825a9f85",
  },
  {
    id: 2,
    title: "Understanding OWL Hooks in Odoo",
    excerpt:
      "Explore OWL hooks such as useState, useEffect, useRef, and lifecycle hooks like onMounted and onWillStart to build reactive and dynamic Odoo frontend components.",
    coverImage: blog2,
    date: "Mar 3, 2026",
    readTime: "7 min read",
    category: "Odoo OWL",
    tags: ["Odoo", "OWL", "Hooks", "JavaScript"],
    link: "https://medium.com/@amritheshvenugopalan/basics-of-owl-js-components-771a825a9f85",
  },
  {
    id: 3,
    title: "QWeb Templates and Directives in Odoo OWL",
    excerpt:
      "Understand how QWeb templates power OWL components in Odoo. Learn essential directives like t-if, t-foreach, t-esc, t-model, and template inheritance using XPath.",
    coverImage: blog3,
    date: "Mar 5, 2026",
    readTime: "9 min read",
    category: "Odoo OWL",
    tags: ["Odoo", "OWL", "QWeb", "Templates"],
    link: "https://medium.com/@amritheshvenugopalan/basics-of-owl-js-components-771a825a9f85",
  },
  {
    id: 4,
    title: "Essential Services in Odoo OWL",
    excerpt:
      "Discover how OWL services connect your frontend components with Odoo's core features such as ORM, actions, notifications, dialogs, and UI utilities using the useService hook.",
    coverImage: blog4,
    date: "Mar 6, 2026",
    readTime: "8 min read",
    category: "Odoo OWL",
    tags: ["Odoo", "OWL", "Services", "Frontend"],
    link: "https://medium.com/@amritheshvenugopalan/basics-of-owl-js-components-771a825a9f85",
  },
  {
    id: 5,
    title: "Component Communication and Environments in Odoo OWL",
    excerpt:
      "Learn how OWL components communicate using props, custom events, and environment hooks like useSubEnv and useEnv to manage state and logic across complex component trees.",
    coverImage: blog5,
    date: "Mar 7, 2026",
    readTime: "9 min read",
    category: "Odoo OWL",
    tags: ["Odoo", "OWL", "Component Communication", "Environment"],
    link: "https://medium.com/@amritheshvenugopalan/basics-of-owl-js-components-771a825a9f85",
  },
];

const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(() =>
    window.innerWidth <= 768 ? 2 : 4,
  );
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
        <div className="blogs-grid" key={currentPage} ref={gridRef}>
          {currentBlogs.map((blog) => (
            <a
              key={blog.id}
              className="blog-card"
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
            >
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
                  <span className="blog-link">
                    Read more <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </a>
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
