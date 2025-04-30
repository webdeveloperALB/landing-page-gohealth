"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { Star } from "lucide-react";
import "./SixthComponent.css";

// Memoized Star component to prevent unnecessary re-renders
const StarIcon = memo(() => (
  <Star className="star-icon" fill="#FFD700" />
));

// Memoized testimonial data outside component
const testimonials = [
  {
    id: 1,
    text: "Professionalità eccellente e assistenza impeccabile. Sono molto soddisfatto del lavoro e della gentilezza del personale!",
    author: "Davide Salè",
    image: "/parapas/Rezultati 1.webp",
  },
  {
    id: 2,
    text: "Clinica professionale e attenta ai dettagli. Grazie per il sorriso che ho adesso, siete il top!",
    author: "Massimiliano Gullà",
    image: "/parapas/Rezultati 6.webp",
  },
  {
    id: 3,
    text: "Scelta perfetta: ho trovato professionalità, umanità e attrezzature moderne. Non è solo risparmio, ma vera eccellenza.",
    author: "Pino Vessio",
    image: "/parapas/Rezultati 3.webp",
  },
  {
    id: 4,
    text: "Accoglienza, velocità ed eccellenza rendono questa clinica unica. Tecnologie moderne e personale impeccabile garantiscono risultati eccezionali.",
    author: "Claudio Spinelli",
    image: "/parapas/Rezultati 5.webp",
  },
];

// Memoized arrow SVG components
const UpArrow = memo(() => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M18 15l-6-6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

const DownArrow = memo(() => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

// Memoized TestimonialImage component
const TestimonialImage = memo(({ src, alt, isActive, offset }) => (
  <img
    src={src}
    alt={alt}
    className="testimonial-image"
    loading="lazy"
    style={{
      opacity: isActive ? 1 : 0,
      transform: `translateY(${offset}px)`,
      position: "absolute",
      transition: "opacity 0.5s ease, transform 0.5s ease",
    }}
  />
));

// Memoized TestimonialSlide component
const TestimonialSlide = memo(({ testimonial, isActive, offset }) => (
  <div
    className={`testimonial-slide ${isActive ? "active" : ""}`}
    style={{
      opacity: isActive ? 1 : 0,
      transform: `translateY(${offset}px)`,
      position: isActive ? "relative" : "absolute",
      transition: "opacity 0.5s ease, transform 0.5s ease",
    }}
  >
    <p className="testimonial-text">{testimonial.text}</p>
    <div className="testimonial-author">{testimonial.author}</div>
  </div>
));

function SixthComponent({ className = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToTestimonial = useCallback(
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

  const goToPrev = useCallback(() => {
    const prevIndex = currentIndex - 1 < 0 ? testimonials.length - 1 : currentIndex - 1;
    goToTestimonial(prevIndex);
  }, [currentIndex, goToTestimonial]);

  const goToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    goToTestimonial(nextIndex);
  }, [currentIndex, goToTestimonial]);

  // Rotating carousel effect
  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [goToNext]);

  // Preload images for better performance
  useEffect(() => {
    testimonials.forEach(testimonial => {
      const img = new Image();
      img.src = testimonial.image;
    });
  }, []);

  return (
    <div className={`sixth-sector ${className}`}>
      <div className="testimonial-container">
        <div className="testimonial-image-container">
          {testimonials.map((testimonial, index) => (
            <TestimonialImage
              key={testimonial.id}
              src={testimonial.image}
              alt={testimonial.author}
              isActive={index === currentIndex}
              offset={(index - currentIndex) * 10}
            />
          ))}
        </div>

        <div className="testimonial-content">
          <div className="testimonial-header">TESTIMONIANZE RIVELATE</div>

          <h1 className="testimonial-title">
            Le Storie Di Chi Ha Ritrovato Il Sorriso
          </h1>

          <div className="testimonial-stars">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>

          <div className="testimonial-slider">
            {testimonials.map((testimonial, index) => (
              <TestimonialSlide
                key={testimonial.id}
                testimonial={testimonial}
                isActive={index === currentIndex}
                offset={(index - currentIndex) * 20}
              />
            ))}
          </div>

          <div className="testimonial-navigation">
            <button
              className="nav-dot"
              onClick={goToPrev}
              aria-label="Previous testimonial"
              type="button"
            >
              <UpArrow />
            </button>

            <button
              className="nav-dot"
              onClick={goToNext}
              aria-label="Next testimonial"
              type="button"
            >
              <DownArrow />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(SixthComponent);