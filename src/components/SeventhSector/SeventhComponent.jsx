"use client"

import { useState, useRef, useEffect } from "react"
import ReactPlayer from "react-player"
import "./SeventhComponent.css"

export default function SeventhComponent() {
  const [playing, setPlaying] = useState(true)
  const [volume, setVolume] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const playerRef = useRef(null)

  useEffect(() => {
    const handleUserInteraction = () => {
      if (!playing) {
        setPlaying(true)
      }
      document.removeEventListener("click", handleUserInteraction)
    }
    document.addEventListener("click", handleUserInteraction)
    return () => document.removeEventListener("click", handleUserInteraction)
  }, [playing])

  // This effect removes the black background from YouTube iframe after it loads
  useEffect(() => {
    const removeBlackBackground = () => {
      const iframes = document.querySelectorAll("iframe")
      iframes.forEach((iframe) => {
        // Force transparent background on the iframe
        iframe.style.backgroundColor = "transparent"

        // Try to access the iframe content if possible (may be limited by CORS)
        try {
          if (iframe.contentWindow) {
            const iframeDocument = iframe.contentWindow.document
            const elements = iframeDocument.querySelectorAll("*")
            elements.forEach((el) => {
              el.style.backgroundColor = "transparent"
            })
          }
        } catch (e) {
          console.log("Cannot access iframe content due to CORS")
        }
      })
    }

    // Run initially and whenever the player might reload
    removeBlackBackground()

    // Set an interval to keep checking and removing black backgrounds
    const interval = setInterval(removeBlackBackground, 1000)
    return () => clearInterval(interval)
  }, [])

  // Add this function to your component
  useEffect(() => {
    // This function finds and modifies elements with specific dimensions
    const findAndFixSpecificElements = () => {
      // Query for elements that might have these dimensions
      const elements = document.querySelectorAll("*")

      elements.forEach((el) => {
        const style = window.getComputedStyle(el)

        // Check if this element has the specific dimensions we're looking for
        if (style.width === "1154px" && style.height === "649px") {
          console.log("Found element with target dimensions:", el)

          // Force transparent background
          el.style.setProperty("background", "transparent", "important")
          el.style.setProperty("background-color", "transparent", "important")

          // If it's an iframe, try to access its contents
          if (el.tagName === "IFRAME") {
            try {
              const iframeDoc = el.contentDocument || el.contentWindow.document
              const iframeElements = iframeDoc.querySelectorAll("*")

              iframeElements.forEach((iframeEl) => {
                iframeEl.style.setProperty("background", "transparent", "important")
                iframeEl.style.setProperty("background-color", "transparent", "important")
              })
            } catch (e) {
              console.log("Cannot access iframe content due to CORS")
            }
          }
        }
      })
    }

    // Run initially and set interval to keep checking
    findAndFixSpecificElements()
    const interval = setInterval(findAndFixSpecificElements, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleVolumeChange = (e) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">La Migliore Clinica Dentale A Tirana</h1>
        <h2 className="hero-subtitle">Go Health Albania</h2>
      </div>

      <div className="video-container">
        <div className="video-background-remover"></div>
        <ReactPlayer
          ref={playerRef}
          url="https://www.youtube.com/watch?v=dwkLZUuBm4A"
          playing={playing}
          volume={volume}
          muted={isMuted}
          loop={true}
          width="100%"
          height="100%"
          controls={false}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          config={{
            youtube: {
              playerVars: {
                autoplay: 1,
                controls: 0,
                modestbranding: 1,
                rel: 0,
                loop: 1,
                playlist: "dwkLZUuBm4A",
                iv_load_policy: 3,
                html5: 1,
                showinfo: 0,
                color: "white",
                disablekb: 1,
              },
            },
          }}
          className="pure-video"
        />

        <div className="custom-controls">
          <button className="control-button" onClick={() => setPlaying(!playing)}>
            {playing ? (
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
              </svg>
            )}
          </button>

          <div className="volume-container">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
            <svg className="volume-icon" width="24" height="24" viewBox="0 0 24 24">
              {isMuted || volume === 0 ? (
                <path
                  fill="currentColor"
                  d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,11.35 20.94,10.72 20.83,10.08L18.92,8.17C18.96,8.45 19,8.72 19,9V12ZM16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
                />
              ) : volume > 0.5 ? (
                <path
                  fill="currentColor"
                  d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18.01,19.86 21,16.28 21,12C21,7.72 18.01,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
                />
              ) : (
                <path
                  fill="currentColor"
                  d="M7,9V15H11L16,20V4L11,9H7M19,12C19,15.53 16.39,18.44 13,18.93V17.21C15.19,16.69 17,14.58 17,12C17,9.42 15.19,7.31 13,6.79V5.07C16.39,5.56 19,8.47 19,12Z"
                />
              )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

