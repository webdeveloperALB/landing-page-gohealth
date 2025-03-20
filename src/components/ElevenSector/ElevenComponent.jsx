import React, { useState, useRef, useEffect } from "react";
import "./ElevenComponent.css";
import {
  Calendar,
  Clock,
  ChevronDown,
  MapPin,
  Phone,
  Info,
} from "lucide-react";

const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-select" ref={selectRef}>
      <div
        className={`select-header ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || placeholder}</span>
        <ChevronDown className={`icon ${isOpen ? "rotate" : ""}`} />
      </div>
      {isOpen && (
        <div className="dropdown-options">
          {options.map((option) => (
            <div
              key={option.value}
              className={`option-item ${
                value === option.value ? "selected" : ""
              }`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ElevenComponent = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(
    "Dental Oral Care"
  );
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [formData, setFormData] = useState({
    service: "",
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const departments = [
    { value: "Dental Oral Care", label: "Dental Oral Care" },
    { value: "Orthodontics", label: "Orthodontics" },
    { value: "Surgery", label: "Surgery" },
  ];

  const treatments = [
    { value: "", label: "Seleziona Trattamento" },
    { value: "Cleaning", label: "Cleaning" },
    { value: "Root Canal", label: "Root Canal" },
    { value: "Whitening", label: "Whitening" },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div id="eleven-section" className="booking-container">
      <div className="map-section">
        <div className="map-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.039790811289!2d19.8219329!3d41.329748099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13503155ad618535%3A0xa70a3361bf396f57!2sGo%20Health%20Albania!5e0!3m2!1sen!2s!4v1742404901054!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className="info-boxes-container">
            <div className="info-box">
              <MapPin />
              <div>
                <h3>La Nostra Posizione</h3>
                <p>Tirana, Albania</p>
              </div>
            </div>

            <div className="info-box">
              <Phone />
              <div>
                <h3>Hai Domande?</h3>
                <p>info@gohealthalbania.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="form-header">
          <p className="contact-title">METTITI IN CONTATTO</p>
          <h1 className="booking-title">
            Prenotazione Semplice E Veloce Con Noi
          </h1>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>
                Reparto <span className="required">*</span>
              </label>
              <CustomSelect
                options={departments}
                value={selectedDepartment}
                onChange={setSelectedDepartment}
              />
            </div>

            <div className="form-group">
              <label>Tipologia Di Trattamento</label>
              <CustomSelect
                options={treatments}
                value={selectedTreatment}
                onChange={setSelectedTreatment}
                placeholder="Seleziona Trattamento"
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>
              Tipo Di Servizio Richiesto <span className="required">*</span>
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                name="service"
                placeholder="Come Possiamo Aiutarti?"
                value={formData.service}
                onChange={handleInputChange}
                required
              />
              <Info className="input-icon" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                Nome <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="name"
                  placeholder="Il Tuo Nome"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                Email <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  placeholder="La Tua Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                Data <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="date"
                  placeholder="Seleziona La Data"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
                <Calendar className="input-icon" />
              </div>
            </div>

            <div className="form-group">
              <label>
                Ora <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="time"
                  placeholder="Seleziona L'orario"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
                <Clock className="input-icon" />
              </div>
            </div>
          </div>

          <button type="submit" className="submit-button">
            PRENOTA UN APPUNTAMENTO
          </button>
        </form>
      </div>
    </div>
  );
};

export default ElevenComponent;