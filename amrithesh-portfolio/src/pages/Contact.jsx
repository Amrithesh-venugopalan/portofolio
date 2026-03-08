import React from "react";
import { ArrowRight, FileDown, PenLine } from "lucide-react";
import { SiGithub, SiLinkedin, SiLeetcode, SiMedium } from "react-icons/si";
import resume from "../assets/resume.pdf";
import "./Contact.css";

const contactLinks = [
  {
    name: "GitHub",
    username: "@Amrithesh-venugopalan",
    url: "https://github.com/Amrithesh-venugopalan",
    icon: <SiGithub size={20} />,
  },
  {
    name: "LinkedIn",
    username: "amrithesh-k-507786264",
    url: "https://www.linkedin.com/in/amrithesh-k-507786264/",
    icon: <SiLinkedin size={20} />,
  },
  {
    name: "LeetCode",
    username: "@K_Amrithesh",
    url: "https://leetcode.com/u/K_Amrithesh/",
    icon: <SiLeetcode size={20} />,
  },
  {
    name: "Medium",
    username: "@amritheshvenugopalan",
    url: "https://medium.com/@amritheshvenugopalan",
    icon: <PenLine size={20} />,
  },
  // {
  //   name: "Resume",
  //   username: "Download PDF",
  //   url: resume,
  //   icon: <FileDown size={20} />,
  //   download: "Amrithesh_Resume.pdf",
  // },
];

const Contact = () => {
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
          <div className="contact-phone">+91 9633323325</div>
        </div>

        {/* Right Section */}
        <div className="contact-right">
          <div className="contact-links">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target={link.download ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="contact-link-card"
                download={link.download || undefined}
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
      <footer className="contact-footer" style={{ marginTop: "48px" }}>
        <div className="footer-content">
          <p className="footer-copyright">
            © 2026 Amrithesh K. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
