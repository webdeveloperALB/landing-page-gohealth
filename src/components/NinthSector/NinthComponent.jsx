"use client"

import { useEffect, useRef } from "react"
import "./NinthComponent.css" // Simple CSS import

export default function InfiniteCarousel({ className }) {
    const scrollerRef = useRef(null)

    useEffect(() => {
        if (!scrollerRef.current) return

        const scrollerContent = scrollerRef.current
        const scrollerInner = scrollerContent.querySelector('.scroller-inner')

        if (scrollerInner) {
            const scrollerItems = Array.from(scrollerInner.children)
            scrollerItems.forEach((item) => {
                scrollerInner.appendChild(item.cloneNode(true))
            })
        }
    }, [])

    return (
        <div className={`ninth-sector ${className}`}>
            <div className="scroller-container">
                <div className="scroller" ref={scrollerRef}>
                    <div className="scroller-inner">
                        <div className="scroller-item">
                            <img src="/partner/1.svg" alt="Partner 1" />
                        </div>
                        <div className="scroller-item">
                            <img src="/partner/2.svg" alt="Partner 2" />
                        </div>
                        <div className="scroller-item">
                            <img src="/partner/3.svg" alt="Partner 3" />
                        </div>
                        <div className="scroller-item">
                            <img src="/partner/4.svg" alt="Partner 4" />
                        </div>
                        <div className="scroller-item">
                            <img src="/partner/5.svg" alt="Partner 5" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}