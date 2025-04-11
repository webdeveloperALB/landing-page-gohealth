"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import "./FifthSection.css"
import { ArrowRight } from 'lucide-react'

const FifthSection = ({ className }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef(null)
  const containerRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const animationFrame = useRef(null)
  const scrollTimeout = useRef(null)

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
  ]

  const carouselItems = [services[services.length - 1], ...services, services[0]];

  const getCardWidth = () => {
    return containerRef.current?.offsetWidth || 0
  }

  const scrollToElevenComponent = () => {
    const elevenComponent = document.getElementById("eleven-section")
    if (elevenComponent) {
      elevenComponent.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const stopAutoScroll = () => {
    clearTimeout(scrollTimeout.current)
    scrollTimeout.current = null
  }

  const handleScroll = () => {
    if (!carouselRef.current || isDragging.current) return;

    const cardWidth = getCardWidth();
    const scrollPos = carouselRef.current.scrollLeft;
    const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.offsetWidth;

    if (scrollPos >= maxScroll - cardWidth / 2) {
      carouselRef.current.style.scrollBehavior = 'auto';
      carouselRef.current.scrollLeft = cardWidth;
      setTimeout(() => {
        carouselRef.current.style.scrollBehavior = 'smooth';
      }, 10);
    } else if (scrollPos <= cardWidth / 2) {
      carouselRef.current.style.scrollBehavior = 'auto';
      carouselRef.current.scrollLeft = cardWidth * services.length;
      setTimeout(() => {
        carouselRef.current.style.scrollBehavior = 'smooth';
      }, 10);
    }

    const activeIdx = Math.round(scrollPos / cardWidth) - 1;
    setActiveIndex((activeIdx + services.length) % services.length);
  };

  const startAutoScroll = useCallback(() => {
    if (scrollTimeout.current) return;

    const scroll = () => {
      if (!carouselRef.current || isDragging.current) return;
      
      const cardWidth = containerRef.current?.offsetWidth || 0;
      const scrollPos = carouselRef.current.scrollLeft;
      
      carouselRef.current.scrollTo({
        left: scrollPos + cardWidth,
        behavior: 'smooth'
      });

      scrollTimeout.current = setTimeout(scroll, 3000);
    };

    scrollTimeout.current = setTimeout(scroll, 3000);
  }, []);

  useEffect(() => {
    const cardWidth = containerRef.current?.offsetWidth || 0;
    carouselRef.current.style.scrollBehavior = 'auto';
    carouselRef.current.scrollLeft = cardWidth;
    carouselRef.current.style.scrollBehavior = 'smooth';
    
    startAutoScroll();

    return () => {
      stopAutoScroll();
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [startAutoScroll]);

  const handleDragStart = (e) => {
    isDragging.current = true
    startX.current = (e.pageX || e.touches[0].pageX) - carouselRef.current.offsetLeft
    scrollLeft.current = carouselRef.current.scrollLeft
    stopAutoScroll()
    document.body.style.cursor = "grabbing"
    document.body.style.userSelect = "none"
  }

  const handleDragMove = (e) => {
    if (!isDragging.current) return
    e.preventDefault()

    const x = (e.pageX || e.touches[0].pageX) - carouselRef.current.offsetLeft
    const walk = (x - startX.current) * 2

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current)
    }

    animationFrame.current = requestAnimationFrame(() => {
      carouselRef.current.scrollLeft = scrollLeft.current - walk
    })
  }

  const handleDragEnd = () => {
    if (!isDragging.current) return
    isDragging.current = false

    const cardWidth = getCardWidth()
    const scrollPos = carouselRef.current.scrollLeft
    const activeIdx = Math.round(scrollPos / cardWidth)

    carouselRef.current.scrollTo({
      left: activeIdx * cardWidth,
      behavior: "smooth",
    })

    document.body.style.cursor = ""
    document.body.style.userSelect = ""
    startAutoScroll()
  }

  return (
    <div className={`fifth-sector ${className || ''}`}>
    <div className="dental-services-container">
      <div className="dental-services-header">
        <h3 className="dental-services-subtitle">SORRISO PERFETTO</h3>
        <h1 className="dental-services-title">I Nostri Trattamenti Dentali</h1>
      </div>

      <div
        ref={containerRef}
        className="dental-services-cards-container"
        onMouseEnter={stopAutoScroll}
        onMouseLeave={startAutoScroll}
      >
        <div
          ref={carouselRef}
          className="dental-services-cards"
          onScroll={handleScroll}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {carouselItems.map((service, index) => (
            <div className="dental-service-card" key={index}>
              <div className="dental-service-card-content">
                <div className="dental-service-icon-container">
                  <div className="dental-service-icon">
                    <img src={service.icon || "/placeholder.svg"} alt={service.title} className="mask-icon" />
                  </div>
                </div>
                <h2 className="dental-service-title">{service.title}</h2>
                <p className="dental-service-description">{service.description}</p>
                <button className="dental-service-link" onClick={scrollToElevenComponent}>
                  RICHIEDI INFO
                  <ArrowRight className="dental-service-arrow" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dental-services-pagination">
        {services.map((_, index) => (
          <span
            key={index}
            className={`pagination-dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => {
              const cardWidth = getCardWidth()
              carouselRef.current.scrollTo({
                left: (index + 1) * cardWidth,
                behavior: "smooth",
              })
            }}
          />
        ))}
      </div>
    </div>
    </div>
  )
}

export default FifthSection