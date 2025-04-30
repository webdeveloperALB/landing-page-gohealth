"use client"

import { useEffect, useState, useCallback, useRef, memo } from "react"
import "./EightComponent.css"

const StoryCard = memo(({ story, isActive, direction, index, nextIndex, prevIndex }) => (
  <div
    className={`story-card ${
      isActive
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
        loading="lazy"
        width="100%"
        height="auto"
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
))

StoryCard.displayName = "StoryCard"

const PaginationDot = memo(({ index, isActive, goToSlide }) => (
  <span
    className={`dot ${isActive ? "active" : ""}`}
    onClick={() => goToSlide(index)}
    role="button"
    aria-label={`Go to story ${index + 1}`}
    tabIndex={0}
  ></span>
))

PaginationDot.displayName = "PaginationDot"

// Stories content - moved outside component to prevent recreation on each render
const stories = [
  {
    image: "/fifth-image.webp",
    title: "Trasformazione Del Sorriso",
    description: "Un Uomo Di 65 Anni Si È Rivolto A Noi Con Un Problema Che Lo Affliggeva Da Tempo: Il Bruxismo, Che Ha Danneggiato I Suoi Denti, Soprattutto Nelle Aree Laterali.",
  },
  {
    image: "/sixth-image.webp",
    title: "Corone Dentali E Impianti",
    description: "Una Paziente Di 58 Anni Si È Rivolta A Noi Con Una Storia Di Parodontite E Ritiro Gengivale, Che Aveva Causato Denti Irregolari E Una Base Debole. Dopo Una Diagnosi...",
  },
  {
    image: "/seventh-image.webp",
    title: "Ricostruzione Totale",
    description: "Aenean Viverra Cursus Ipsum. Etiam Vitae Aliquet Lorem, Id Ultricies Nisl. Integer Tempor Metus Eget Massa.",
  },
]

const TOTAL_SLIDES = stories.length
const ANIMATION_DURATION = 800
const AUTOPLAY_DELAY = 5000
const DRAG_THRESHOLD = 0.15
const VELOCITY_THRESHOLD = 0.5

function EightComponent({ className }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState("next")
  
  // Refs for performance optimization
  const carouselRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const dragDistance = useRef(0)
  const dragVelocity = useRef(0)
  const lastDragTime = useRef(0)
  const lastDragX = useRef(0)
  const autoplayTimeout = useRef(null)
  const animationFrameId = useRef(null)

  const nextIndex = (activeIndex + 1) % TOTAL_SLIDES
  const prevIndex = (activeIndex - 1 + TOTAL_SLIDES) % TOTAL_SLIDES

  // Calculate card width based on container - memoized
  const getCardWidth = useCallback(() => {
    return carouselRef.current?.offsetWidth || 0
  }, [])

  const transitionToSlide = useCallback((index, dir) => {
    if (isAnimating) return

    const newDir = dir || (index > activeIndex ? "next" : "prev")
    setDirection(newDir)
    setIsAnimating(true)
    setActiveIndex(index)

    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, ANIMATION_DURATION)
    
    return () => clearTimeout(timer)
  }, [activeIndex, isAnimating])

  const nextSlide = useCallback(() => {
    const newIndex = (activeIndex + 1) % TOTAL_SLIDES
    transitionToSlide(newIndex, "next")
  }, [activeIndex, transitionToSlide])

  const prevSlide = useCallback(() => {
    const newIndex = (activeIndex - 1 + TOTAL_SLIDES) % TOTAL_SLIDES
    transitionToSlide(newIndex, "prev")
  }, [activeIndex, transitionToSlide])

  // Autoplay - optimized with useCallback
  const startAutoplay = useCallback(() => {
    if (autoplayTimeout.current) {
      clearTimeout(autoplayTimeout.current)
    }
    
    autoplayTimeout.current = setTimeout(() => {
      nextSlide()
    }, AUTOPLAY_DELAY)
  }, [nextSlide])

  const stopAutoplay = useCallback(() => {
    if (autoplayTimeout.current) {
      clearTimeout(autoplayTimeout.current)
      autoplayTimeout.current = null
    }
  }, [])

  // Optimize autoplay effect
  useEffect(() => {
    if (!isAnimating && !isDragging.current) {
      startAutoplay()
    }
    
    return stopAutoplay
  }, [isAnimating, startAutoplay, stopAutoplay])

  // Clean up any potential memory leaks on unmount
  useEffect(() => {
    return () => {
      stopAutoplay();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [stopAutoplay]);

  // Manual navigation - memoized
  const goToSlide = useCallback((index) => {
    if (isAnimating || index === activeIndex) return
    transitionToSlide(index)
  }, [isAnimating, activeIndex, transitionToSlide])

  // Optimized drag handlers
  const handleDragStart = useCallback((e) => {
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
  }, [stopAutoplay])

  // Handle drag movement with requestAnimationFrame for better performance
  const handleDragMove = useCallback((e) => {
    if (!isDragging.current) return
    e.preventDefault()
    
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current)
    }
    
    animationFrameId.current = requestAnimationFrame(() => {
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
    })
  }, [])

  // Handle drag end - memoized
  const handleDragEnd = useCallback(() => {
    if (!isDragging.current) return
    
    isDragging.current = false
    document.body.style.userSelect = ""
    
    // Determine slide change based on drag distance and velocity
    const cardWidth = getCardWidth()
    const dragThreshold = cardWidth * DRAG_THRESHOLD
    const velocity = dragVelocity.current * 100
    
    // Decide whether to change slides based on drag distance or velocity
    if (
      (Math.abs(dragDistance.current) > dragThreshold) || 
      (Math.abs(velocity) > VELOCITY_THRESHOLD)
    ) {
      if (dragDistance.current > 0 || velocity > VELOCITY_THRESHOLD) {
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
  }, [getCardWidth, prevSlide, nextSlide, startAutoplay])

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
              <StoryCard
                key={`story-${index}`}
                story={story}
                isActive={activeIndex === index}
                direction={direction}
                index={index}
                nextIndex={nextIndex}
                prevIndex={prevIndex}
              />
            ))}
          </div>
        </div>

        <div className="navigation-controls">
          <div className="pagination">
            {stories.map((_, index) => (
              <PaginationDot
                key={`dot-${index}`}
                index={index}
                isActive={activeIndex === index}
                goToSlide={goToSlide}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(EightComponent)