import React from 'react';
import './FifthSection.css';
import { ArrowRight } from 'lucide-react';

const FifthSection = () => {
  const scrollToElevenComponent = () => {
    const elevenComponent = document.getElementById('eleven-section');
    if (elevenComponent) {
      elevenComponent.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const services = [
    {
      icon: '/1.svg',
      title: 'Impianti Dentali',
      description: 'Hai Perso Uno O Più Denti? - I Nostri Impianti Dentali Di Ultima Generazione Ti Restituiranno Un Sorriso Naturale E Duraturo.'
    },
    {
      icon: '/2.svg',
      title: 'Corona Dentale',
      description: 'Hai Denti Danneggiati O Indeboliti? - Le Nostre Corone Dentali In Zirconio O Ceramica Ripristinano La Funzionalità E L\'estetica Del Tuo Sorriso, Garantendo Resistenza, Durata E Un Aspetto Naturale.'
    },
    {
      icon: '/3.svg',
      title: 'Faccette Dentali',
      description: 'Non Sei Soddisfatto Del Tuo Sorriso? - Le Nostre Faccette Dentali Correggono Imperfezioni Come Macchie, Denti Scheggiati O Disallineati, Regalandoti Un Sorriso Perfetto In Pochi Giorni.'
    },
    {
      icon: '/4.svg',
      title: 'Ponte Dentale',
      description: 'Hai Bisogno Di Una Soluzione Stabile E Duratura Per Denti Mancanti? - Il Nostro Ponte Dentale È Una Scelta Eccellente Per Ripristinare La Funzionalità E L\'estetica Del Tuo Sorriso.'
    }
  ];

  return (
    <div className="dental-services-container">
      <div className="dental-services-header">
        <h3 className="dental-services-subtitle">SORRISO PERFETTO</h3>
        <h1 className="dental-services-title">I Nostri Trattamenti Dentali</h1>
      </div>

      <div className="dental-services-cards">
        {services.map((service, index) => (
          <div className="dental-service-card" key={index}>
            <div className="dental-service-icon-container">
              <div className="dental-service-icon">
                <img src={service.icon} alt={service.title} className="mask-icon" />
              </div>
            </div>
            <h2 className="dental-service-title">{service.title}</h2>
            <p className="dental-service-description">{service.description}</p>
            <a
              className="dental-service-link"
              onClick={scrollToElevenComponent}
              style={{ cursor: 'pointer' }}
            >
              RICHIEDI INFO
              <ArrowRight className="dental-service-arrow" size={16} />
            </a>
          </div>
        ))}
      </div>

      <div className="dental-services-pagination">
        {services.map((_, index) => (
          <span 
            key={index}
            className={`pagination-dot ${index === 0 ? 'active' : ''}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default FifthSection;