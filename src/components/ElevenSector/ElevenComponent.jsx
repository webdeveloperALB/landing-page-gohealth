import React, { useState, useRef, useEffect, lazy, Suspense } from "react";
import { Calendar, Clock, ChevronDown, Info } from "lucide-react";
import "./ElevenComponent.css";

// Lazy load components to reduce initial load time
const DatePicker = lazy(() => import("react-datepicker"));

// Properly handle locale registration
const LazyDatePicker = (props) => {
  useEffect(() => {
    // Import CSS
    import("react-datepicker/dist/react-datepicker.css");
    
    // Correctly register Italian locale
    const registerLocale = async () => {
      try {
        const dateFnsLib = await import("date-fns/locale");
        const reactDatepicker = await import("react-datepicker");
        
        if (dateFnsLib.it && reactDatepicker.registerLocale) {
          reactDatepicker.registerLocale("it", dateFnsLib.it);
        }
      } catch (error) {
        console.error("Failed to register locale:", error);
      }
    };
    
    registerLocale();
  }, []);

  return (
    <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
      <DatePicker {...props} />
    </Suspense>
  );
};

// Lazy load ReCAPTCHA to defer its loading
const ReCAPTCHA = lazy(() => import("react-google-recaptcha"));

const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return; // Only add listener when dropdown is open
    
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

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
              className={`option-item ${value === option.value ? "selected" : ""}`}
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

  // Fallback to en-US if Italian locale isn't available
  const [localeAvailable, setLocaleAvailable] = useState(false);

  useEffect(() => {
    // Check if Italian locale is available
    import("date-fns/locale")
      .then(module => {
        setLocaleAvailable(!!module.it);
      })
      .catch(() => {
        setLocaleAvailable(false);
      });
  }, []);

  useEffect(() => {
    if (!isOpen) return; // Only add listener when picker is open
    
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Format date/time safely
  const formatDateTime = (date, isTimeOnly) => {
    if (!date) return "";
    
    try {
      return isTimeOnly 
        ? date.toLocaleTimeString(localeAvailable ? "it-IT" : "en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : date.toLocaleDateString(localeAvailable ? "it-IT" : "en-US");
    } catch (error) {
      console.error("Error formatting date:", error);
      return isTimeOnly 
        ? date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : date.toLocaleDateString("en-US");
    }
  };

  return (
    <div className="custom-datetime-picker" ref={pickerRef}>
      <div className="picker-input" onClick={() => setIsOpen(!isOpen)}>
        <input
          type="text"
          value={selected ? formatDateTime(selected, timeOnly) : ""}
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
          <LazyDatePicker
            selected={selected}
            onChange={(date) => {
              onChange(date);
              setIsOpen(false);
            }}
            inline
            showTimeSelect={timeOnly}
            showTimeSelectOnly={timeOnly}
            timeIntervals={15}
            locale={localeAvailable ? "it" : "en"}
            dateFormat={timeOnly ? "HH:mm" : "dd/MM/yyyy"}
          />
        </div>
      )}
    </div>
  );
};

// Memoize the Map component to prevent unnecessary re-renders
const MapComponent = React.memo(() => {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Defer map loading until component is visible in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const mapWrapper = document.querySelector('.map-wrapper');
    if (mapWrapper) observer.observe(mapWrapper);
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="map-wrapper">
      {mapLoaded ? (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.039790811289!2d19.8219329!3d41.329748099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13503155ad618535%3A0xa70a3361bf396f57!2sGo%20Health%20Albania!5e0!3m2!1sen!2s!4v1742404901054!5m2!1sen!2s&ui=2&z=18"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      ) : (
        <div className="map-placeholder">Caricamento della mappa...</div>
      )}
    </div>
  );
});

const ElevenComponent = ({ className }) => {
  const [selectedDepartment] = useState("Dental Oral Care");
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [captchaError, setCaptchaError] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const recaptchaRef = useRef(null);
  const [formData, setFormData] = useState({
    service: "",
    name: "",
    email: "",
    date: null,
    time: null,
    // Honeypot field - should remain empty for legitimate users
    website: "" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formTouched, setFormTouched] = useState(false);

  // Load reCAPTCHA only when the form is partially filled out
  useEffect(() => {
    if (formData.name || formData.email || formData.service) {
      setFormTouched(true);
    }
    
    if (formTouched && !showCaptcha) {
      // Delay loading captcha until user has started filling the form
      const timer = setTimeout(() => {
        setShowCaptcha(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [formData, formTouched, showCaptcha]);

  const treatments = [
    { value: "Seleziona Trattamento", label: "Seleziona Trattamento" },
    { value: "Impainti Dentali", label: "Impainti Dentali" },
    { value: "Corona Dentale", label: "Corona Dentale" },
    { value: "Faccette Dentali", label: "Faccette Dentali" },
    { value: "Ponte Dentale", label: "Ponte Dentale" },
    { value: "Oltre", label: "Oltre" },
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

    if (isSubmitting) return; // Prevent multiple submissions

    // Check honeypot - if filled, silently "succeed" but don't actually submit
    if (formData.website !== "") {
      console.log("Honeypot detected - form submission blocked");
      // Return a fake success to the bot to avoid it realizing it was blocked
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        alert("Prenotazione inviata con successo!");
        setFormData({
          service: "",
          name: "",
          email: "",
          date: null,
          time: null,
          website: ""
        });
        setSelectedTreatment("");
        setCaptchaValue(null);
        setFormTouched(false);
      }, 1500);
      return;
    }

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
      setIsSubmitting(true);
      
      // Prepare data payload - only stringify once
      const payload = JSON.stringify({
        name: formData.name,
        email: formData.email,
        service: formData.service,
        date: formData.date.toISOString(),
        time: formData.time.toISOString(),
        department: selectedDepartment,
        treatment: selectedTreatment,
        recaptchaToken: captchaValue,
        // Include honeypot field in payload to server for additional validation
        website: formData.website
      });
      
      const response = await fetch("https://gohealth-server.onrender.com/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Prenotazione inviata con successo!");
        setFormData({
          service: "",
          name: "",
          email: "",
          date: null,
          time: null,
          website: ""
        });
        setSelectedTreatment("");
        setCaptchaValue(null);
        setFormTouched(false);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`eleven-sector ${className || ''}`}>
      <div id="eleven-section" className="booking-container">
        <div className="map-section">
          <MapComponent />
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

            {/* Honeypot field - hidden from real users but visible to bots */}
            <div className="form-group" style={{ display: 'none' }}>
              <label>Website</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  tabIndex="-1"
                  autoComplete="off"
                />
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

            {showCaptcha && (
              <div className="recaptcha-container">
                <Suspense fallback={<div className="captcha-loading">Caricamento reCAPTCHA...</div>}>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LfefxorAAAAABcnmActDbalv_YoCo1QauTwEBPo"
                    onChange={handleCaptchaChange}
                  />
                </Suspense>
                {captchaError && (
                  <div className="captcha-error">
                    Per favore completa il reCAPTCHA
                  </div>
                )}
              </div>
            )}

            <button 
              type="submit" 
              className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'INVIO IN CORSO...' : 'PRENOTA UN APPUNTAMENTO'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ElevenComponent;