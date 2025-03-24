"use client"
import "./CheckupPage.css"
import React from "react"

const CheckupPage = ({ title = "Appointment Form", subtitle = "GO HEALTH ALBANIA" }) => {
  // Initialize state for form data
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    mobile: "",
    address: "",
    service: "",
    branch: "",
    message: "",
  })

  // State for date and time pickers
  const [selectedDate, setSelectedDate] = React.useState(null)
  const [selectedTime, setSelectedTime] = React.useState(null)
  const [showCalendar, setShowCalendar] = React.useState(false)
  const [showTimePicker, setShowTimePicker] = React.useState(false)
  const [currentMonth, setCurrentMonth] = React.useState(new Date())

  // Calendar constants
  const months = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ]
  const daysOfWeek = ["Lu", "Ma", "Me", "Gi", "Ve", "Sa", "Do"]

  // Time slots
  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"]

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  // Calendar navigation
  const prevMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev)
      newMonth.setMonth(prev.getMonth() - 1)
      return newMonth
    })
  }

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev)
      newMonth.setMonth(prev.getMonth() + 1)
      return newMonth
    })
  }

  // Render calendar days
  const renderCalendarDays = () => {
    const days = []
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
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const isToday = new Date().toDateString() === date.toDateString()

      days.push(
        <div
          key={day}
          className={`day ${isToday ? "today" : ""}`}
          onClick={() => {
            setSelectedDate(date)
            setShowCalendar(false)
          }}
        >
          {day}
        </div>,
      )
    }

    return days
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted", {
      ...formData,
      date: selectedDate,
      time: selectedTime,
    })
  }

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
                  value={selectedDate ? selectedDate.toLocaleDateString("it-IT") : ""}
                  onClick={() => setShowCalendar(!showCalendar)}
                  readOnly
                />

                {showCalendar && (
                  <div className="calendar-picker">
                    <div className="calendar-header">
                      <button type="button" className="calendar-nav-btn" onClick={prevMonth}>
                        &lt;
                      </button>
                      <div className="calendar-title">
                        {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      </div>
                      <button type="button" className="calendar-nav-btn" onClick={nextMonth}>
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
                    selectedTime ? selectedTime.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }) : ""
                  }
                  onClick={() => setShowTimePicker(!showTimePicker)}
                  readOnly
                />

                {showTimePicker && (
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
            <button type="submit" className="book-button2">
              PRENOTA APPUNTAMENTO
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CheckupPage

