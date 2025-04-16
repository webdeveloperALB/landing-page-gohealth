import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import it from "date-fns/locale/it";
import "react-datepicker/dist/react-datepicker.css";
import "./ElevenComponent.css";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Calendar,
  Clock,
  ChevronDown,
  Phone,
  Info,
} from "lucide-react";

registerLocale("it", it);

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
              className={`option-item ${value === option.value ? "selected" : ""
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

const DateTimePicker = ({ selected, onChange, placeholder, timeOnly }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-datetime-picker" ref={pickerRef}>
      <div className="picker-input" onClick={() => setIsOpen(!isOpen)}>
        <input
          type="text"
          value={
            selected
              ? timeOnly
                ? selected.toLocaleTimeString("it-IT", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
                : selected.toLocaleDateString("it-IT")
              : ""
          }
          placeholder={placeholder}
          readOnly
        />
        {timeOnly ? (
          <Clock className="input-icon" />
        ) : (
          <Calendar className="input-icon" />
        )}
      </div>

      {isOpen && (
        <div className="picker-popup">
          <DatePicker
            selected={selected}
            onChange={(date) => {
              onChange(date);
              setIsOpen(false);
            }}
            inline
            showTimeSelect={timeOnly}
            showTimeSelectOnly={timeOnly}
            timeIntervals={15}
            locale="it"
            dateFormat={timeOnly ? "HH:mm" : "dd/MM/yyyy"}
          />
        </div>
      )}
    </div>
  );
};

const ElevenComponent = ({ className }) => {
  const [selectedDepartment, setSelectedDepartment] =
    useState("Dental Oral Care");
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [captchaError, setCaptchaError] = useState(false);
  const recaptchaRef = useRef(null);
  const [formData, setFormData] = useState({
    service: "",
    name: "",
    email: "",
    date: null,
    time: null,
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

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleTimeChange = (time) => {
    setFormData({ ...formData, time });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    setCaptchaError(false);
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.service ||
      !formData.date ||
      !formData.time
    ) {
      alert("Per favore compila tutti i campi obbligatori");
      return;
    }

    if (!isValidEmail(formData.email)) {
      alert("Per favore inserisci un indirizzo email valido");
      return;
    }

    if (!captchaValue) {
      setCaptchaError(true);
      alert("Per favore completa il reCAPTCHA");
      return;
    }

    try {
      const response = await fetch(
        "https://gohealth-server.onrender.com/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            service: formData.service,
            date: formData.date.toISOString(),
            time: formData.time.toISOString(),
            department: selectedDepartment,
            treatment: selectedTreatment,
            recaptchaToken: captchaValue,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Prenotazione inviata con successo!");
        setFormData({
          service: "",
          name: "",
          email: "",
          date: null,
          time: null,
        });
        setSelectedTreatment("");
        setCaptchaValue(null);
        // Reset recaptcha
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      } else {
        throw new Error(data.message || "Errore nell'invio della prenotazione");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Si è verificato un errore durante l'invio");
    }
  };

  return (
    <div className={`eleven-sector ${className || ''}`}>
      <div id="eleven-section" className="booking-container">
        <div className="map-section">
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.039790811289!2d19.8219329!3d41.329748099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13503155ad618535%3A0xa70a3361bf396f57!2sGo%20Health%20Albania!5e0!3m2!1sen!2s!4v1742404901054!5m2!1sen!2s&ui=2&z=18"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
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
                <DateTimePicker
                  selected={formData.date}
                  onChange={handleDateChange}
                  placeholder="Seleziona La Data"
                />
              </div>

              <div className="form-group">
                <label>
                  Ora <span className="required">*</span>
                </label>
                <DateTimePicker
                  selected={formData.time}
                  onChange={handleTimeChange}
                  placeholder="Seleziona L'orario"
                  timeOnly
                />
              </div>
            </div>

            <div className="recaptcha-container">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LfefxorAAAAABcnmActDbalv_YoCo1QauTwEBPo"
                onChange={handleCaptchaChange}
              />
              {captchaError && (
                <div className="captcha-error">
                  Per favore completa il reCAPTCHA
                </div>
              )}
            </div>

            <button type="submit" className="submit-button">
              PRENOTA UN APPUNTAMENTO
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ElevenComponent;