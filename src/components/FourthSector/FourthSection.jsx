"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import "./FourthSection.css"

export default function FourthSection({ className }) {
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  // Memoize event handlers to prevent recreating on each render
  const handleMouseDown = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
    document.body.style.userSelect = "none"
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    document.body.style.userSelect = ""
  }, [])

  const updatePosition = useCallback((clientX) => {
    if (!isDragging || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.min(Math.max((x / rect.width) * 100, 2.5), 97.5)
    setPosition(percentage)
  }, [isDragging])

  const handleMouseMove = useCallback((e) => {
    updatePosition(e.clientX)
  }, [updatePosition])

  const handleTouchMove = useCallback((e) => {
    updatePosition(e.touches[0].clientX)
    e.preventDefault()
  }, [updatePosition])

  // Add and remove event listeners globally for better performance
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleTouchMove, handleMouseUp])

  // Predefine style objects to prevent recreation on each render
  const beforeImageStyle = {
    backgroundImage: `url('/sixth-image.jpg')`,
    clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
  }

  const afterImageStyle = {
    backgroundImage: `url('/third_image.jpg')`,
    clipPath: `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)`,
  }

  const dividerStyle = { left: `${position}%` }

  return (
    <div className={`fourth-sector ${className || ''}`}>
      <div className="transformation-container">
        <div className="content-wrapper">
          <div className="text-content">
            <p className="subtitle">PRIMA E DOPO</p>
            <h1 className="title">Vivi La Trasformazione</h1>
          </div>

          <div
            className="before-after-container"
            ref={containerRef}
          >
            <div className="before-image" style={beforeImageStyle} />
            <div className="after-image" style={afterImageStyle} />

            <div
              className="divider"
              style={dividerStyle}
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
              onDragStart={(e) => e.preventDefault()}
            >
              <div className="divider-line" />
              <button className="divider-handle">
                <span className="handle-text">&lt; &gt;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}