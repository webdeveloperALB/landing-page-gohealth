import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
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

      <nav className="main-nav">
        <div className="center-section">
          <Link 
            to="/" 
            onClick={() => handleSetActive("home")}
          >
            <img src="/NavbarLogo.png" alt="Clinic Logo" className="nav-logo" />
          </Link>
        </div>

        <button
          className="hamburger-button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <div
          className={`nav-links-container ${isMenuOpen ? "menu-open" : ""} ${
            isMobile ? "mobile" : ""
          }`}
        >
          <div className="nav-section left-section">
            <Link
              to="/"
              className={`nav-link ${activeLink === "home" ? "active" : ""}`}
              onClick={() => handleSetActive("home")}
            >
              HOME
            </Link>
            {/* Non-clickable links replaced with span elements */}
            <span
              className={`nav-link disabled ${
                activeLink === "treatments" ? "active" : ""
              }`}
            >
              TREATMENTS
            </span>
            <span
              className={`nav-link disabled ${activeLink === "about" ? "active" : ""}`}
            >
              ABOUT US
            </span>
            <span
              className={`nav-link disabled ${activeLink === "blog" ? "active" : ""}`}
            >
              BLOG
            </span>
          </div>

          <Link 
            to="/checkup" 
            className="cta-button"
            onClick={() => setIsMenuOpen(false)}
          >
            CHECK-UP GRATUITO
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;