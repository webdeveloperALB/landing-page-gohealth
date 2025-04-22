import { useState, memo, useCallback, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import Navbar from "../Navbar";
import "./FirstSector.css";

// Extracted constant arrays outside component to prevent re-creation on every render
const TREATMENTS = [
  "IMPLANTOLOGIA",
  "ORTODONZIA",
  "ESTETICA DENTALE",
  "PROTESI DENTALI",
];

const TREATMENT_OPTIONS = [
  "1 Adulto",
  "1 Bambino",
  "1 Adulto, 1 Bambino",
  "2 Adulti",
  "2 Adulti, 1 Bambino",
];

// Further optimize images by using image component
const OptimizedImage = memo(({ src, alt, className, ...props }) => (
  <img
    src={src}
    alt={alt || ""}
    className={className || ""}
    loading="lazy"
    decoding="async"
    {...props}
  />
));

// Memoized TreatmentMenu component with useCallback for event handler
const TreatmentMenu = memo(({ selectedTreatment, onTreatmentChange }) => (
  <div className="nav-menu">
    {TREATMENTS.map((treatment) => {
      const isActive = selectedTreatment === treatment;
      return (
        <button
          key={treatment}
          className={`nav-item ${isActive ? "active" : ""}`}
          onClick={() => onTreatmentChange(treatment)}
        >
          {treatment}
        </button>
      );
    })}
  </div>
));

// Memoized FormField component with simplified structure
const FormField = memo(({ icon, label, children }) => {
  const IconComponent = icon;
  return (
    <div className="form-field">
      <div className="icon-container">
        <IconComponent className="field-icon" />
      </div>
      <div className="field-content">
        <p className="field-label">{label}</p>
        {children}
      </div>
    </div>
  );
});

// Memoized Stats component
const Stats = memo(() => (
  <div className="landing-header__stats">
    <div className="landing-header__stat">
      <div className="landing-header__stat-icon">
        <OptimizedImage src="/logo1.svg" alt="Patient icon" />
      </div>
      <p className="landing-header__stat-number">8,000+</p>
      <p className="landing-header__stat-label">
        Pazienti Italiani Soddisfatti
      </p>
    </div>

    <div className="landing-header__stat">
      <div className="landing-header__stat-icon">
        <OptimizedImage src="/logo2.svg" alt="Experience icon" />
      </div>
      <p className="landing-header__stat-number">7+</p>
      <p className="landing-header__stat-label">
        Anni Di Esperienza
      </p>
    </div>
  </div>
));

// Header text component
const HeaderText = memo(() => (
  <div className="landing-header__text">
    <p className="landing-header__company">GO HEALTH ALBANIA</p>
    <h1 className="landing-header__title">
      Stai Cercando La Migliore Clinica Dentale In Albania?
    </h1>
  </div>
));

function FirstSector({ className }) {
  const [selectedTreatment, setSelectedTreatment] = useState("IMPLANTOLOGIA");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [treatmentType, setTreatmentType] = useState("1 Adulto");

  // Memoize handlers to prevent recreation on each render
  const handleTreatmentChange = useCallback((treatment) => {
    setSelectedTreatment(treatment);
  }, []);

  const handleTreatmentTypeChange = useCallback((e) => {
    setTreatmentType(e.target.value);
  }, []);
  
  const handleDateChange = useCallback((date) => {
    setSelectedDate(date);
  }, []);

  const handleBooking = useCallback(() => {
    const formattedDate = selectedDate.toLocaleDateString("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const message =
      `Ciao, vorrei prenotare un appuntamento per:%0A%0A` +
      `*Trattamento:* ${selectedTreatment}%0A` +
      `*Data:* ${formattedDate}%0A` +
      `*Trattamento per:* ${treatmentType}`;

    window.open(`https://wa.me/355696283333?text=${message}`);
  }, [selectedTreatment, selectedDate, treatmentType]);

  // Use class computation with useMemo to avoid string concatenation on every render
  const sectorClassName = useMemo(() => 
    `first-sector ${className || ""}`.trim(), [className]);

  return (
    <div className={sectorClassName}>
      <Navbar />
      <div className="landing-container">
        {/* Header Section */}
        <div className="landing-container2">
          <div className="landing-header">
            <div className="landing-header__rating">
              <OptimizedImage
                src="/google-trustpilot.svg"
                alt="Trust badges"
                className="trust-badge"
                width="240"
                height="50"
              />

              <div className="experience-icon2">
                <OptimizedImage 
                  src="/logo3.png" 
                  alt="Experience icon"
                  width="60" 
                  height="60" 
                />
              </div>
            </div>

            <div className="landing-header__main">
              <div className="landing-header__content">
                <HeaderText />
                <Stats />
              </div>
            </div>
          </div>
          {/* Image Section */}
          <div className="landing-content__image">
            <OptimizedImage
              src="/parapas/Rezultati 2.svg"
              alt="Before and After"
              className="before-after-image"
              fetchPriority="high"
            />
            <span className="image-label prima">Prima</span>
            <span className="image-label dopo">Dopo</span>
          </div>
        </div>

        <div className="appointment-container">
          <div className="appointment-header">
            <h1 className="appointment-title">Trova La Soluzione Perfetta</h1>
            <TreatmentMenu 
              selectedTreatment={selectedTreatment} 
              onTreatmentChange={handleTreatmentChange} 
            />
          </div>

          <div className="appointment-form">
            <FormField icon={FaMapMarkerAlt} label="Posizione">
              <p className="field-value">Tirana, Albania</p>
            </FormField>

            <FormField icon={FaCalendarAlt} label="Data Dell'appuntamento">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd MMMM yyyy"
                minDate={new Date()}
                locale="it"
                className="date-picker"
              />
            </FormField>

            <FormField icon={FaUserFriends} label="Trattamento Per">
              <select
                value={treatmentType}
                onChange={handleTreatmentTypeChange}
                className="treatment-select"
              >
                {TREATMENT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </FormField>

            <button className="book-button" onClick={handleBooking}>
              PRENOTA UN APPUNTAMENTO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(FirstSector);