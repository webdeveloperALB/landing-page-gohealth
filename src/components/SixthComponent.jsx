import React from 'react';
import { Star } from 'lucide-react';
import './SixthComponent.css';

export default function SixthComponent() {
  return (
    <div className="testimonial-container">
      <div className="testimonial-image-container">
      <img src="/sixth.svg" alt="Background mask" className="mask-icon3" />
      </div>
      
      <div className="testimonial-content">
        <div className="testimonial-header">TESTIMONIANZE RIVELATE</div>
        
        <h1 className="testimonial-title">
          Le Storie Di Chi Ha Ritrovato Il Sorriso
        </h1>
        
        <div className="testimonial-stars">
          <Star className="star-icon" fill="#FFD700" />
          <Star className="star-icon" fill="#FFD700" />
          <Star className="star-icon" fill="#FFD700" />
          <Star className="star-icon" fill="#FFD700" />
          <Star className="star-icon" fill="#FFD700" />
        </div>
        
        <p className="testimonial-text">
          Sono Rimasta Estremamente Soddisfatto Della Mia Esperienza Presso
          Questa Clinica. Il Personale È Stato Professionale E Accogliente Fin Dal
          Primo Momento In Cui Ho Varcato La Porta. Il Dottore È Stato Molto
          Competente E Mi Ha Messo A Mio Agio Durante Il Trattamento. Ho Curato
          Due Carie E Sono Rimasto Impressionato Dalla Precisione E Dall'attenzione
          Ai Dettagli Del Dottore. Il Risultato Finale È Stato Eccellente E Il Dolore È Stato
          Minimo. Consiglio Vivamente Questa Clinica A Chiunque Cerchi Cure Dentistiche
          Di Alta Qualità.
        </p>
        
        <div className="testimonial-author">Mia Cappasso</div>
        
        <div className="testimonial-navigation">
          <div className="nav-dot"></div>
          <div className="nav-dot active"></div>
          <div className="nav-dot"></div>
        </div>
      </div>
    </div>
  );
}
