import Navbar from "../components/Navbar";
import "./landingpage.css";

function LandingPage() {
  return (
    <div className="landing-container">
      {/* Header Section */}
      <div className="landing-header">
        <div className="landing-header__rating">
          <img src="/google-trustpilot.svg" alt="Trust badges" />
        </div>

        <div className="landing-header__main">
          <div className="landing-header__content">
            {/* Header text */}
            <div className="landing-header__text">
              <p className="landing-header__company">GO HEALTH ALBANIA</p>
              <h1 className="landing-header__title">
                Stai Cercando La Migliore Clinica Dentale In Albania?
              </h1>
            </div>

            {/* Stats section */}
            <div className="landing-header__stats">
              {/* Patients stat */}
              <div className="landing-header__stat">
                <div className="landing-header__stat-icon">
                  <img src="/logo1.svg" alt="Patient icon" />
                </div>
                <p className="landing-header__stat-number">8,000+</p>
                <p className="landing-header__stat-label">
                  Pazienti Italiani Soddisfatti
                </p>
              </div>

              {/* Experience stat */}
              <div className="landing-header__stat">
                <div className="landing-header__stat-icon">
                  <img src="/logo2.svg" alt="Experience icon" />
                </div>
                <p className="landing-header__stat-number">7+</p>
                <p className="landing-header__stat-label">Anni Di Esperienza</p>
              </div>

              <div className="landing-header__3">
                <div className="landing-header__stat-3">
                  <img src="/logo3.png" alt="Experience icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Image Section */}
      <div className="landing-content__image">
        <img src="/first-image.png" alt="Before and After" />
        <span className="image-label prima">Prima</span>
        <span className="image-label dopo">Dopo</span>
      </div>
    </div>
  );
}

export default LandingPage;
