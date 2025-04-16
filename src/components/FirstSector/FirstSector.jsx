import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import Navbar from "../Navbar";
import "./FirstSector.css";

function FirstSector({ className }) {
  const [selectedTreatment, setSelectedTreatment] = useState("IMPLANTOLOGIA");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [treatmentType, setTreatmentType] = useState("1 Adulto");

  const treatments = [
    "IMPLANTOLOGIA",
    "ORTODONZIA",
    "ESTETICA DENTALE",
    "PROTESI DENTALI",
  ];

  const treatmentOptions = [
    "1 Adulto",
    "1 Bambino",
    "1 Adulto, 1 Bambino",
    "2 Adulti",
    "2 Adulti, 1 Bambino",
  ];

  const handleBooking = () => {
    const formattedDate = selectedDate.toLocaleDateString("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Use URL-encoded newline characters (%0A) for line breaks
    const message =
      `Ciao, vorrei prenotare un appuntamento per:%0A%0A` +
      `*Trattamento:* ${selectedTreatment}%0A` +
      `*Data:* ${formattedDate}%0A` +
      `*Trattamento per:* ${treatmentType}`;

    window.open(`https://wa.me/355696283333?text=${message}`);
  };

  return (
    <div className={`first-sector ${className || ""}`}>
      <Navbar />
      <div className="landing-container">
        {/* Header Section */}
        <div className="landing-container2">
          <div className="landing-header">
            <div className="landing-header__rating">
              <img
                src="/google-trustpilot.svg"
                alt="Trust badges"
                className="trust-badge"
              />

              <div className="experience-icon2">
                <img src="/logo3.png" alt="Experience icon" />
              </div>
            </div>

            <div className="landing-header__main">
              <div className="landing-header__content">
                {/* Header text */}
                <div className="landing-header__text">
                  <p className="landing-header__company">GO HEALTH ALBANIA</p>
                  <h1 className="landing-header__title">
                    Stai Cercando La Migliore Clinica Dentale In Albania?
                  </h1>
                </div>

                {/* Stats section */}
                <div className="landing-header__stats">
                  {/* Patients stat */}
                  <div className="landing-header__stat">
                    <div className="landing-header__stat-icon">
                      <img src="/logo1.svg" alt="Patient icon" />
                    </div>
                    <p className="landing-header__stat-number">8,000+</p>
                    <p className="landing-header__stat-label">
                      Pazienti Italiani Soddisfatti
                    </p>
                  </div>

                  {/* Experience stat */}
                  <div className="landing-header__stat">
                    <div className="landing-header__stat-icon">
                      <img src="/logo2.svg" alt="Experience icon" />
                    </div>
                    <p className="landing-header__stat-number">7+</p>
                    <p className="landing-header__stat-label">
                      Anni Di Esperienza
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Image Section */}
          <div className="landing-content__image">
            <img
              src="/parapas/Rezultati 2.svg"
              alt="Before and After"
              className="before-after-image"
            />
            <span className="image-label prima">Prima</span>
            <span className="image-label dopo">Dopo</span>
          </div>
        </div>

        <div className="appointment-container">
          <div className="appointment-header">
            <h1 className="appointment-title">Trova La Soluzione Perfetta</h1>

            <div className="nav-menu">
              {treatments.map((treatment) => (
                <button
                  key={treatment}
                  className={`nav-item ${
                    selectedTreatment === treatment ? "active" : ""
                  }`}
                  onClick={() => setSelectedTreatment(treatment)}
                >
                  {treatment}
                </button>
              ))}
            </div>
          </div>

          <div className="appointment-form">
            <div className="form-field">
              <div className="icon-container">
                <FaMapMarkerAlt className="field-icon" />
              </div>
              <div className="field-content">
                <p className="field-label">Posizione</p>
                <p className="field-value">Tirana, Albania</p>
              </div>
            </div>

            <div className="form-field">
              <div className="icon-container">
                <FaCalendarAlt className="field-icon" />
              </div>
              <div className="field-content">
                <p className="field-label">Data Dell'appuntamento</p>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd MMMM yyyy"
                  minDate={new Date()}
                  locale="it"
                  className="date-picker"
                />
              </div>
            </div>

            <div className="form-field">
              <div className="icon-container">
                <FaUserFriends className="field-icon" />
              </div>
              <div className="field-content">
                <p className="field-label">Trattamento Per</p>
                <select
                  value={treatmentType}
                  onChange={(e) => setTreatmentType(e.target.value)}
                  className="treatment-select"
                >
                  {treatmentOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button className="book-button" onClick={handleBooking}>
              PRENOTA UN APPUNTAMENTO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstSector;
