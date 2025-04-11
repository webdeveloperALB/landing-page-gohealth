// DentalTourismBanner.jsx
import React from 'react';
import './TenthComponent.css';

const TenthComponent = ({ className }) => {
  return (
    <div className={`tenth-sector ${className || ''}`}>
      <div className="banner-container">
        <div className="banner-content">
          <div className="banner-top">
            <span className="come-visto">COME VISTO SU</span>
          </div>
          <div className="banner-publication">
            <div className="banner-title">
              <h1>
                Riconosciuti Dai Migliori: La Nostra Esperienza Nel Turismo Dentale In
                Albania È Stata Presentata Su Rinomate Pubblicazioni Internazionali.
                Affidati Ai Professionisti Scelti Da Migliaia Di Pazienti Soddisfatti.
              </h1>
            </div>

            <div className="publication-logos">
              <img src="/comevisto/1.svg" alt="Reader's Digest" className="publication-logo" />
              <img src="/comevisto/2.svg" alt="Wired" className="publication-logo" />
              <img src="/comevisto/3.svg" alt="Vogue" className="publication-logo" />
              <img src="/comevisto/4.svg" alt="Forbes" className="publication-logo" />
              <img src="/comevisto/5.svg" alt="National Geographic" className="publication-logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenthComponent;