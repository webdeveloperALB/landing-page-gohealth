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
  const cardWidth = useRef(0)
  const lastDragTime = useRef(0)
  const dragVelocity = useRef(0)
  const lastDragX = useRef(0)

  const services = [
    {
      icon: "/1.svg",
      title: "Impianti Dentali",
      description: "Hai Perso Uno O Più Denti? - I Nostri Impianti Dentali Di Ultima Generazione Ti Restituiranno Un Sorriso Naturale E Duraturo.",
    },
    {
      icon: "/2.svg",
      title: "Corona Dentale",
      description: "Hai Denti Danneggiati O Indeboliti? - Le Nostre Corone Dentali In Zirconio O Ceramica Ripristinano La Funzionalità E L'estetica Del Tuo Sorriso, Garantendo Resistenza, Durata E Un Aspetto Naturale.",
    },
    {
      icon: "/3.svg",
      title: "Faccette Dentali",
      description: "Non Sei Soddisfatto Del Tuo Sorriso? - Le Nostre Faccette Dentali Correggono Imperfezioni Come Macchie, Denti Scheggiati O Disallineati, Regalandoti Un Sorriso Perfetto In Pochi Giorni.",
    },
    {
      icon: "/4.svg",
      title: "Ponte Dentale",
      description: "Hai Bisogno Di Una Soluzione Stabile E Duratura Per Denti Mancanti? - Il Nostro Ponte Dentale È Una Scelta Eccellente Per Ripristinare La Funzionalità E L'estetica Del Tuo Sorriso.",
    },
  ]

  const carouselItems = [services[services.length - 1], ...services, services[0]]

  const getCardWidth = () => containerRef.current?.offsetWidth || 0

  const scrollToElevenComponent = () => {
    const elevenComponent = document.getElementById("eleven-section")
    elevenComponent?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const stopAutoScroll = () => {
    clearTimeout(scrollTimeout.current)
    scrollTimeout.current = null
  }

  // Update active index based on scroll position
  const updateActiveIndex = useCallback(() => {
    if (!carouselRef.current) return
    
    const scrollPos = carouselRef.current.scrollLeft
    const normalizedIndex = Math.round(scrollPos / cardWidth.current) - 1
    const newActiveIndex = (normalizedIndex + services.length) % services.length
    
    if (newActiveIndex !== activeIndex) {
      setActiveIndex(newActiveIndex)
    }
  }, [activeIndex, services.length])

  const handleScroll = useCallback(() => {
    if (!carouselRef.current || isDragging.current) return

    cardWidth.current = getCardWidth()
    const scrollPos = carouselRef.current.scrollLeft
    const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.offsetWidth

    // Handle infinite scroll loop
    if (scrollPos >= maxScroll - cardWidth.current / 2) {
      carouselRef.current.style.scrollBehavior = 'auto'
      carouselRef.current.scrollLeft = cardWidth.current
      setTimeout(() => carouselRef.current.style.scrollBehavior = 'smooth', 10)
    } 
    else if (scrollPos <= cardWidth.current / 2) {
      carouselRef.current.style.scrollBehavior = 'auto'
      carouselRef.current.scrollLeft = cardWidth.current * services.length
      setTimeout(() => carouselRef.current.style.scrollBehavior = 'smooth', 10)
    }

    updateActiveIndex()
  }, [services.length, updateActiveIndex])

  const startAutoScroll = useCallback(() => {
    if (scrollTimeout.current) return

    const scroll = () => {
      if (!carouselRef.current || isDragging.current) return
      carouselRef.current.scrollTo({
        left: carouselRef.current.scrollLeft + cardWidth.current,
        behavior: 'smooth'
      })
      scrollTimeout.current = setTimeout(scroll, 3000)
    }
    scrollTimeout.current = setTimeout(scroll, 3000)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const resizeObserver = new ResizeObserver(() => {
      cardWidth.current = getCardWidth()
      if (carouselRef.current) {
        carouselRef.current.scrollTo({
          left: (activeIndex + 1) * cardWidth.current,
          behavior: 'auto'
        })
      }
    })

    resizeObserver.observe(container)
    return () => resizeObserver.disconnect()
  }, [activeIndex])

  useEffect(() => {
    if (!carouselRef.current) return
    
    cardWidth.current = getCardWidth()
    carouselRef.current.style.scrollBehavior = 'auto'
    carouselRef.current.scrollLeft = cardWidth.current
    
    // Use passive: false for better performance on mobile
    const carousel = carouselRef.current
    const handleScrollEvent = () => {
      if (!isDragging.current) {
        handleScroll()
      }
    }
    
    carousel.addEventListener('scroll', handleScrollEvent, { passive: true })
    
    // Add momentum-based scroll physics
    carousel.classList.add('smooth-drag')
    
    setTimeout(() => {
      carouselRef.current.style.scrollBehavior = 'smooth'
      startAutoScroll()
    }, 100)
    
    return () => {
      stopAutoScroll()
      carousel.removeEventListener('scroll', handleScrollEvent)
    }
  }, [startAutoScroll, handleScroll])

  const handleDragStart = (e) => {
    if (!carouselRef.current) return
    
    // Stop any ongoing animation or scrolling
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current)
    }
    
    isDragging.current = true
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
    
    startX.current = clientX
    lastDragX.current = clientX
    lastDragTime.current = Date.now()
    scrollLeft.current = carouselRef.current.scrollLeft
    dragVelocity.current = 0
    
    carouselRef.current.style.scrollBehavior = 'auto'
    stopAutoScroll()
    
    // Prevent default to avoid text selection and other behaviors
    if (e.type.includes('mouse')) {
      e.preventDefault()
      document.body.style.cursor = "grabbing"
      document.body.style.userSelect = "none"
    }
  }

  const handleDragMove = (e) => {
    if (!isDragging.current || !carouselRef.current) return
    e.preventDefault()
    
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
    const dx = clientX - startX.current
    
    // Calculate drag velocity for momentum
    const now = Date.now()
    const dt = now - lastDragTime.current
    if (dt > 0) {
      dragVelocity.current = (clientX - lastDragX.current) / dt
    }
    
    lastDragX.current = clientX
    lastDragTime.current = now
    
    // Apply drag with smooth multiplier for better feel
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current)
    }
    
    animationFrame.current = requestAnimationFrame(() => {
      carouselRef.current.scrollLeft = scrollLeft.current - dx * 1.2
      updateActiveIndex()
    })
  }

  const handleDragEnd = () => {
    if (!isDragging.current || !carouselRef.current) return
    
    isDragging.current = false
    document.body.style.cursor = ""
    document.body.style.userSelect = ""
    
    // Apply momentum scrolling
    const velocity = dragVelocity.current * 120 // Amplify the effect
    
    // Determine target card based on velocity and current position
    const scrollPos = carouselRef.current.scrollLeft
    let targetCardIndex
    
    if (Math.abs(velocity) > 0.5) {
      // If strong swipe, move in that direction
      const direction = velocity < 0 ? 1 : -1
      targetCardIndex = Math.round(scrollPos / cardWidth.current) + direction
    } else {
      // Otherwise snap to closest card
      targetCardIndex = Math.round(scrollPos / cardWidth.current)
    }
    
    // Apply smooth scrolling to target
    carouselRef.current.style.scrollBehavior = 'smooth'
    carouselRef.current.scrollTo({
      left: targetCardIndex * cardWidth.current,
      behavior: "smooth",
    })
    
    // Resume auto-scroll after a delay
    setTimeout(() => {
      handleScroll() // Make sure to update active index
      startAutoScroll()
    }, 1000)
  }

  // Prevent click during drag
  const handleClick = (e) => {
    if (Math.abs(dragVelocity.current) > 0.1) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  // Handle dot navigation - explicitly update active card
  const navigateToCard = (index) => {
    if (!carouselRef.current) return
    
    stopAutoScroll()
    carouselRef.current.style.scrollBehavior = 'smooth'
    carouselRef.current.scrollTo({
      left: (index + 1) * cardWidth.current,
      behavior: "smooth",
    })
    setActiveIndex(index)
    
    // Resume auto-scroll after navigation
    setTimeout(startAutoScroll, 2000)
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
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            onClick={handleClick}
            style={{
              cursor: isDragging.current ? 'grabbing' : 'grab',
              userSelect: 'none'
            }}
          >
            {carouselItems.map((service, index) => (
              <div 
                className="dental-service-card" 
                key={index}
                data-index={index - 1}
              >
                <div className="dental-service-card-content">
                  <div className="dental-service-icon-container">
                    <div className="dental-service-icon">
                      <img 
                        src={service.icon} 
                        alt={service.title} 
                        className="mask-icon" 
                        draggable="false" 
                      />
                    </div>
                  </div>
                  <h2 className="dental-service-title">{service.title}</h2>
                  <p className="dental-service-description">{service.description}</p>
                  <button 
                    className="dental-service-link" 
                    onClick={scrollToElevenComponent}
                  >
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
              onClick={() => navigateToCard(index)}
              role="button"
              aria-label={`Navigate to service ${index + 1}`}
              tabIndex={0}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FifthSection