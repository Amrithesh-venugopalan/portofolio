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
  const [showDesktopPill, setShowDesktopPill] = useState(false);
  const desktopPillTimeout = useRef(null);

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

  // ── Desktop pill: show on intersection, auto-hide after 1.5 s ──
  const prevActiveSection = useRef(activeSection);

  useEffect(() => {
    if (isMobile) return; // desktop-only

    // Only trigger when activeSection actually changed
    if (prevActiveSection.current !== activeSection) {
      prevActiveSection.current = activeSection;

      // Clear any running timer
      if (desktopPillTimeout.current) {
        clearTimeout(desktopPillTimeout.current);
      }

      // Only show pill if not on home section
      if (activeSection !== "home") {
        setShowDesktopPill(true);

        desktopPillTimeout.current = setTimeout(() => {
          setShowDesktopPill(false);
        }, 1500);
      } else {
        setShowDesktopPill(false);
      }
    }

    return () => {
      if (desktopPillTimeout.current) {
        clearTimeout(desktopPillTimeout.current);
      }
    };
  }, [activeSection, isMobile]);

  // ── Carousel sync (unchanged logic) ──
  useEffect(() => {
    if (!isMobileCarousel || isAnimating || isProgrammaticScroll.current) {
      return;
    }

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

    if (programmaticScrollTimeout.current) {
      clearTimeout(programmaticScrollTimeout.current);
    }

    setSlideDirection("right");
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentPage(newPage);
      setIsAnimating(false);
      setSlideDirection("");

      onNavigate(firstIconOfNewPage.id);

      setTimeout(() => {
        setHideHighlight(false);
      }, 100);

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

    if (programmaticScrollTimeout.current) {
      clearTimeout(programmaticScrollTimeout.current);
    }

    setSlideDirection("left");
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentPage(newPage);
      setIsAnimating(false);
      setSlideDirection("");

      onNavigate(firstIconOfNewPage.id);

      setTimeout(() => {
        setHideHighlight(false);
      }, 100);

      programmaticScrollTimeout.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 1000);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (programmaticScrollTimeout.current) {
        clearTimeout(programmaticScrollTimeout.current);
      }
    };
  }, []);

  // ── Derived data ──
  const iconsPerPage = 4;
  const startIndex = currentPage * iconsPerPage;
  const visibleItems = isMobileCarousel
    ? navigationItems.slice(startIndex, startIndex + iconsPerPage)
    : navigationItems;

  // Current active item's label (used by both pills)
  const activeItem = navigationItems.find((item) => item.id === activeSection);
  const activeLabel = activeItem ? activeItem.label : "";

  // For desktop pill: find the index of the active item *within visibleItems*
  // so we can position it next to the correct icon
  const activeVisibleIndex = visibleItems.findIndex(
    (item) => item.id === activeSection,
  );

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
          {visibleItems.map(({ id, Icon, label }, index) => {
            const isActive = !hideHighlight && activeSection === id;

            return (
              <div
                key={id}
                className="sidebar-icon-wrapper"
                onMouseEnter={() => {
                  // Desktop hover: show pill if this is the active icon and not home
                  if (
                    !isMobile &&
                    isActive &&
                    !showDesktopPill &&
                    id !== "home"
                  ) {
                    setShowDesktopPill(true);
                  }
                }}
                onMouseLeave={() => {
                  // Desktop hover-out: hide pill only if the auto-show timer already expired
                  if (!isMobile && isActive && !desktopPillTimeout.current) {
                    setShowDesktopPill(false);
                  }
                }}
              >
                <button
                  className={`sidebar-btn ${isActive ? "active" : ""}`}
                  onClick={() => {
                    isProgrammaticScroll.current = true;

                    if (programmaticScrollTimeout.current) {
                      clearTimeout(programmaticScrollTimeout.current);
                    }

                    onNavigate(id);

                    programmaticScrollTimeout.current = setTimeout(() => {
                      isProgrammaticScroll.current = false;
                    }, 1000);
                  }}
                  title={label}
                >
                  <Icon size={20} />
                </button>

                {/* Desktop pill — rendered next to each icon but only visible on the active one (except home) */}
                {!isMobile && isActive && showDesktopPill && id !== "home" && (
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
