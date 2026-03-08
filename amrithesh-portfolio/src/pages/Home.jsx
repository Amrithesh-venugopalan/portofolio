import React, { useEffect, useRef, useReducer, useState } from "react";
import { FaPython, FaReact, FaNodeJs, FaGithub, FaHtml5 } from "react-icons/fa";
import { BiLogoTailwindCss, BiLogoPostgresql } from "react-icons/bi";
import { IoLogoJavascript } from "react-icons/io5";
import profileImage from "../assets/profile.jpg";
import brushStroke from "../assets/brush_stroke7.png";
import "./Home.css";

// ─── Icons ──────────────────────────────────────────────────────────────────
const ICONS = [
  { Component: FaPython, label: "Python" },
  { Component: IoLogoJavascript, label: "JavaScript" },
  { Component: FaReact, label: "React" },
  { Component: FaNodeJs, label: "Node.js" },
  { Component: FaGithub, label: "GitHub" },
  { Component: BiLogoPostgresql, label: "PostgreSQL" },
  { Component: FaHtml5, label: "HTML5" },
  { Component: BiLogoTailwindCss, label: "Tailwind" },
];

const ICON_COUNT = ICONS.length;
const ICON_SIZE = 40;

const BREAKPOINTS = [
  { maxWidth: 480, profileSize: 180, radius: 140 },
  { maxWidth: 768, profileSize: 200, radius: 170 },
  { maxWidth: 1120, profileSize: 240, radius: 170 },
  { maxWidth: 1416, profileSize: 260, radius: 170 },
  { maxWidth: Infinity, profileSize: 320, radius: 213 },
];

const BRUSH_LINE_RATIO = 0.62;

function getBreakpoint(windowWidth) {
  for (const bp of BREAKPOINTS) {
    if (windowWidth <= bp.maxWidth) return bp;
  }
  return BREAKPOINTS[BREAKPOINTS.length - 1];
}

const ORBIT_DURATION_MS = 16000;

// ─── Typewriter config ───────────────────────────────────────────────────────
const WORDS = ["developer", "problem solver"];
const TYPE_SPEED = 80; // ms per character typed
const DELETE_SPEED = 50; // ms per character deleted
const PAUSE_AFTER = 1800; // ms to pause when word is fully typed

const useTypewriter = (words) => {
  const [displayed, setDisplayed] = useState(words[0]);
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const tick = () => {
      if (!isDeleting) {
        // Still typing
        if (displayed.length < currentWord.length) {
          setDisplayed(currentWord.slice(0, displayed.length + 1));
          timeoutRef.current = setTimeout(tick, TYPE_SPEED);
        } else {
          // Fully typed — pause then start deleting
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, PAUSE_AFTER);
        }
      } else {
        // Still deleting
        if (displayed.length > 0) {
          setDisplayed(displayed.slice(0, displayed.length - 1));
          timeoutRef.current = setTimeout(tick, DELETE_SPEED);
        } else {
          // Fully deleted — move to next word
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    timeoutRef.current = setTimeout(
      tick,
      isDeleting ? DELETE_SPEED : TYPE_SPEED,
    );
    return () => clearTimeout(timeoutRef.current);
  }, [displayed, isDeleting, wordIndex, words]);

  return displayed;
};

const Home = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const animRef = useRef(null);
  const startTimeRef = useRef(performance.now());
  const bpRef = useRef(BREAKPOINTS[BREAKPOINTS.length - 1]);

  const typedWord = useTypewriter(WORDS);

  // ─── Responsive breakpoint ────────────────────────────────────────────────
  useEffect(() => {
    const update = () => {
      bpRef.current = getBreakpoint(window.innerWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ─── rAF loop ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const loop = () => {
      forceUpdate();
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // ─── Derived geometry ─────────────────────────────────────────────────────
  const { profileSize, radius } = bpRef.current;
  const containerSize = 2 * radius + ICON_SIZE;
  const offset = (containerSize - profileSize) / 2;
  const brushY = profileSize * BRUSH_LINE_RATIO;
  const clipHeight = brushY + offset;

  // ─── Icon positions ───────────────────────────────────────────────────────
  const elapsed = performance.now() - startTimeRef.current;

  const icons = ICONS.map((icon, i) => {
    const staggerOffset = (i / ICON_COUNT) * ORBIT_DURATION_MS;
    const t =
      ((((elapsed - staggerOffset) % ORBIT_DURATION_MS) + ORBIT_DURATION_MS) %
        ORBIT_DURATION_MS) /
      ORBIT_DURATION_MS;

    const angleDeg = 90 - t * 360;
    const angleRad = (angleDeg * Math.PI) / 180;
    const x = radius * Math.cos(angleRad);
    const y = -radius * Math.sin(angleRad);

    return { ...icon, x, y, key: i };
  });

  return (
    <div className="page-container">
      <div className="home-inner">
        {/* LEFT: HERO CONTENT */}
        <div className="hero-content">
          <p className="subtitle">ODOO / WEB DEVELOPER · 2026</p>

          <h1 className="name">
            Hello! I&apos;m <span className="last-name">Amrithesh</span>
          </h1>

          <p className="description">
            I&apos;m a{" "}
            <span className="typewriter-word">
              {typedWord}
              <span className="typewriter-cursor" />
            </span>{" "}
            who enjoys building thoughtful solutions that make work easier.
          </p>

          <div className="availability">
            <span className="status-dot"></span>
            <span>Currently working</span>
            <span className="location">Calicut, India</span>
          </div>
        </div>

        {/* RIGHT: PROFILE + ORBIT */}
        <div className="profile-side">
          <div
            className="orbit-clip"
            style={{
              top: -offset,
              left: -offset,
              width: containerSize,
              height: clipHeight,
            }}
          >
            <div
              className="orbit-container"
              style={{ width: containerSize, height: containerSize }}
            >
              {icons.map((icon) => {
                const { Component, x, y, key, color, label } = icon;
                return (
                  <div
                    key={key}
                    className="orbit-icon"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                    aria-label={label}
                  >
                    <Component size={28} color={color} />
                  </div>
                );
              })}
            </div>
          </div>

          <img src={brushStroke} alt="" className="brush-stroke" />

          <div className="profile-image-wrapper">
            <img src={profileImage} alt="Amrithesh" className="profile-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
