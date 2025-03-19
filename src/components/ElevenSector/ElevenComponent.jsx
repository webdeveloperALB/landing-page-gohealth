import React, { useState } from "react";
import "./ElevenComponent.css";
import {
  Calendar,
  Clock,
  ChevronDown,
  MapPin,
  Phone,
  Info,
} from "lucide-react";

const ElevenComponent = () => {
  const [selectedDepartment, setSelectedDepartment] =
    useState("Dental Oral Care");
  const [selectedTreatment, setSelectedTreatment] = useState("");

  return (
    <div className="booking-container">
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

        <form className="booking-form">
          <div className="form-row">
            <div className="form-group">
              <label>
                Reparto <span className="required">*</span>
              </label>
              <div className="custom-select">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="Dental Oral Care">Dental Oral Care</option>
                  <option value="Orthodontics">Orthodontics</option>
                  <option value="Surgery">Surgery</option>
                </select>
                <ChevronDown className="select-icon" />
              </div>
            </div>

            <div className="form-group">
              <label>Tipologia Di Trattamento</label>
              <div className="custom-select">
                <select
                  value={selectedTreatment}
                  onChange={(e) => setSelectedTreatment(e.target.value)}
                >
                  <option value="">Seleziona Trattamento</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Root Canal">Root Canal</option>
                  <option value="Whitening">Whitening</option>
                </select>
                <ChevronDown className="select-icon" />
              </div>
            </div>
          </div>

          <div className="form-group full-width">
            <label>
              Tipo Di Servizio Richiesto <span className="required">*</span>
            </label>
            <div className="custom-select">
              <input type="text" placeholder="Come Possiamo Aiutarti?" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                Nome <span className="required">*</span>
              </label>
              <div className="custom-select">
                <input type="text" placeholder="Il Tuo Nome" />
                <ChevronDown className="select-icon" />
              </div>
            </div>

            <div className="form-group">
              <label>
                Email <span className="required">*</span>
              </label>
              <div className="custom-select">
                <input type="email" placeholder="La Tua Email" />
                <ChevronDown className="select-icon" />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                Data <span className="required">*</span>
              </label>
              <div className="custom-select">
                <input type="text" placeholder="Seleziona La Data" />
                <Calendar className="select-icon" />
              </div>
            </div>

            <div className="form-group">
              <label>
                Ora <span className="required">*</span>
              </label>
              <div className="custom-select">
                <input type="text" placeholder="Seleziona L'orario" />
                <Clock className="select-icon" />
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
