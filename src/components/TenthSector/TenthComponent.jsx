// DentalTourismBanner.jsx
import React, { memo } from 'react';
import './TenthComponent.css';

const publicationLogos = [
  { src: "/comevisto/1.svg", alt: "Reader's Digest" },
  { src: "/comevisto/2.svg", alt: "Wired" },
  { src: "/comevisto/3.svg", alt: "Vogue" },
  { src: "/comevisto/4.svg", alt: "Forbes" },
  { src: "/comevisto/5.svg", alt: "National Geographic" }
];

const PublicationLogo = memo(({ src, alt }) => (
  <img 
    src={src} 
    alt={alt} 
    className="publication-logo" 
    loading="lazy"
    decoding="async"
    width="auto"
    height="auto"
  />
));

PublicationLogo.displayName = 'PublicationLogo';

const TenthComponent = memo(({ className }) => {
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
              {publicationLogos.map((logo, index) => (
                <PublicationLogo 
                  key={`logo-${index}`}
                  src={logo.src}
                  alt={logo.alt}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

TenthComponent.displayName = 'TenthComponent';

export default TenthComponent;