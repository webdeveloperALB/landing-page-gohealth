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
  const autoScrollTimerRef = useRef(null)
  const cardWidth = useRef(0)
  const touchIdentifier = useRef(null)
  const isAnimating = useRef(false)
  const dragThreshold = 5
  const dragDistance = useRef(0)

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

  // Create carousel with clone items for infinite loop
  const carouselItems = [services[services.length - 1], ...services, services[0]]

  // Get width of a single card
  const getCardWidth = useCallback(() => {
    if (!containerRef.current) return 0
    return containerRef.current.offsetWidth
  }, [])

  // Scroll to contact section
  const scrollToElevenComponent = () => {
    const elevenComponent = document.getElementById("eleven-section")
    if (elevenComponent) {
      elevenComponent.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Stop auto scrolling
  const stopAutoScroll = useCallback(() => {
    if (autoScrollTimerRef.current) {
      clearTimeout(autoScrollTimerRef.current)
      autoScrollTimerRef.current = null
    }
  }, [])

  // Start auto scrolling
  const startAutoScroll = useCallback(() => {
    stopAutoScroll()
    
    const scroll = () => {
      if (!carouselRef.current || isDragging.current || isAnimating.current) return
      
      // Move to next card
      const nextIndex = (activeIndex + 1) % services.length
      navigateToCard(nextIndex)
      
      // Schedule next scroll
      autoScrollTimerRef.current = setTimeout(scroll, 3000)
    }
    
    autoScrollTimerRef.current = setTimeout(scroll, 3000)
  }, [activeIndex, services.length])

  // Handle infinite scroll loop
  const handleInfiniteScroll = useCallback(() => {
    if (!carouselRef.current || !cardWidth.current) return

    const scrollPosition = carouselRef.current.scrollLeft
    const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.offsetWidth

    if (scrollPosition >= maxScroll - 20) {
      // At end, jump to cloned start
      isAnimating.current = true
      carouselRef.current.style.scrollBehavior = 'auto'
      carouselRef.current.scrollLeft = cardWidth.current
      setTimeout(() => {
        carouselRef.current.style.scrollBehavior = 'smooth'
        isAnimating.current = false
        setActiveIndex(0)
      }, 50)
    } else if (scrollPosition <= 20) {
      // At start, jump to cloned end
      isAnimating.current = true
      carouselRef.current.style.scrollBehavior = 'auto'
      carouselRef.current.scrollLeft = services.length * cardWidth.current
      setTimeout(() => {
        carouselRef.current.style.scrollBehavior = 'smooth'
        isAnimating.current = false
        setActiveIndex(services.length - 1)
      }, 50)
    } else {
      // Update active index based on scroll position
      const normalizedIndex = Math.round(scrollPosition / cardWidth.current) - 1
      
      // Make sure index is within bounds
      let newIndex = normalizedIndex
      if (normalizedIndex < 0) {
        newIndex = services.length - 1
      } else if (normalizedIndex >= services.length) {
        newIndex = 0
      }
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex)
      }
    }
  }, [activeIndex, services.length])

  // Initialize carousel
  useEffect(() => {
    if (!carouselRef.current || !containerRef.current) return
    
    // Set initial card width
    cardWidth.current = getCardWidth()
    
    // Set initial scroll position
    carouselRef.current.style.scrollBehavior = 'auto'
    carouselRef.current.scrollLeft = cardWidth.current
    
    // Start auto-scroll after initial setup
    const timer = setTimeout(() => {
      carouselRef.current.style.scrollBehavior = 'smooth'
      startAutoScroll()
    }, 200)
    
    return () => {
      clearTimeout(timer)
      stopAutoScroll()
    }
  }, [getCardWidth, startAutoScroll, stopAutoScroll])

  // Handle window resize
  useEffect(() => {
    if (!containerRef.current) return
    
    const handleResize = () => {
      // Update card width
      const newCardWidth = getCardWidth()
      cardWidth.current = newCardWidth
      
      // Maintain scroll position relative to active card
      if (carouselRef.current && !isDragging.current && !isAnimating.current) {
        carouselRef.current.style.scrollBehavior = 'auto'
        carouselRef.current.scrollLeft = (activeIndex + 1) * newCardWidth
      }
    }
    
    // Create resize observer for responsive behavior
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(containerRef.current)
    
    return () => resizeObserver.disconnect()
  }, [activeIndex, getCardWidth])

  // Add scroll event listener
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return
    
    // Debounced scroll handler
    let scrollTimer = null
    const handleScrollEvent = () => {
      if (isDragging.current || isAnimating.current) return
      
      // Clear previous timeout
      if (scrollTimer) clearTimeout(scrollTimer)
      
      // Set a short delay to avoid excessive calculations
      scrollTimer = setTimeout(() => {
        handleInfiniteScroll()
      }, 50)
    }
    
    carousel.addEventListener('scroll', handleScrollEvent, { passive: true })
    
    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleScrollEvent)
      }
      if (scrollTimer) clearTimeout(scrollTimer)
    }
  }, [handleInfiniteScroll])

  // Navigate to card by index
  const navigateToCard = useCallback((index) => {
    if (!carouselRef.current || isAnimating.current) return
    
    stopAutoScroll()
    
    try {
      isAnimating.current = true
      setActiveIndex(index)
      
      carouselRef.current.style.scrollBehavior = 'smooth'
      carouselRef.current.scrollTo({
        left: (index + 1) * cardWidth.current,
        behavior: "smooth"
      })
      
      // Allow time for scrolling to complete
      setTimeout(() => {
        isAnimating.current = false
        startAutoScroll()
      }, 500)
    } catch (error) {
      console.error("Navigation error:", error)
      isAnimating.current = false
      startAutoScroll()
    }
  }, [startAutoScroll, stopAutoScroll])

  // Handle drag start
  const handleDragStart = (e) => {
    if (!carouselRef.current) return
    e.stopPropagation()
    
    stopAutoScroll()
    
    // For touch events
    if (e.type === 'touchstart') {
      if (isDragging.current) return
      const touch = e.changedTouches[0]
      touchIdentifier.current = touch.identifier
      startX.current = touch.clientX
    } else {
      startX.current = e.clientX
    }
    
    isDragging.current = true
    dragDistance.current = 0
    scrollLeft.current = carouselRef.current.scrollLeft
    carouselRef.current.style.scrollBehavior = 'auto'
    carouselRef.current.style.cursor = 'grabbing'
    
    // Add event listeners for mouse drag
    if (e.type === 'mousedown') {
      e.preventDefault()
      document.addEventListener('mousemove', handleDragMove)
      document.addEventListener('mouseup', handleDragEnd)
      document.addEventListener('mouseleave', handleDragEnd)
    }
  }

  // Handle drag movement
  const handleDragMove = (e) => {
    if (!isDragging.current || !carouselRef.current) return
    
    let clientX
    
    // Get client X based on event type
    if (e.type === 'touchmove') {
      const touch = Array.from(e.changedTouches).find(
        t => t.identifier === touchIdentifier.current
      )
      if (!touch) return
      clientX = touch.clientX
      e.preventDefault()
    } else {
      clientX = e.clientX
      e.preventDefault()
    }
    
    // Calculate drag distance
    const deltaX = clientX - startX.current
    dragDistance.current = Math.abs(deltaX)
    
    // Apply new scroll position
    const newScrollLeft = scrollLeft.current - deltaX
    carouselRef.current.scrollLeft = newScrollLeft
  }

  // Handle drag end
  const handleDragEnd = (e) => {
    if (!isDragging.current || !carouselRef.current) return
    
    // Clean up for mouse events
    if (e.type === 'mouseup' || e.type === 'mouseleave') {
      document.removeEventListener('mousemove', handleDragMove)
      document.removeEventListener('mouseup', handleDragEnd)
      document.removeEventListener('mouseleave', handleDragEnd)
    }
    // For touch, verify it's our tracked touch
    else if (e.type === 'touchend' || e.type === 'touchcancel') {
      const touch = Array.from(e.changedTouches).find(
        t => t.identifier === touchIdentifier.current
      )
      if (!touch) return
    }
    
    isDragging.current = false
    touchIdentifier.current = null
    carouselRef.current.style.cursor = 'grab'
    
    // Only snap if dragged significantly
    if (dragDistance.current > dragThreshold) {
      const currentPosition = carouselRef.current.scrollLeft
      const targetCard = Math.round(currentPosition / cardWidth.current)
      
      isAnimating.current = true
      carouselRef.current.style.scrollBehavior = 'smooth'
      carouselRef.current.scrollTo({
        left: targetCard * cardWidth.current,
        behavior: "smooth"
      })
      
      // Update active index after snapping
      setTimeout(() => {
        isAnimating.current = false
        handleInfiniteScroll()
        startAutoScroll()
      }, 300)
    } else {
      // Small drag - restore auto-scroll
      startAutoScroll()
    }
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
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            onTouchCancel={handleDragEnd}
            style={{
              userSelect: 'none',
              touchAction: 'pan-y',
              WebkitOverflowScrolling: 'touch',
              cursor: 'grab'
            }}
          >
            {carouselItems.map((service, index) => (
              <div 
                className="dental-service-card" 
                key={`service-${index}`}
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
  )
}

export default FifthSection