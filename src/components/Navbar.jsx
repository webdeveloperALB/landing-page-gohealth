import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if viewport is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleSetActive = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar-container">
      {/* Top Blue Stripe */}
      <div className="top-stripe">
        <img
          src="/Vector.svg"
          alt="Emergency icon"
          className="emergency-icon"
        />
        <p className="emergency-text">
          Chiama il +39 3450462456 per assistenza medica immediata.
        </p>
      </div>

      {/* Main Navigation */}
      <nav className="main-nav">
        {/* Center Logo (moved outside of flex layout for mobile) */}
        <div className="center-section">
          <Link to="/">
            <img src="/NavbarLogo.png" alt="Clinic Logo" className="nav-logo" />
          </Link>
        </div>

        {/* Hamburger Menu Button (only shown on mobile) */}
        <button
          className="hamburger-button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navigation Links Container */}
        <div
          className={`nav-links-container ${isMenuOpen ? "menu-open" : ""} ${
            isMobile ? "mobile" : ""
          }`}
        >
          {/* Left Navigation Items */}
          <div className="nav-section left-section">
            <Link
              to="/"
              className={`nav-link ${activeLink === "home" ? "active" : ""}`}
              onClick={() => handleSetActive("home")}
            >
              HOME
            </Link>
            <a
              href="/treatments"
              className={`nav-link ${
                activeLink === "treatments" ? "active" : ""
              }`}
              onClick={() => handleSetActive("treatments")}
            >
              TREATMENTS
            </a>
            <a
              href="/about"
              className={`nav-link ${activeLink === "about" ? "active" : ""}`}
              onClick={() => handleSetActive("about")}
            >
              ABOUT US
            </a>
            <a
              href="/blog"
              className={`nav-link ${activeLink === "blog" ? "active" : ""}`}
              onClick={() => handleSetActive("blog")}
            >
              BLOG
            </a>
          </div>

          {/* Right CTA */}
          <Link to="/checkup" className="cta-button">
            CHECK-UP GRATUITO
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
