"use client"
import "./CheckupPage.css"
import React, { useState, useEffect, lazy, Suspense } from "react"

// Lazy load reCAPTCHA component
const ReCAPTCHA = lazy(() => import('react-google-recaptcha'));

const CheckupPage = ({ title = "Appointment Form", subtitle = "GO HEALTH ALBANIA" }) => {
  // Initialize state for form data with one useState call
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    mobile: "",
    address: "",
    service: "",
    branch: "",
    message: "",
    selectedDate: null,
    selectedTime: null
  })

  // UI state
  const [uiState, setUiState] = useState({
    showCalendar: false,
    showTimePicker: false,
    currentMonth: new Date(),
    isSubmitting: false,
    formMessage: { text: "", type: "" },
    recaptchaToken: "",
    recaptchaLoaded: false
  })
  
  // Track if component is mounted to prevent memory leaks
  const [isMounted, setIsMounted] = useState(false);
  
  // Set up mounting state
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  // Handle reCAPTCHA script loading
  useEffect(() => {
    // Only attempt to load or reset reCAPTCHA when component is mounted
    if (isMounted) {
      // Load reCAPTCHA script if not already loaded
      if (!window.grecaptcha && !document.querySelector('script[src*="recaptcha"]')) {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          if (isMounted) {
            setUiState(prev => ({ ...prev, recaptchaLoaded: true }));
          }
        };
        document.head.appendChild(script);
      } else if (window.grecaptcha) {
        // If already loaded, just update state
        setUiState(prev => ({ ...prev, recaptchaLoaded: true }));
      }
    }
    
    // Cleanup for component unmount
    return () => {
      // We don't remove the script as other components might need it
      // But we can reset the reCAPTCHA state if needed
      if (isMounted && window.grecaptcha && window.grecaptcha.reset) {
        try {
          window.grecaptcha.reset();
        } catch (e) {
          // Silent fail if reset fails
          console.debug("Could not reset reCAPTCHA:", e);
        }
      }
    };
  }, [isMounted]);

  // Memoized calendar data
  const months = [
    "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
  ]
  const daysOfWeek = ["Lu", "Ma", "Me", "Gi", "Ve", "Sa", "Do"]
  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"]

  // Handle input changes efficiently
  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  // Handle reCAPTCHA verification
  const handleRecaptchaChange = (token) => {
    if (isMounted) {
      setUiState(prev => ({ ...prev, recaptchaToken: token || "" }))
    }
  }

  // Calendar navigation
  const changeMonth = (direction) => {
    setUiState(prev => {
      const newMonth = new Date(prev.currentMonth)
      newMonth.setMonth(prev.currentMonth.getMonth() + direction)
      return { ...prev, currentMonth: newMonth }
    })
  }

  // Date and time selection handlers
  const handleDateSelect = (date) => {
    setFormData(prev => ({ ...prev, selectedDate: date }))
    setUiState(prev => ({ ...prev, showCalendar: false }))
  }

  const handleTimeSelect = (time) => {
    setFormData(prev => ({ ...prev, selectedTime: time }))
    setUiState(prev => ({ ...prev, showTimePicker: false }))
  }

  // Toggle UI elements
  const toggleCalendar = () => {
    setUiState(prev => ({ 
      ...prev, 
      showCalendar: !prev.showCalendar,
      showTimePicker: false 
    }))
  }

  const toggleTimePicker = () => {
    setUiState(prev => ({ 
      ...prev, 
      showTimePicker: !prev.showTimePicker,
      showCalendar: false 
    }))
  }

  // Render calendar days
  const renderCalendarDays = () => {
    const days = []
    const { currentMonth } = uiState
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)

    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    let firstDayOfWeek = firstDay.getDay()
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1 // Adjust for Monday start

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>)
    }

    // Add days of the month
    const today = new Date().toDateString()
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const isToday = today === date.toDateString()

      days.push(
        <div
          key={day}
          className={`day ${isToday ? "today" : ""}`}
          onClick={() => handleDateSelect(date)}
        >
          {day}
        </div>
      )
    }

    return days
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    // Check if reCAPTCHA is completed
    if (!uiState.recaptchaToken) {
      setUiState(prev => ({
        ...prev,
        formMessage: { 
          text: "Per favore, completa il reCAPTCHA prima di inviare il modulo", 
          type: "error" 
        }
      }))
      return
    }
    
    setUiState(prev => ({ 
      ...prev, 
      isSubmitting: true,
      formMessage: { text: "", type: "" } 
    }))
    
    try {
      // Use a consistent API URL
      const apiUrl = window.ENV?.API_URL || 'https://gohealth-server.onrender.com/send-email'
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: formData.selectedDate,
          time: formData.selectedTime,
          recaptchaToken: uiState.recaptchaToken
        }),
      })
      
      if (!isMounted) return; // Prevent state updates if component unmounted
      
      const result = await response.json()
      
      if (response.ok) {
        // Reset form on success
        setFormData({
          firstName: "",
          lastName: "",
          age: "",
          email: "",
          mobile: "",
          address: "",
          service: "",
          branch: "",
          message: "",
          selectedDate: null,
          selectedTime: null
        })
        
        // Reset reCAPTCHA
        if (window.grecaptcha && window.grecaptcha.reset) {
          try {
            window.grecaptcha.reset();
          } catch (e) {
            console.debug("Could not reset reCAPTCHA:", e);
          }
        }
        
        setUiState(prev => ({
          ...prev,
          recaptchaToken: "",
          formMessage: { text: "Appuntamento prenotato con successo!", type: "success" }
        }))
      } else {
        setUiState(prev => ({
          ...prev,
          formMessage: { 
            text: result.message || "Errore durante l'invio del modulo", 
            type: "error" 
          }
        }))
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      if (isMounted) {
        setUiState(prev => ({
          ...prev,
          formMessage: { 
            text: "Errore di connessione. Riprova più tardi.", 
            type: "error" 
          }
        }))
      }
    } finally {
      if (isMounted) {
        setUiState(prev => ({ ...prev, isSubmitting: false }))
      }
    }
  }

  // Custom component to handle reCAPTCHA loading and errors
  const RecaptchaWrapper = () => {
    return (
      <Suspense fallback={<div className="recaptcha-loading">Caricamento reCAPTCHA...</div>}>
        {uiState.recaptchaLoaded ? (
          <ReCAPTCHA
            sitekey="6LfefxorAAAAABcnmActDbalv_YoCo1QauTwEBPo"
            onChange={handleRecaptchaChange}
          />
        ) : (
          <div className="recaptcha-loading">Caricamento reCAPTCHA...</div>
        )}
      </Suspense>
    );
  };

  // Render the component
  return (
    <>
      <div className="appointment-header1">
        <h1 className="appointment-title1">{title}</h1>
        <p className="appointment-subtitle1">{subtitle}</p>
      </div>
      <div className="consultation-container">
        <div className="consultation-header">
          <div className="status-circle"></div>
          <span className="header-text">Consulenza Online</span>
        </div>

        <div className="divider"></div>

        {uiState.formMessage.text && (
          <div className={`form-message ${uiState.formMessage.type}`}>
            {uiState.formMessage.text}
          </div>
        )}

        <form className="form-content" onSubmit={handleSubmit}>
          <h2 className="section-title">
            Dettagli del Paziente<span className="required-star">*</span>
          </h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Nome</label>
              <input
                type="text"
                id="firstName"
                placeholder="Il tuo nome"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Cognome</label>
              <input
                type="text"
                id="lastName"
                placeholder="Il tuo cognome"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Età</label>
              <div className="select-wrapper">
                <input
                  type="number"
                  id="age"
                  placeholder="La tua età"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group wide">
              <label htmlFor="email">Indirizzo Email</label>
              <input
                type="email"
                id="email"
                placeholder="Il tuo indirizzo email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group wide">
              <label htmlFor="mobile">Numero di Telefono</label>
              <input
                type="tel"
                id="mobile"
                placeholder="Il tuo numero di telefono"
                value={formData.mobile}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="address">Indirizzo</label>
              <input
                type="text"
                id="address"
                placeholder="Il tuo indirizzo"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <h2 className="section-title">
            Dettagli dell'Appuntamento<span className="required-star">*</span>
          </h2>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="service">
                Tipo di Servizio Richiesto <span className="required-star">*</span>
              </label>
              <div className="select-wrapper">
                <input
                  type="text"
                  id="service"
                  placeholder="Come possiamo aiutarti?"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">
                Data <span className="required-star">*</span>
              </label>
              <div className="input-with-icon">
                <input
                  type="text"
                  id="date"
                  placeholder="Seleziona Data"
                  value={formData.selectedDate ? formData.selectedDate.toLocaleDateString("it-IT") : ""}
                  onClick={toggleCalendar}
                  readOnly
                  required
                />

                {uiState.showCalendar && (
                  <div className="calendar-picker">
                    <div className="calendar-header">
                      <button type="button" className="calendar-nav-btn" onClick={() => changeMonth(-1)}>
                        &lt;
                      </button>
                      <div className="calendar-title">
                        {months[uiState.currentMonth.getMonth()]} {uiState.currentMonth.getFullYear()}
                      </div>
                      <button type="button" className="calendar-nav-btn" onClick={() => changeMonth(1)}>
                        &gt;
                      </button>
                    </div>

                    <div className="calendar-weekdays">
                      {daysOfWeek.map((day) => (
                        <div key={day} className="weekday">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="calendar-days">{renderCalendarDays()}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="time">
                Orario <span className="required-star">*</span>
              </label>
              <div className="input-with-icon">
                <input
                  type="text"
                  id="time"
                  placeholder="Seleziona Orario"
                  value={
                    formData.selectedTime ? formData.selectedTime.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }) : ""
                  }
                  onClick={toggleTimePicker}
                  readOnly
                  required
                />

                {uiState.showTimePicker && (
                  <div className="time-picker">
                    {timeSlots.map((time) => {
                      const [hours] = time.split(":")
                      const date = new Date()
                      date.setHours(Number.parseInt(hours))
                      date.setMinutes(0)
                      return (
                        <div
                          key={time}
                          className="time-slot"
                          onClick={() => handleTimeSelect(date)}
                        >
                          {time}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="branch">
                Filiale <span className="required-star">*</span>
              </label>
              <div className="input-with-icon">
                <input
                  type="text"
                  id="branch"
                  placeholder="Tirana, Albania"
                  value={formData.branch}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="message">Messaggio Aggiuntivo</label>
              <textarea
                id="message"
                placeholder="Scrivi qui..."
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          {/* Improved reCAPTCHA implementation */}
          <div className="form-row recaptcha-row">
            <RecaptchaWrapper />
          </div>

          <div className="form-row center">
            <button 
              type="submit" 
              className="book-button2"
              disabled={uiState.isSubmitting}
            >
              {uiState.isSubmitting ? "INVIO IN CORSO..." : "PRENOTA APPUNTAMENTO"}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CheckupPage