"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import "./EightComponent.css"

export default function EightComponent({ className }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState("next")
  
  // Dragging state references
  const carouselRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const dragDistance = useRef(0)
  const dragVelocity = useRef(0)
  const lastDragTime = useRef(0)
  const lastDragX = useRef(0)
  const autoplayTimeout = useRef(null)
  
  const totalSlides = 3

  // Calculate card width based on container
  const getCardWidth = () => {
    if (!carouselRef.current) return 0
    return carouselRef.current.offsetWidth
  }

  const transitionToSlide = useCallback((index, dir) => {
    if (isAnimating) return

    const newDir = dir || (index > activeIndex ? "next" : "prev")
    setDirection(newDir)
    setIsAnimating(true)
    setActiveIndex(index)

    setTimeout(() => {
      setIsAnimating(false)
    }, 800)
  }, [activeIndex, isAnimating])

  const nextSlide = useCallback(() => {
    const newIndex = (activeIndex + 1) % totalSlides
    transitionToSlide(newIndex, "next")
  }, [activeIndex, totalSlides, transitionToSlide])

  const prevSlide = useCallback(() => {
    const newIndex = (activeIndex - 1 + totalSlides) % totalSlides
    transitionToSlide(newIndex, "prev")
  }, [activeIndex, totalSlides, transitionToSlide])

  // Autoplay with pause during interaction
  const startAutoplay = useCallback(() => {
    if (autoplayTimeout.current) {
      clearTimeout(autoplayTimeout.current)
    }
    
    autoplayTimeout.current = setTimeout(() => {
      nextSlide()
    }, 5000)
  }, [nextSlide])

  const stopAutoplay = useCallback(() => {
    if (autoplayTimeout.current) {
      clearTimeout(autoplayTimeout.current)
      autoplayTimeout.current = null
    }
  }, [])

  useEffect(() => {
    if (!isAnimating && !isDragging.current) {
      startAutoplay()
    }
    
    return () => stopAutoplay()
  }, [isAnimating, startAutoplay, stopAutoplay])

  // Manual navigation
  const goToSlide = (index) => {
    if (isAnimating || index === activeIndex) return
    transitionToSlide(index)
  }

  // Handle drag start
  const handleDragStart = (e) => {
    stopAutoplay()
    isDragging.current = true
    
    // Handle both mouse and touch events
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
    
    startX.current = clientX
    lastDragX.current = clientX
    lastDragTime.current = Date.now()
    dragDistance.current = 0
    dragVelocity.current = 0
    
    if (e.type.includes('mouse')) {
      e.preventDefault()
      document.body.style.userSelect = "none"
    }
  }

  // Handle drag movement
  const handleDragMove = (e) => {
    if (!isDragging.current) return
    e.preventDefault()
    
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
    dragDistance.current = clientX - startX.current
    
    // Calculate velocity for momentum effect
    const now = Date.now()
    const dt = now - lastDragTime.current
    if (dt > 0) {
      dragVelocity.current = (clientX - lastDragX.current) / dt
    }
    
    lastDragX.current = clientX
    lastDragTime.current = now
  }

  // Handle drag end
  const handleDragEnd = () => {
    if (!isDragging.current) return
    
    isDragging.current = false
    document.body.style.userSelect = ""
    
    // Determine slide change based on drag distance and velocity
    const cardWidth = getCardWidth()
    const dragThreshold = cardWidth * 0.15 // Slightly lower threshold since there's no visual feedback
    const velocity = dragVelocity.current * 100
    
    // Decide whether to change slides based on drag distance or velocity
    if (
      (Math.abs(dragDistance.current) > dragThreshold) || 
      (Math.abs(velocity) > 0.5)
    ) {
      if (dragDistance.current > 0 || velocity > 0.5) {
        prevSlide()
      } else {
        nextSlide()
      }
    } else {
      // If threshold not met, restart autoplay
      startAutoplay()
    }
    
    // Reset drag values
    dragDistance.current = 0
    dragVelocity.current = 0
  }

  // Stories content
  const stories = [
    {
      image: "/fifth-image.jpg",
      title: "Trasformazione Del Sorriso",
      description: "Un Uomo Di 65 Anni Si È Rivolto A Noi Con Un Problema Che Lo Affliggeva Da Tempo: Il Bruxismo, Che Ha Danneggiato I Suoi Denti, Soprattutto Nelle Aree Laterali.",
    },
    {
      image: "/sixth-image.jpg",
      title: "Corone Dentali E Impianti",
      description: "Una Paziente Di 58 Anni Si È Rivolta A Noi Con Una Storia Di Parodontite E Ritiro Gengivale, Che Aveva Causato Denti Irregolari E Una Base Debole. Dopo Una Diagnosi...",
    },
    {
      image: "/seventh-image.jpg",
      title: "Ricostruzione Totale",
      description: "Aenean Viverra Cursus Ipsum. Etiam Vitae Aliquet Lorem, Id Ultricies Nisl. Integer Tempor Metus Eget Massa.",
    },
  ]

  const nextIndex = (activeIndex + 1) % totalSlides
  const prevIndex = (activeIndex - 1 + totalSlides) % totalSlides

  return (
    <div className={`eight-sector ${className || ''}`}>
      <div className="success-stories-container">
        <div className="header">
          <h3 className="brand-name">VIAGGI FELICI</h3>
          <h1 className="main-title">Storie Di Successo Dentale</h1>
        </div>

        <div 
          ref={carouselRef}
          className="carousel-wrapper"
          style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          onTouchCancel={handleDragEnd}
        >
          <div className="carousel-track">
            {stories.map((story, index) => (
              <div
                key={`story-${index}`}
                className={`story-card ${
                  activeIndex === index
                    ? "active"
                    : direction === "next" && index === nextIndex
                      ? "entering"
                      : direction === "prev" && index === prevIndex
                        ? "entering"
                        : ""
                }`}
                data-index={index}
              >
                <div className="card-image">
                  <img
                    className="story-image"
                    src={story.image || "/placeholder.svg"}
                    alt={`Success story ${index + 1}`}
                    draggable="false"
                  />
                </div>
                <div className="card-content">
                  <h2 className="card-title">{story.title}</h2>
                  <p className="card-description">{story.description}</p>
                  <a href="https://gohealthalbania.com/case-studies/" target="_blank" rel="noopener noreferrer">
                    <button className="read-more-btn">READ MORE</button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="navigation-controls">
          <div className="pagination">
            {stories.map((_, index) => (
              <span
                key={`dot-${index}`}
                className={`dot ${activeIndex === index ? "active" : ""}`}
                onClick={() => goToSlide(index)}
                role="button"
                aria-label={`Go to story ${index + 1}`}
                tabIndex={0}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}