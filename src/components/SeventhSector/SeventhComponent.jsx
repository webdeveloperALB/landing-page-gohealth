import { useState } from 'react';
import ReactPlayer from 'react-player';
import "./SeventhComponent.css";

export default function SeventhComponent() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">La Migliore Clinica Dentale A Tirana</h1>
        <h2 className="hero-subtitle">Go Health Albania</h2>
        <button
          className="play-button"
          onClick={() => setShowVideo(true)}
          aria-label="Play video"
        >
          PLAY
        </button>
      </div>

      {showVideo && (
        <div className="video-overlay">
          <div className="video-container">
            <ReactPlayer
              url="https://youtu.be/dwkLZUuBm4A"
              width="90%"
              height="90%"
              controls={true}
              playing={true}
              style={{
                borderRadius: '15px',
                overflow: 'hidden',
                margin: 'auto'
              }}
              config={{
                youtube: {
                  playerVars: {
                    autoplay: 1,
                    origin: window.location.origin
                  }
                }
              }}
            />
            <button
              className="close-button"
              onClick={() => setShowVideo(false)}
              aria-label="Close video"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  )
}