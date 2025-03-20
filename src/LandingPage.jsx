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
    <div>
      <FirstSector />
      <SecondSector />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixthComponent />
      <SeventhComponent />
      <EightComponent />
      <NinthComponent />
      <TenthComponent />
      <ElevenComponent />

      {/* WhatsApp icon */}
      <div className="whatsapp-icon">
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp size={40} color="#25D366" />
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
