import React from 'react';
import './FifthSection.css';
import { ArrowRight } from 'lucide-react';

const FifthSection = () => {
  return (
    <div className="dental-services-container">
      <div className="dental-services-header">
        <h3 className="dental-services-subtitle">SORRISO PERFETTO</h3>
        <h1 className="dental-services-title">I Nostri Trattamenti Dentali</h1>
      </div>

      <div className="dental-services-cards">
        <div className="dental-service-card">
          <div className="dental-service-icon-container">
            <div className="dental-service-icon">
            <img src="/1.svg" alt="Background mask" className="mask-icon" />
            </div>
          </div>
          <h2 className="dental-service-title">Impianti Dentali</h2>
          <p className="dental-service-description">
            Hai Perso Uno O Più Denti? - I Nostri Impianti Dentali Di Ultima Generazione Ti Restituiranno Un Sorriso Naturale E Duraturo.
          </p>
          <a href="#" className="dental-service-link">
            RICHIEDI INFO
            <ArrowRight className="dental-service-arrow" size={16} />
          </a>
        </div>

        <div className="dental-service-card">
          <div className="dental-service-icon-container">
            <div className="dental-service-icon">
            <img src="/2.svg" alt="Background mask" className="mask-icon" />
            </div>
          </div>
          <h2 className="dental-service-title">Corona Dentale</h2>
          <p className="dental-service-description">
            Hai Denti Danneggiati O Indeboliti? - Le Nostre Corone Dentali In Zirconio O Ceramica Ripristinano La Funzionalità E L'estetica Del Tuo Sorriso, Garantendo Resistenza, Durata E Un Aspetto Naturale.
          </p>
          <a href="#" className="dental-service-link">
            RICHIEDI INFO
            <ArrowRight className="dental-service-arrow" size={16} />
          </a>
        </div>

        <div className="dental-service-card">
          <div className="dental-service-icon-container">
            <div className="dental-service-icon">
            <img src="/3.svg" alt="Background mask" className="mask-icon" />
            </div>
          </div>
          <h2 className="dental-service-title">Faccette Dentali</h2>
          <p className="dental-service-description">
            Non Sei Soddisfatto Del Tuo Sorriso? - Le Nostre Faccette Dentali Correggono Imperfezioni Come Macchie, Denti Scheggiati O Disallineati, Regalandoti Un Sorriso Perfetto In Pochi Giorni.
          </p>
          <a href="#" className="dental-service-link">
            RICHIEDI INFO
            <ArrowRight className="dental-service-arrow" size={16} />
          </a>
        </div>

        <div className="dental-service-card">
          <div className="dental-service-icon-container">
            <div className="dental-service-icon">
            <img src="/4.svg" alt="Background mask" className="mask-icon" />
            </div>
          </div>
          <h2 className="dental-service-title">Ponte Dentale</h2>
          <p className="dental-service-description">
            Hai Bisogno Di Una Soluzione Stabile E Duratura Per Denti Mancanti? - Il Nostro Ponte Dentale È Una Scelta Eccellente Per Ripristinare La Funzionalità E L'estetica Del Tuo Sorriso.
          </p>
          <a href="#" className="dental-service-link">
            RICHIEDI INFO
            <ArrowRight className="dental-service-arrow" size={16} />
          </a>
        </div>
      </div>

      <div className="dental-services-pagination">
        <span className="pagination-dot active"></span>
        <span className="pagination-dot"></span>
        <span className="pagination-dot"></span>
        <span className="pagination-dot"></span>
      </div>
    </div>
  );
};

export default FifthSection;
