import React, { memo } from 'react';
import './ThirdSection.css';

const ScrollingText = memo(() => (
  <div className="scrolling-text">
    Sorridi con fiducia, scegli la qualità che meriti 😁 &nbsp;
  </div>
));

const ThirdSection = memo(({ className = '' }) => {
  // Create array with fixed length instead of duplicating JSX elements
  const textElements = Array(8).fill(null);
  
  return (
    <div className={`third-sector ${className}`}>
      <div className="scrolling-container">
        <div className="scrolling-content">
          {textElements.map((_, index) => (
            <ScrollingText key={index} />
          ))}
        </div>
      </div>
    </div>
  );
});

export default ThirdSection;