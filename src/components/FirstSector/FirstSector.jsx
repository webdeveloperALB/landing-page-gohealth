import Navbar from "../Navbar";
import "./FirstSector.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends } from "react-icons/fa";

function FirstSector() {
    return (
        <div className="landing-container">
            {/* Header Section */}
            <div className="landing-container2">
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
            <div className="appointment-container">
                <div className="appointment-header">
                    <h1 className="appointment-title">Trova La Soluzione Perfetta</h1>

                    <div className="nav-menu">
                        <button className="nav-item">IMPLANTOLOGIA</button>
                        <button className="nav-item">ORTODONZIA</button>
                        <button className="nav-item">ESTETICA DENTALE</button>
                        <button className="nav-item">PROTESI DENTALI</button>
                    </div>
                </div>

                <div className="appointment-form">
                    <div className="form-field">
                        <div className="icon-container">
                            <FaMapMarkerAlt className="field-icon" />
                        </div>
                        <div className="field-content">
                            <p className="field-label">Posizione</p>
                            <p className="field-value">Tirana, Albania</p>
                        </div>
                    </div>

                    <div className="form-field">
                        <div className="icon-container">
                            <FaCalendarAlt className="field-icon" />
                        </div>
                        <div className="field-content">
                            <p className="field-label">Data Dell'appuntamento</p>
                            <p className="field-value">12 Agosto 2024</p>
                        </div>
                    </div>

                    <div className="form-field">
                        <div className="icon-container">
                            <FaUserFriends className="field-icon" />
                        </div>
                        <div className="field-content">
                            <p className="field-label">Trattamento Per</p>
                            <p className="field-value">1 Adulto, 1 Bambino</p>
                        </div>
                    </div>

                    <button className="book-button">PRENOTA UN APPUNTAMENTO</button>
                </div>
            </div>
        </div>

    );
}

export default FirstSector;
