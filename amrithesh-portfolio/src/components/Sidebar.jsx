import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { navigationItems } from "../constants/navigation";
import "./Sidebar.css";

const Sidebar = ({ activeSection, onNavigate }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobileCarousel, setIsMobileCarousel] = useState(false);
  const [slideDirection, setSlideDirection] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [hideHighlight, setHideHighlight] = useState(false); // NEW: Hide highlight during transitions
  const isProgrammaticScroll = useRef(false);
  const programmaticScrollTimeout = useRef(null);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobileCarousel(window.innerWidth < 420);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

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
    setHideHighlight(true); // Hide highlight before transition

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

      // Show highlight after scroll settles
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
    setHideHighlight(true); // Hide highlight before transition

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

      // Show highlight after scroll settles
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

  const iconsPerPage = 4;
  const startIndex = currentPage * iconsPerPage;
  const visibleItems = isMobileCarousel
    ? navigationItems.slice(startIndex, startIndex + iconsPerPage)
    : navigationItems;

  return (
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
        {visibleItems.map(({ id, Icon, label }) => (
          <button
            key={id}
            className={`sidebar-btn ${
              !hideHighlight && activeSection === id ? "active" : ""
            }`}
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
        ))}
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
  );
};

export default Sidebar;
