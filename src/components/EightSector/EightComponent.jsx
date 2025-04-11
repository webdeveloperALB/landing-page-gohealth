"use client"

import { useEffect, useState } from "react"
import "./EightComponent.css"

export default function EightComponent({ className }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState("next")
  const totalSlides = 3

  // Auto-advance slides
  useEffect(() => {
    if (isAnimating) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [activeIndex, isAnimating])

  const nextSlide = () => {
    if (isAnimating) return

    setDirection("next")
    setIsAnimating(true)
    setActiveIndex((prev) => (prev + 1) % totalSlides)

    // Reset animation flag after transition completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 800)
  }

  const goToSlide = (index) => {
    if (isAnimating || index === activeIndex) return

    // Determine direction based on index
    setDirection(index > activeIndex ? "next" : "prev")
    setIsAnimating(true)
    setActiveIndex(index)

    setTimeout(() => {
      setIsAnimating(false)
    }, 800)
  }

  // Our story data
  const stories = [
    {
      image: "/fifth-image.jpg",
      title: "Trasformazione Del Sorriso",
      description:
        "Un Uomo Di 65 Anni Si È Rivolto A Noi Con Un Problema Che Lo Affliggeva Da Tempo: Il Bruxismo, Che Ha Danneggiato I Suoi Denti, Soprattutto Nelle Aree Laterali.",
    },
    {
      image: "/sixth-image.jpg",
      title: "Corone Dentali E Impianti",
      description:
        "Una Paziente Di 58 Anni Si È Rivolta A Noi Con Una Storia Di Parodontite E Ritiro Gengivale, Che Aveva Causato Denti Irregolari E Una Base Debole. Dopo Una Diagnosi...",
    },
    {
      image: "/seventh-image.jpg",
      title: "Ricostruzione Totale",
      description:
        "Aenean Viverra Cursus Ipsum. Etiam Vitae Aliquet Lorem, Id Ultricies Nisl. Integer Tempor Metus Eget Massa.",
    },
  ]

  // Calculate the next and previous indices
  const nextIndex = (activeIndex + 1) % totalSlides
  const prevIndex = (activeIndex - 1 + totalSlides) % totalSlides

  return (
    <div className={`eight-sector ${className || ''}`}>
    <div className="success-stories-container">
      <div className="header">
        <h3 className="brand-name">VIAGGI FELICI</h3>
        <h1 className="main-title">Storie Di Successo Dentale</h1>
      </div>

      <div className="carousel-wrapper">
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
            >
              <div className="card-image">
                <img
                  className="story-image"
                  src={story.image || "/placeholder.svg"}
                  alt={`Success story ${index + 1}`}
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

      <div className="pagination">
        {stories.map((_, index) => (
          <span
            key={`dot-${index}`}
            className={`dot ${activeIndex === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
    </div>
  )
}

