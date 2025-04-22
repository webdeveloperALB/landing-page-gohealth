"use client";

import { useState, useEffect, useCallback, memo } from "react";
import "./SeventhComponent.css";

const SeventhComponent = memo(({ className = "" }) => {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  
  // Create the YouTube URL only when needed
  const getYouTubeUrl = useCallback(() => {
    if (typeof window === 'undefined') return '';
    
    const videoId = "dwkLZUuBm4A";
    const encodedReferrer = encodeURIComponent(window.location.href);
    
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&fs=0&iv_load_policy=3&rel=0&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=${encodedReferrer}`;
  }, []);
  
  // Only load the iframe when component is visible
  useEffect(() => {
    // Create intersection observer to detect when component is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const url = getYouTubeUrl();
          setCurrentUrl(url);
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );
    
    // Select the container element to observe
    const container = document.querySelector('.seventh-sector');
    if (container) {
      observer.observe(container);
    }
    
    // Cleanup observer on unmount
    return () => {
      if (container) {
        observer.unobserve(container);
      }
      observer.disconnect();
    };
  }, [getYouTubeUrl]);
  
  // Placeholders for when video is not yet loaded
  const videoPlaceholder = (
    <div 
      className="video-placeholder"
      aria-label="Video loading"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    />
  );
  
  return (
    <div className={`seventh-sector ${className}`}>
      <div className="hero-container">
        <div className="hero-content">
          <div 
            className="video-container"
            // Add aspect ratio to prevent layout shift
            style={{
              position: 'relative',
              paddingBottom: '56.25%', // 16:9 aspect ratio
              height: 0,
              overflow: 'hidden'
            }}
          >
            {shouldLoadVideo ? (
              <iframe
                src={currentUrl}
                title="Dental Clinic Video"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={false}
                loading="lazy"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  overflow: 'hidden'
                }}
                aria-label="YouTube video player"
              />
            ) : videoPlaceholder}
          </div>
        </div>
      </div>
    </div>
  );
});

// Add displayName for better debugging
SeventhComponent.displayName = 'SeventhComponent';

export default SeventhComponent;