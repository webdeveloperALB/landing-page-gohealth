"use client"
import "./SeventhComponent.css"

const SeventhComponent= () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">La Migliore Clinica Dentale A Tirana</h1>
        <h2 className="hero-subtitle">Go Health Albania</h2>
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/dwkLZUuBm4A?autoplay=1&mute=1&loop=1&playlist=dwkLZUuBm4A"
            title="Dental Clinic Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  )
}
export default SeventhComponent