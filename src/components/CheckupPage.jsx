import React from 'react';
import './CheckupPage.css';
import { Calendar, Clock, MapPin, ChevronDown } from "lucide-react"


export default function CheckupPage() {
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
                  <input type="text" id="date" placeholder="Select Date" />
                  <Calendar className="input-icon calendar" />
                </div>
              </div>
    
              <div className="form-group">
                <label htmlFor="time">
                  Time <span className="required-star">*</span>
                </label>
                <div className="input-with-icon">
                  <input type="text" id="time" placeholder="Select Time" />
                  <Clock className="input-icon clock" />
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
              <button className="book-button">BOOK APPOINTMENT</button>
            </div>
          </div>
        </div>
      )
    }
    
    