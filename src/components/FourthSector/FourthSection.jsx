"use client"

import { useState, useRef } from "react"
import "./FourthSection.css"

export default function FourthSection() {
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
    document.body.style.userSelect = "none" // Disable text selection globally during drag
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    document.body.style.userSelect = "" // Re-enable text selection
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.min(Math.max((x / rect.width) * 100, 2.5), 97.5)

    setPosition(percentage)
  }

  const beforeImageUrl = "/sixth-image.jpg"
  const afterImageUrl = "/third_image.jpg"

  return (
    <div className="transformation-container">
      <div className="content-wrapper">
        <div className="text-content">
          <p className="subtitle">PRIMA E DOPO</p>
          <h1 className="title">Vivi La Trasformazione</h1>
        </div>

        <div
          className="before-after-container"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="before-image"
            style={{
              backgroundImage: `url(${beforeImageUrl})`,
              clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
            }}
          />

          <div
            className="after-image"
            style={{
              backgroundImage: `url(${afterImageUrl})`,
              clipPath: `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)`,
            }}
          />

          <div
            className="divider"
            style={{ left: `${position}%` }}
            onMouseDown={handleMouseDown}
            onDragStart={(e) => e.preventDefault()} // Prevent drag ghost image
          >
            <div className="divider-line" />
            <div className="divider-handle">
              <span className="arrow-left">&lt;</span>
              <span className="arrow-right">&gt;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

