"use client"

import { useEffect, useRef, memo } from "react"
import "./NinthComponent.css"

const partnerImages = [
  { src: "/partner/1.webp", alt: "Partner 1" },
  { src: "/partner/2.webp", alt: "Partner 2" },
  { src: "/partner/3.webp", alt: "Partner 3" },
  { src: "/partner/4.webp", alt: "Partner 4" },
  { src: "/partner/5.webp", alt: "Partner 5" }
]

const ScrollerItem = memo(({ src, alt }) => (
  <div className="scroller-item">
    <img 
      src={src} 
      alt={alt}
      loading="lazy"
      width="100%"
      height="auto"
      decoding="async"
    />
  </div>
))

ScrollerItem.displayName = "ScrollerItem"

function InfiniteCarousel({ className = "" }) {
  const scrollerRef = useRef(null)
  
  useEffect(() => {
    // Clone elements only on client-side
    if (typeof window === 'undefined' || !scrollerRef.current) return

    const scrollerContent = scrollerRef.current
    const scrollerInner = scrollerContent.querySelector('.scroller-inner')

    if (scrollerInner) {
      // Use DocumentFragment for better performance when batch adding nodes
      const fragment = document.createDocumentFragment()
      const scrollerItems = Array.from(scrollerInner.children)
      
      scrollerItems.forEach((item) => {
        fragment.appendChild(item.cloneNode(true))
      })
      
      scrollerInner.appendChild(fragment)
    }

    // Return cleanup function
    return () => {
      // Optional: Clean up any resources if needed
    }
  }, [])

  return (
    <div className={`ninth-sector ${className || ""}`}>
      <div className="scroller-container">
        <div className="scroller" ref={scrollerRef}>
          <div className="scroller-inner">
            {partnerImages.map((image, index) => (
              <ScrollerItem
                key={`partner-${index}`}
                src={image.src}
                alt={image.alt}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(InfiniteCarousel)