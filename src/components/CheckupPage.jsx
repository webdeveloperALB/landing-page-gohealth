"use client"

import { useState } from "react"
import "./CheckupPage.css"
import { CalendarIcon, Clock, MapPin, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"

export default function CheckupPage() {
  const [showCalendar, setShowCalendar] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // New form states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    mobile: "",
    address: "",
    service: "",
    branch: "Tirana, Albania",
    message: ""
  })

  // Calendar functionality
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isToday = new Date().toDateString() === date.toDateString()

      days.push(
        <div
          key={`day-${day}`}
          className={`calendar-day ${isToday ? "today" : ""}`}
          onClick={() => {
            setSelectedDate(date)
            setShowCalendar(false)
          }}
        >
          {day}
        </div>
      )
    }

    return days
  }

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))

  // Time picker functionality
  const timeSlots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.service || !selectedDate || !selectedTime) {
      alert("Per favore compila tutti i campi obbligatori")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Per favore inserisci un indirizzo email valido")
      return
    }

    try {
      const response = await fetch('https://gohealth-server.onrender.com/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Existing fields
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          service: formData.service,
          date: selectedDate.toISOString(),
          time: selectedTime.toISOString(),
          
          // New fields
          firstName: formData.firstName,
          lastName: formData.lastName,
          age: formData.age,
          mobile: formData.mobile,
          address: formData.address,
          branch: formData.branch,
          message: formData.message
        })
      })

      if (response.ok) {
        alert("Prenotazione inviata con successo!")
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          age: "",
          email: "",
          mobile: "",
          address: "",
          service: "",
          branch: "Tirana, Albania",
          message: ""
        })
        setSelectedDate(null)
        setSelectedTime(null)
      } else {
        throw new Error('Errore nell\'invio')
      }
    } catch (error) {
      console.error('Error:', error)
      alert("Si è verificato un errore durante l'invio")
    }
  }

  return (
    <div className="consultation-container">
      <div className="consultation-header">
        <div className="status-circle"></div>
        <span className="header-text">Consulenza Online</span>
      </div>

      <div className="divider"></div>

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
              <ChevronDown className="select-icon" />
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
              <ChevronDown className="select-icon" />
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
                value={selectedDate ? selectedDate.toLocaleDateString('it-IT') : ''}
                onClick={() => setShowCalendar(!showCalendar)}
                readOnly
              />
              <CalendarIcon className="input-icon calendar" />

              {showCalendar && (
                <div className="calendar-picker">
                  <div className="calendar-header">
                    <button type="button" className="calendar-nav-btn" onClick={prevMonth}>
                      <ChevronLeft size={16} />
                    </button>
                    <div className="calendar-title">
                      {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </div>
                    <button type="button" className="calendar-nav-btn" onClick={nextMonth}>
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="calendar-weekdays">
                    {daysOfWeek.map((day) => (
                      <div key={day} className="weekday">{day}</div>
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
                value={selectedTime ? selectedTime.toLocaleTimeString('it-IT') : ''}
                onClick={() => setShowTimePicker(!showTimePicker)}
                readOnly
              />
              <Clock className="input-icon clock" />

              {showTimePicker && (
                <div className="time-picker">
                  {timeSlots.map((time) => {
                    const [hours] = time.split(':')
                    const date = new Date()
                    date.setHours(hours)
                    return (
                      <div
                        key={time}
                        className="time-slot"
                        onClick={() => {
                          setSelectedTime(date)
                          setShowTimePicker(false)
                        }}
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
              <MapPin className="input-icon map-pin" />
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

        <div className="form-row center">
          <button type="submit" className="book-button2">PRENOTA APPUNTAMENTO</button>
        </div>
      </form>
    </div>
  )
}