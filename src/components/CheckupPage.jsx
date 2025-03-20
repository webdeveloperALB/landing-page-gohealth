"use client"

import { useState } from "react"
import "./CheckupPage.css"
import { CalendarIcon, Clock, MapPin, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"

export default function CheckupPage() {
  const [showCalendar, setShowCalendar] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  // Calendar functionality
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isToday = new Date().toDateString() === date.toDateString()

      days.push(
        <div
          key={`day-${day}`}
          className={`calendar-day ${isToday ? "today" : ""}`}
          onClick={() => {
            const formattedDate = `${day} ${months[month]} ${year}`
            setSelectedDate(formattedDate)
            setShowCalendar(false)
          }}
        >
          {day}
        </div>,
      )
    }

    return days
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  // Time picker functionality
  const timeSlots = [
    "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
  ];


  return (
    <div className="consultation-container">
      <div className="consultation-header">
        <div className="status-circle"></div>
        <span className="header-text">Consulenza Online</span>
      </div>

      <div className="divider"></div>

      <div className="form-content">
        <h2 className="section-title">
          Dettagli del Paziente<span className="required-star">*</span>
        </h2>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">Nome</label>
            <input type="text" id="firstName" placeholder="Il tuo nome" />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Cognome</label>
            <input type="text" id="lastName" placeholder="Il tuo cognome" />
          </div>

          <div className="form-group">
            <label htmlFor="age">Età</label>
            <div className="select-wrapper">
              <input type="text" id="age" placeholder="La tua età" />
              <ChevronDown className="select-icon" />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group wide">
            <label htmlFor="email">Indirizzo Email</label>
            <input type="email" id="email" placeholder="Il tuo indirizzo email" />
          </div>

          <div className="form-group wide">
            <label htmlFor="mobile">Numero di Telefono</label>
            <input type="tel" id="mobile" placeholder="Il tuo numero di telefono" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="address">Indirizzo</label>
            <input type="text" id="address" placeholder="Il tuo indirizzo" />
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
              <input type="text" id="service" placeholder="Come possiamo aiutarti?" />
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
                value={selectedDate}
                onClick={() => setShowCalendar(!showCalendar)}
                readOnly
              />
              <CalendarIcon className="input-icon calendar" />

              {showCalendar && (
                <div className="calendar-picker">
                  <div className="calendar-header">
                    <button className="calendar-nav-btn" onClick={prevMonth}>
                      <ChevronLeft size={16} />
                    </button>
                    <div className="calendar-title">
                      {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </div>
                    <button className="calendar-nav-btn" onClick={nextMonth}>
                      <ChevronRight size={16} />
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
                value={selectedTime}
                onClick={() => setShowTimePicker(!showTimePicker)}
                readOnly
              />
              <Clock className="input-icon clock" />

              {showTimePicker && (
                <div className="time-picker">
                  {timeSlots.map((time) => (
                    <div
                      key={time}
                      className="time-slot"
                      onClick={() => {
                        setSelectedTime(time)
                        setShowTimePicker(false)
                      }}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="branch">
              Filiale <span className="required-star">*</span>
            </label>
            <div className="input-with-icon">
              <input type="text" id="branch" placeholder="Tirana, Albania" />
              <MapPin className="input-icon map-pin" />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="message">Messaggio Aggiuntivo</label>
            <textarea id="message" placeholder="Scrivi qui..."></textarea>
          </div>
        </div>

        <div className="form-row center">
          <button className="book-button2">PRENOTA APPUNTAMENTO</button>
        </div>
      </div>
    </div>
  )
}