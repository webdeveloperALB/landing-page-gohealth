"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import "./FifthSection.css";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const FifthSection = ({ className = "" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  const cardWidth = useRef(0);
  const isAnimating = useRef(false);
  const scrollTimeout = useRef(null);

  const services = [
    {
      icon: "/1.svg",
      title: "Impianti Dentali",
      description:
        "Hai Perso Uno O Più Denti? - I Nostri Impianti Dentali Di Ultima Generazione Ti Restituiranno Un Sorriso Naturale E Duraturo.",
    },
    {
      icon: "/2.svg",
      title: "Corona Dentale",
      description:
        "Hai Denti Danneggiati O Indeboliti? - Le Nostre Corone Dentali In Zirconio O Ceramica Ripristinano La Funzionalità E L'estetica Del Tuo Sorriso, Garantendo Resistenza, Durata E Un Aspetto Naturale.",
    },
    {
      icon: "/3.svg",
      title: "Faccette Dentali",
      description:
        "Non Sei Soddisfatto Del Tuo Sorriso? - Le Nostre Faccette Dentali Correggono Imperfezioni Come Macchie, Denti Scheggiati O Disallineati, Regalandoti Un Sorriso Perfetto In Pochi Giorni.",
    },
    {
      icon: "/4.svg",
      title: "Ponte Dentale",
      description:
        "Hai Bisogno Di Una Soluzione Stabile E Duratura Per Denti Mancanti? - Il Nostro Ponte Dentale È Una Scelta Eccellente Per Ripristinare La Funzionalità E L'estetica Del Tuo Sorriso.",
    },
  ];

  // Clone first and last item for infinite effect - moved outside of render
  const carouselItems = [
    services[services.length - 1],
    ...services,
    services[0],
  ];

  const scrollToElevenComponent = useCallback(() => {
    const elevenComponent = document.getElementById("eleven-section");
    elevenComponent?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const updateCardWidth = useCallback(() => {
    if (!containerRef.current) return;
    cardWidth.current = containerRef.current.offsetWidth;
  }, []);

  // Handle carousel navigation with memoization
  const navigateToCard = useCallback((index) => {
    if (isAnimating.current) return;
    
    isAnimating.current = true;
    
    // Handle wrap-around for next/prev navigation
    let targetIndex = index;
    if (targetIndex < 0) targetIndex = services.length - 1;
    if (targetIndex >= services.length) targetIndex = 0;
    
    setActiveIndex(targetIndex);
    
    setTimeout(() => {
      isAnimating.current = false;
    }, 500);
  }, [services.length]);

  const handleNext = useCallback(() => {
    navigateToCard(activeIndex + 1);
  }, [activeIndex, navigateToCard]);

  const handlePrev = useCallback(() => {
    navigateToCard(activeIndex - 1);
  }, [activeIndex, navigateToCard]);

  // Handle carousel snap back with memoization
  const handleScroll = useCallback(() => {
    if (!carouselRef.current || !cardWidth.current || isAnimating.current) return;
    
    const scrollPosition = carouselRef.current.scrollLeft;
    const slideIndex = Math.round(scrollPosition / cardWidth.current);
    
    // If scrolled to the last clone (which is a copy of the first real item)
    if (slideIndex === services.length + 1) {
      // Wait for scroll to finish then snap back to the first real item
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.scrollBehavior = 'auto';
          carouselRef.current.scrollLeft = cardWidth.current;
          carouselRef.current.style.scrollBehavior = 'smooth';
        }
      }, 500);
      
      setActiveIndex(0);
    }
    // If scrolled to the first clone (which is a copy of the last real item)
    else if (slideIndex === 0) {
      // Wait for scroll to finish then snap back to the last real item
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.scrollBehavior = 'auto';
          carouselRef.current.scrollLeft = services.length * cardWidth.current;
          carouselRef.current.style.scrollBehavior = 'smooth';
        }
      }, 500);
      
      setActiveIndex(services.length - 1);
    }
    // Otherwise, update activeIndex based on current scroll position
    else {
      setActiveIndex(slideIndex - 1);
    }
  }, [services.length]);

  // Handle debounced scroll - optimized with useCallback
  const handleScrollDebounced = useCallback(() => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(handleScroll, 100);
  }, [handleScroll]);

  // Initial setup
  useEffect(() => {
    updateCardWidth();
    
    // Position carousel at first real item
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = cardWidth.current;
    }
    
    // Handle window resize with passive event listener for better performance
    window.addEventListener('resize', updateCardWidth, { passive: true });
    return () => window.removeEventListener('resize', updateCardWidth);
  }, [updateCardWidth]);

  // Effect to handle scroll position when activeIndex changes
  useEffect(() => {
    if (!carouselRef.current || !cardWidth.current) return;
    
    // Calculate position based on activeIndex (add 1 for the clone at the beginning)
    const scrollPosition = (activeIndex + 1) * cardWidth.current;
    
    // Apply smooth scrolling
    carouselRef.current.style.scrollBehavior = 'smooth';
    carouselRef.current.scrollLeft = scrollPosition;
  }, [activeIndex]);

  // Add scroll event listener with cleanup
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    carousel.addEventListener('scroll', handleScrollDebounced, { passive: true });
    
    return () => {
      carousel.removeEventListener('scroll', handleScrollDebounced);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleScrollDebounced]);

  return (
    <div className={`fifth-sector ${className}`}>
      <div className="dental-services-container">
        <div className="dental-services-header">
          <h3 className="dental-services-subtitle">SORRISO PERFETTO</h3>
          <h1 className="dental-services-title">
            I Nostri Trattamenti Dentali
          </h1>
        </div>

        <div className="dental-services-carousel-wrapper">
          {/* Navigation Arrows */}
          <button 
            className="carousel-nav-button prev-button"
            onClick={handlePrev}
            aria-label="Previous service"
            type="button"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            ref={containerRef}
            className="dental-services-cards-container"
          >
            <div
              ref={carouselRef}
              className="dental-services-cards"
              style={{
                display: "flex",
                userSelect: "none",
                overflow: "hidden",
                scrollSnapType: "x mandatory",
              }}
            >
              {carouselItems.map((service, index) => (
                <div 
                  className="dental-service-card" 
                  key={`service-${index}`}
                  style={{
                    flex: "0 0 100%",
                    scrollSnapAlign: "center",
                  }}
                >
                  <div className="dental-service-card-content">
                    <div className="dental-service-icon-container">
                      <div className="dental-service-icon">
                        <img
                          src={service.icon}
                          alt={service.title}
                          className="mask-icon"
                          draggable="false"
                          loading="lazy"
                          width="48"
                          height="48"
                        />
                      </div>
                    </div>
                    <h2 className="dental-service-title">{service.title}</h2>
                    <p className="dental-service-description">
                      {service.description}
                    </p>
                    <button
                      className="dental-service-link"
                      onClick={scrollToElevenComponent}
                      type="button"
                    >
                      RICHIEDI INFO
                      <ArrowRight className="dental-service-arrow" size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="carousel-nav-button next-button"
            onClick={handleNext}
            aria-label="Next service"
            type="button"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="dental-services-pagination">
          {services.map((_, index) => (
            <span
              key={`dot-${index}`}
              className={`pagination-dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => navigateToCard(index)}
              role="button"
              aria-label={`Navigate to service ${index + 1}`}
              tabIndex={0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FifthSection;