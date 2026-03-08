import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { navigationItems } from "../constants/navigation";
import "./Sidebar.css";

const Sidebar = ({ activeSection, onNavigate }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobileCarousel, setIsMobileCarousel] = useState(false);
  const [slideDirection, setSlideDirection] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [hideHighlight, setHideHighlight] = useState(false);
  const isProgrammaticScroll = useRef(false);
  const programmaticScrollTimeout = useRef(null);

  // ─── Desktop pill state ───
  const [showActivePill, setShowActivePill] = useState(false); // auto-show on section change
  const [hoveredId, setHoveredId] = useState(null); // hover-show on any icon
  const activePillTimeout = useRef(null);

  // ─── Mobile pill state ───
  const [isMobile, setIsMobile] = useState(false);

  // ── Responsive checks ──
  useEffect(() => {
    const checkWidth = () => {
      const w = window.innerWidth;
      setIsMobileCarousel(w < 420);
      setIsMobile(w <= 768);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // ── Desktop pill: auto-show on section change, hide after 1.5 s ──
  const prevActiveSection = useRef(activeSection);

  useEffect(() => {
    if (isMobile) return;

    if (prevActiveSection.current !== activeSection) {
      prevActiveSection.current = activeSection;

      if (activePillTimeout.current) clearTimeout(activePillTimeout.current);

      if (activeSection !== "home") {
        setShowActivePill(true);
        activePillTimeout.current = setTimeout(() => {
          setShowActivePill(false);
        }, 1500);
      } else {
        setShowActivePill(false);
      }
    }

    return () => {
      if (activePillTimeout.current) clearTimeout(activePillTimeout.current);
    };
  }, [activeSection, isMobile]);

  // ── Carousel sync ──
  useEffect(() => {
    if (!isMobileCarousel || isAnimating || isProgrammaticScroll.current)
      return;

    const activeIndex = navigationItems.findIndex(
      (item) => item.id === activeSection,
    );
    if (activeIndex === -1) return;

    const requiredPage = activeIndex < 4 ? 0 : 1;

    if (requiredPage !== currentPage) {
      const direction = requiredPage > currentPage ? "left" : "right";
      requestAnimationFrame(() => {
        setSlideDirection(direction);
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentPage(requiredPage);
          setIsAnimating(false);
          setSlideDirection("");
        }, 300);
      });
    }
  }, [activeSection, isMobileCarousel, currentPage, isAnimating]);

  const handlePrevious = () => {
    if (isAnimating) return;
    const newPage = currentPage === 0 ? 1 : 0;
    const firstIconOfNewPage = navigationItems[newPage * 4];
    isProgrammaticScroll.current = true;
    setHideHighlight(true);
    if (programmaticScrollTimeout.current)
      clearTimeout(programmaticScrollTimeout.current);
    setSlideDirection("right");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsAnimating(false);
      setSlideDirection("");
      onNavigate(firstIconOfNewPage.id);
      setTimeout(() => setHideHighlight(false), 100);
      programmaticScrollTimeout.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 1000);
    }, 300);
  };

  const handleNext = () => {
    if (isAnimating) return;
    const newPage = currentPage === 0 ? 1 : 0;
    const firstIconOfNewPage = navigationItems[newPage * 4];
    isProgrammaticScroll.current = true;
    setHideHighlight(true);
    if (programmaticScrollTimeout.current)
      clearTimeout(programmaticScrollTimeout.current);
    setSlideDirection("left");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsAnimating(false);
      setSlideDirection("");
      onNavigate(firstIconOfNewPage.id);
      setTimeout(() => setHideHighlight(false), 100);
      programmaticScrollTimeout.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 1000);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (programmaticScrollTimeout.current)
        clearTimeout(programmaticScrollTimeout.current);
    };
  }, []);

  // ── Derived data ──
  const iconsPerPage = 4;
  const startIndex = currentPage * iconsPerPage;
  const visibleItems = isMobileCarousel
    ? navigationItems.slice(startIndex, startIndex + iconsPerPage)
    : navigationItems;

  const activeItem = navigationItems.find((item) => item.id === activeSection);
  const activeLabel = activeItem ? activeItem.label : "";

  return (
    <>
      {/* ─── MOBILE TOP PILL ─── */}
      {isMobile && activeLabel && activeSection !== "home" && (
        <div className="mobile-section-pill">{activeLabel}</div>
      )}

      {/* ─── SIDEBAR ─── */}
      <div
        className={`sidebar-wrapper ${isMobileCarousel ? "carousel-mode" : ""}`}
      >
        {isMobileCarousel && (
          <button
            className="carousel-arrow left-arrow"
            onClick={handlePrevious}
            aria-label="Previous icons"
            disabled={isAnimating}
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <div
          className={`sidebar ${slideDirection ? `slide-${slideDirection}` : ""}`}
        >
          {visibleItems.map(({ id, Icon, label }) => {
            const isActive = !hideHighlight && activeSection === id;

            /*
              Show pill if:
              1. Hovering over this icon (any icon, any section), OR
              2. This is the active section AND the auto-show timer is running
              Either way, skip "home" and skip mobile.
            */
            const showPill =
              !isMobile &&
              id !== "home" &&
              (hoveredId === id || (isActive && showActivePill));

            return (
              <div
                key={id}
                className="sidebar-icon-wrapper"
                onMouseEnter={() => {
                  if (!isMobile) setHoveredId(id);
                }}
                onMouseLeave={() => {
                  if (!isMobile) setHoveredId(null);
                }}
              >
                <button
                  className={`sidebar-btn ${isActive ? "active" : ""}`}
                  onClick={() => {
                    isProgrammaticScroll.current = true;
                    if (programmaticScrollTimeout.current)
                      clearTimeout(programmaticScrollTimeout.current);
                    onNavigate(id);
                    programmaticScrollTimeout.current = setTimeout(() => {
                      isProgrammaticScroll.current = false;
                    }, 1000);
                  }}
                  title={label}
                >
                  <Icon size={20} />
                </button>

                {showPill && (
                  <span className="desktop-section-pill">{label}</span>
                )}
              </div>
            );
          })}
        </div>

        {isMobileCarousel && (
          <button
            className="carousel-arrow right-arrow"
            onClick={handleNext}
            aria-label="Next icons"
            disabled={isAnimating}
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </>
  );
};

export default Sidebar;
