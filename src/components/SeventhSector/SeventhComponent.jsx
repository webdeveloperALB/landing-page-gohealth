"use client"
import "./SeventhComponent.css"

const SeventhComponent = ({ className }) => {
  return (
    <div className={`seventh-sector ${className}`}>
      <div className="hero-container">
        <div className="hero-content">
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/dwkLZUuBm4A?autoplay=1&mute=1&loop=1&playlist=dwkLZUuBm4A&controls=0&showinfo=0&rel=0&modestbranding=1&fs=0&iv_load_policy=3"
              title="Dental Clinic Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen={false}
              style={{
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                overflow: 'hidden'
              }}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeventhComponent