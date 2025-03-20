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
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ]

  return (
    <div className="consultation-container">
      <div className="consultation-header">
        <div className="status-circle"></div>
        <span className="header-text">Online Consultation</span>
      </div>

      <div className="divider"></div>

      <div className="form-content">
        <h2 className="section-title">
          Patient Details<span className="required-star">*</span>
        </h2>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" placeholder="Your First Name" />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" placeholder="Your Last Name" />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <div className="select-wrapper">
              <input type="text" id="age" placeholder="Your Age" />
              <ChevronDown className="select-icon" />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group wide">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="Your Email Address" />
          </div>

          <div className="form-group wide">
            <label htmlFor="mobile">Mobile Number</label>
            <input type="tel" id="mobile" placeholder="Your Mobil Number" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="address">Yor Address</label>
            <input type="text" id="address" placeholder="Your Address" />
          </div>
        </div>

        <h2 className="section-title">
          Appointment Details<span className="required-star">*</span>
        </h2>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="service">
              Type Of Service Required <span className="required-star">*</span>
            </label>
            <div className="select-wrapper">
              <input type="text" id="service" placeholder="How Can We Help You ?" />
              <ChevronDown className="select-icon" />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">
              Date <span className="required-star">*</span>
            </label>
            <div className="input-with-icon">
              <input
                type="text"
                id="date"
                placeholder="Select Date"
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
              Time <span className="required-star">*</span>
            </label>
            <div className="input-with-icon">
              <input
                type="text"
                id="time"
                placeholder="Select Time"
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
              Branch <span className="required-star">*</span>
            </label>
            <div className="input-with-icon">
              <input type="text" id="branch" placeholder="Tirana, Alb" />
              <MapPin className="input-icon map-pin" />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="message">Additional Message</label>
            <textarea id="message" placeholder="You An Write Here"></textarea>
          </div>
        </div>

        <div className="form-row center">
          <button className="book-button2">BOOK APPOINTMENT</button>
        </div>
      </div>
    </div>
  )
}

