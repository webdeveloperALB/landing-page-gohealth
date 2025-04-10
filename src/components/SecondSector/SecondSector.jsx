import "./SecondSector.css"
import { CheckCircle } from "lucide-react"

export default function SecondSector({ className }) {
    return (
        <div className={`first-sector ${className}`}>
        <div className="container">
            <div className="contentSection">
                <p className="subtitle">SIAMO LA TUA SCELTA MIGLIORE</p>

                <h2 className="heading">Perché Affidarti A Noi?</h2>

                <p className="description">
                    Se Cerchi Una Soluzione Sicura, Conveniente E Di Alta Qualità Per I Tuoi Problemi Dentali, Sei Nel Posto
                    Giusto! Abbiamo Già Aiutato Oltre 8.000 Pazienti Italiani A Ritrovare Il Sorriso, Offrendo Cure Dentistiche
                    Eccellenti A Costi Accessibili.
                </p>

                <div className="benefitsContainer">
                    <div className="benefitRow">
                        <div className="benefit">
                            <CheckCircle className="checkIcon" />
                            <span>Cura Personalizzata</span>
                        </div>

                        <div className="benefit">
                            <CheckCircle className="checkIcon" />
                            <span>Materiali Certificati</span>
                        </div>
                    </div>

                    <div className="benefitRow">
                        <div className="benefit">
                            <CheckCircle className="checkIcon" />
                            <span>Approccio Incentrato Sul Paziente</span>
                        </div>

                        <div className="benefit">
                            <CheckCircle className="checkIcon" />
                            <span>Garanzia Su Tutti I Trattamenti</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="imageSection">
                <img src="/second-image.png" alt="Image description" />
            </div>
        </div>
        </div>
    );
}