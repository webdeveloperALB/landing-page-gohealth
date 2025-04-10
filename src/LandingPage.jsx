import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp icon from react-icons
import FirstSector from "./components/FirstSector/FirstSector";
import FourthSection from "./components/FourthSector/FourthSection";
import Navbar from "./components/Navbar";
import SecondSector from "./components/SecondSector/SecondSector";
import ThirdSection from "./components/ThirdSector/ThirdSection";
import FifthSection from "./components/FifthSector/FifthSection";
import SixthComponent from "./components/SixthSector/SixthComponent";
import SeventhComponent from "./components/SeventhSector/SeventhComponent";
import EightComponent from "./components/EightSector/EightComponent";
import NinthComponent from "./components/NinthSector/NinthComponent";
import TenthComponent from "./components/TenthSector/TenthComponent";
import ElevenComponent from "./components/ElevenSector/ElevenComponent";
import "./LandingPage.css"

const LandingPage = () => {
  return (
    <div className="sectors-container">
     <FirstSector className="first-sector" />
      <SecondSector className="second-sector" />
      <ThirdSection className="third-sector" />
      <FourthSection className="fourth-sector" />
      <FifthSection className="fifth-sector" />
      <SixthComponent className="sixth-sector" />
      <SeventhComponent className="seventh-sector" />
      <EightComponent className="eight-sector" />
      <NinthComponent className="ninth-sector" />
      <TenthComponent className="tenth-sector" />
      <ElevenComponent className="eleven-sector" />

      {/* WhatsApp icon */}
      <div className="whatsapp-icon">
        <a href="https://wa.me/355696283333" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp size={40} color="#25D366" />
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
