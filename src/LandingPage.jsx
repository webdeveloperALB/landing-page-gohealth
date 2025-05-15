import React, { lazy, Suspense } from "react";
import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp icon from react-icons
import Navbar from "./components/Navbar";
import "./LandingPage.css";

// Import only the first sector eagerly (above the fold)
import FirstSector from "./components/FirstSector/FirstSector";

// Lazy load all other components
const SecondSector = lazy(() =>
  import("./components/SecondSector/SecondSector")
);
const ThirdSection = lazy(() =>
  import("./components/ThirdSector/ThirdSection")
);
const FourthSection = lazy(() =>
  import("./components/FourthSector/FourthSection")
);
const FifthSection = lazy(() =>
  import("./components/FifthSector/FifthSection")
);
const SixthComponent = lazy(() =>
  import("./components/SixthSector/SixthComponent")
);
const SeventhComponent = lazy(() =>
  import("./components/SeventhSector/SeventhComponent")
);
const EightComponent = lazy(() =>
  import("./components/EightSector/EightComponent")
);
const NinthComponent = lazy(() =>
  import("./components/NinthSector/NinthComponent")
);
const TenthComponent = lazy(() =>
  import("./components/TenthSector/TenthComponent")
);
const ElevenComponent = lazy(() =>
  import("./components/ElevenSector/ElevenComponent")
);

// Loading placeholder
const LoadingFallback = () => <div className="loading-section">Loading...</div>;

const LandingPage = () => {
  // Pre-define the WhatsApp message
  const whatsappMessage = "Ciao! Vorrei avere più informazioni sui trattamenti dentali che offrite in Albania. Potete aiutarmi?";
  
  // Create the WhatsApp URL with properly encoded message
  const whatsappUrl = `https://wa.me/355696283333?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="sectors-container">
      {/* Load first sector eagerly (above the fold) */}
      <FirstSector className="first-sector" />
      {/* Suspense for lazy loaded components */}
      <Suspense fallback={<LoadingFallback />}>
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
      </Suspense>
      {/* WhatsApp icon - keep outside Suspense for immediate visibility */}
      <div className="whatsapp-icon">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
        >
          <FaWhatsapp size={40} color="#25D366" />
        </a>
      </div>
    </div>
  );
};

export default LandingPage;