import React from "react";
import { ArrowRight, FileText } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
  const contactLinks = [
    {
      name: "GitHub",
      username: "amritheshk",
      url: "https://github.com/amritheshk",
      icon: <FaGithub />,
    },
    {
      name: "LinkedIn",
      username: "amrithesh-k",
      url: "https://www.linkedin.com/in/amrithesh-k",
      icon: <FaLinkedin />,
    },
    {
      name: "Instagram",
      username: "@amrithesh.k",
      url: "https://www.instagram.com/amrithesh.k",
      icon: <FaInstagram />,
    },
    {
      name: "Resume",
      username: "Download PDF",
      url: "/resume.pdf",
      icon: <FileText size={20} />,
      download: true,
    },
  ];

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Left Section */}
        <div className="contact-left">
          <h1 className="contact-title">Let's Connect</h1>

          <p className="contact-description">
            I'm always excited to collaborate on innovative projects, discuss
            technical challenges, and explore new opportunities in software
            development.
          </p>

          {/* Email */}
          <a
            href="mailto:amritheshvenugopalan@gmail.com"
            className="contact-email"
          >
            amritheshvenugopalan@gmail.com
            <ArrowRight size={18} className="email-arrow" />
          </a>

          {/* Phone */}
          <div className="contact-phone">+91 9876543210</div>
        </div>

        {/* Right Section */}
        <div className="contact-right">
          <h3 className="contact-elsewhere">ELSEWHERE</h3>

          <div className="contact-links">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-card"
                download={link.download}
              >
                <div className="link-header">
                  <span className="link-icon">{link.icon}</span>
                  <span className="link-name">{link.name}</span>
                </div>
                <span className="link-username">{link.username}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="contact-footer">
        <div className="footer-content">
          <p className="footer-copyright">
            © 2026 Amrithesh K. All rights reserved.
          </p>
          <p className="footer-updated">Last Updated on Jan, 31 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
