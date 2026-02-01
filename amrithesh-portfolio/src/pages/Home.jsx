import React, { useEffect, useRef, useReducer } from "react";
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
const ICON_SIZE = 40; // matches .orbit-icon width/height in CSS

// ─── Breakpoint config ──────────────────────────────────────────────────────
// Each entry: { maxWidth, profileSize, radius }
// profileSize = the square that the profile image fills
// radius      = orbit radius in px
const BREAKPOINTS = [
  { maxWidth: 480, profileSize: 180, radius: 140 },
  { maxWidth: 768, profileSize: 200, radius: 170 },
  { maxWidth: 1120, profileSize: 240, radius: 170 },
  { maxWidth: 1416, profileSize: 260, radius: 170 },
  { maxWidth: Infinity, profileSize: 320, radius: 213 }, // desktop
];

// The brush line sits at 62% down the profile image box.
// Icons should disappear right at that line.
const BRUSH_LINE_RATIO = 0.62;

function getBreakpoint(windowWidth) {
  for (const bp of BREAKPOINTS) {
    if (windowWidth <= bp.maxWidth) return bp;
  }
  return BREAKPOINTS[BREAKPOINTS.length - 1];
}

const ORBIT_DURATION_MS = 16000;

const Home = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const animRef = useRef(null);
  const startTimeRef = useRef(performance.now());
  const bpRef = useRef(BREAKPOINTS[BREAKPOINTS.length - 1]);

  // ─── Responsive breakpoint ────────────────────────────────────────────
  useEffect(() => {
    const update = () => {
      bpRef.current = getBreakpoint(window.innerWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ─── rAF loop ───────────────────────────────────────────────────────────
  useEffect(() => {
    const loop = () => {
      forceUpdate();
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // ─── Derived geometry ───────────────────────────────────────────────────
  const { profileSize, radius } = bpRef.current;

  // orbit-container must hold the full circle: diameter + one icon width for margin
  const containerSize = 2 * radius + ICON_SIZE;
  // It's centred on the profile box, so it overhangs equally on each side
  const offset = (containerSize - profileSize) / 2;

  // Brush line Y in profile-side coords
  const brushY = profileSize * BRUSH_LINE_RATIO;
  // Convert to orbit-container coords (container top is at -offset relative to profile)
  const clipHeight = brushY + offset;

  // ─── Icon positions ─────────────────────────────────────────────────────
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
          <p className="subtitle">ODOO / WEB DEVELOPER · 2025</p>

          <h1 className="name">
            Hello! I&apos;m <span className="last-name">Amrithesh</span>
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

        {/* RIGHT: PROFILE + ORBIT
            Layers (bottom → top):
              1. .orbit-clip  z:1  — overflow:hidden, cuts icons at brush line
              2. .brush-stroke z:2 — visual brush on top of the cut edge
              3. .profile-image-wrapper z:3 — photo on top of everything
        */}
        <div className="profile-side">
          {/* Layer 1 — clip wrapper. Sized & positioned by JS so it's always
              correct regardless of breakpoint. */}
          <div
            className="orbit-clip"
            style={{
              top: -offset,
              left: -offset,
              width: containerSize,
              height: clipHeight,
            }}
          >
            {/* orbit-container — full circle size, icons centred at 50%/50% */}
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

          {/* Layer 2 — brush texture */}
          <img src={brushStroke} alt="" className="brush-stroke" />

          {/* Layer 3 — profile photo */}
          <div className="profile-image-wrapper">
            <img src={profileImage} alt="Amrithesh" className="profile-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
