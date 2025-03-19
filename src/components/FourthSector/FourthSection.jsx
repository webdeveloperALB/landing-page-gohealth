import { useState } from "react";
import "./FourthSection.css";

const FourthSection = () => {
  const [showingImage, setShowingImage] = useState("split"); // "split", "before", or "after"

  // Define your image URLs here
  const beforeImageUrl = "/sixth-image.jpg";
  const afterImageUrl = "/third_image.jpg";

  const handleLeftClick = () => {
    // Show full "after" (right) image when left arrow is clicked
    setShowingImage(showingImage === "after" ? "split" : "after");
  };

  const handleRightClick = () => {
    // Show full "before" (left) image when right arrow is clicked
    setShowingImage(showingImage === "before" ? "split" : "before");
  };

  // Determine clip paths based on current state
  const beforeClipPath =
    showingImage === "before" ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" :
      showingImage === "after" ? "polygon(0 0, 0% 0, 0% 100%, 0 100%)" :
        "polygon(0 0, 50% 0, 50% 100%, 0 100%)";

  const afterClipPath =
    showingImage === "after" ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" :
      showingImage === "before" ? "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" :
        "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)";

  return (
    <div className="transformation-container">
      <div className="content-wrapper">
        <div className="text-content">
          <p className="subtitle">PRIMA E DOPO</p>
          <h1 className="title">Vivi La Trasformazione</h1>
        </div>

        <div className="before-after-container">
          {/* Before image (left side) */}
          <div
            className="before-image"
            style={{
              backgroundImage: `url(${beforeImageUrl})`,
              clipPath: beforeClipPath
            }}
          />

          {/* After image (right side) */}
          <div
            className="after-image"
            style={{
              backgroundImage: `url(${afterImageUrl})`,
              clipPath: afterClipPath
            }}
          />

          {/* Fixed central divider with arrows */}
          <div className="fixed-divider">
            <div className="divider-line"></div>
            <div className="divider-buttons">
              <span className="arrow-left" onClick={handleLeftClick}>&lt;</span>
              <span className="arrow-right" onClick={handleRightClick}>&gt;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourthSection;