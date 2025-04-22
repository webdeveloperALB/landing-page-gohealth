import { memo } from 'react';
import { CheckCircle } from "lucide-react";
import "./SecondSector.css";

const benefits = [
  ["Cura Personalizzata", "Materiali Certificati"],
  ["Approccio Incentrato Sul Paziente", "Garanzia Su Tutti I Trattamenti"]
];

const Benefit = memo(({ text }) => (
  <div className="benefit">
    <CheckCircle className="checkIcon" />
    <span>{text}</span>
  </div>
));

const SecondSector = memo(({ className }) => {
  return (
    <div className={`first-sector ${className || ''}`}>
      <div className="container">
        <div className="contentSection">
          <p className="subtitle">SIAMO LA TUA SCELTA MIGLIORE</p>
          <h2 className="heading">Perché Affidarti A Noi?</h2>
          <p className="description">
            Se Cerchi Una Soluzione Sicura, Conveniente E Di Alta Qualità Per I Tuoi Problemi Dentali, Sei Nel Posto
            Giusto! Abbiamo Già Aiutato Oltre 8.000 Pazienti Italiani A Ritrovare Il Sorriso, Offrendo Cure Dentistiche
            Eccellenti A Costi Accessibili.
          </p>

          <div className="benefitsContainer">
            {benefits.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className="benefitRow">
                {row.map((text, index) => (
                  <Benefit key={`benefit-${rowIndex}-${index}`} text={text} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="imageSection">
          <img 
            src="/second-image.png" 
            alt="Image description" 
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
});

SecondSector.displayName = 'SecondSector';
Benefit.displayName = 'Benefit';

export default SecondSector;