import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./LandingPage";
import ElevenComponent from "./components/ElevenSector/ElevenComponent";
import CheckupPage from "./components/CheckupPage";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <title>
          GoHealth Albania - Premium Medical Services & Dental Clinic
        </title>
        <meta
          name="description"
          content="Book appointments with GoHealth Albania for quality dental and medical services. Expert care at competitive prices - your dental tourism destination in Albania."
        />
        <link rel="canonical" href="https://lp.gohealthalbania.com" />
        <link
          rel="alternate"
          hreflang="en"
          href="https://lp.gohealthalbania.com"
        />
        <link
          rel="alternate"
          hreflang="it"
          href="https://lp.gohealthalbania.com/it"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            name: "GoHealth Albania",
            description:
              "Premium dental clinic in Albania offering quality dental services",
            medicalSpecialty: "Dentistry",
            url: "https://lp.gohealthalbania.com",
            telephone: "+393450462456",
          })}
        </script>
      </Helmet>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/eleven-component" element={<ElevenComponent />} />
          <Route path="/checkup" element={<CheckupPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
