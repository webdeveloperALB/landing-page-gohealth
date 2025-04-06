"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import "./SixthComponent.css";
import React from "react";

// Testimonial data
const testimonials = [
  {
    id: 1,
    text: "Professionalità eccellente e assistenza impeccabile. Sono molto soddisfatto del lavoro e della gentilezza del personale!",
    author: "Davide Salè",
  },
  {
    id: 2,
    text: "Clinica professionale e attenta ai dettagli. Grazie per il sorriso che ho adesso, siete il top!",
    author: "Massimiliano Gullà",
  },
  {
    id: 3,
    text: "Scelta perfetta: ho trovato professionalità, umanità e attrezzature moderne. Non è solo risparmio, ma vera eccellenza.",
    author: "Pino Vessio",
  },
  {
    id: 4,
    text: "Accoglienza, velocità ed eccellenza rendono questa clinica unica. Tecnologie moderne e personale impeccabile garantiscono risultati eccezionali.",
    author: "Claudio Spinelli",
  }  
];

export default function SixthComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToTestimonial = React.useCallback(
    (index) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    },
    [isTransitioning]
  );

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
