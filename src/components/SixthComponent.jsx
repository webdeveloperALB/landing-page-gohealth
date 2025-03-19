"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import "./SixthComponent.css";
import React from "react";

// Testimonial data
const testimonials = [
  {
    id: 1,
    text: "Professionalità eccellente, ottima comunicazione e assistenza. Sono stato molto soddisfatto del lavoro eseguito, tutto è andato per il meglio, personale molto gentile e disponibile anche per trovarci un alloggio vicino alla clinica. Sono grato di essere venuto qui per le cure dentali. Grazie!",
    author: "Davide Salè",
  },
  {
    id: 2,
    text: "Clinica eccellente, professionali e molto scrupolosi sul lavoro ed i dettagli 💪💯❤❤ top, grazie per il bel sorriso che ho ora ❤❤❤❤ ...",
    author: "Massimiliano Gullà",
  },
  {
    id: 3,
    text: "Una eccellente organizzazione; sono venuto qui sulla percezione a prima vista che non mi sarei pentito della scelta. In Italia quando dici che vai in Albania, mille pregiudizi, mille problemi poi quando capita di raccontare il nostro vissuto tra i medici in Italia ti rendi conto che il rapporto dottore paziente è solo un dare e avere economico, ci lamentiamo che non ci sono i medici di una volta. I meriti di questa clinica: professionalità, pulizia, attrezzatura e carica umana... dire solo che in Albania si spende di meno è sminuire chi fa il lavoro con tanta professionalità e con la continua voglia di aggiornarsi, le pareti sono piene di attestati in tal senso, bravi!!!!",
    author: "Pino Vessio",
  },
  {
    id: 4,
    text: "Professionalità, accoglienza e velocità di esecuzione sono solo alcune delle caratteristiche che rendono unica questa clinica. Il personale sempre cordiale e impeccabile ti fa sentire a casa. Materiali di assoluta eccellenza e tecnologie all’avanguardia sono una garanzia per un risultato che non ha pari! Grazie di tutto!!!",
    author: "Claudio Spinelli",
  },
];

export default function SixthComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Function to handle testimonial navigation
  // Use useCallback to memoize the function
  const goToTestimonial = React.useCallback(
    (index) => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      setCurrentIndex(index);

      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500); // Match this with your CSS transition time
    },
    [isTransitioning]
  );

  // Auto-scroll testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % testimonials.length;
      goToTestimonial(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, goToTestimonial]);

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

        <div className="testimonial-slider">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`testimonial-slide ${
                index === currentIndex ? "active" : ""
              }`}
              style={{
                opacity: index === currentIndex ? 1 : 0,
                transform: `translateY(${(index - currentIndex) * 20}px)`,
                position: index === currentIndex ? "relative" : "absolute",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              <p className="testimonial-text">{testimonial.text}</p>

              <div className="testimonial-author">{testimonial.author}</div>
            </div>
          ))}
        </div>

        <div className="testimonial-navigation">
          <button
            className="nav-dot"
            onClick={() =>
              goToTestimonial(
                currentIndex - 1 < 0
                  ? testimonials.length - 1
                  : currentIndex - 1
              )
            }
          >
            <svg viewBox="0 0 24 24">
              <path
                d="M18 15l-6-6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className="nav-dot"
            onClick={() =>
              goToTestimonial((currentIndex + 1) % testimonials.length)
            }
          >
            <svg viewBox="0 0 24 24">
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
