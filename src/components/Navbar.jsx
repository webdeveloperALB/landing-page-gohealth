import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");

  const handleSetActive = (link) => {
    setActiveLink(link);
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

        {/* Center Logo */}
        <div className="nav-section center-section">
          <img src="/NavbarLogo.png" alt="Clinic Logo" className="nav-logo" />
        </div>

        {/* Right CTA */}
        <div className="nav-section right-section">
          <button className="cta-button">CHECK-UP GRATUITO</button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
