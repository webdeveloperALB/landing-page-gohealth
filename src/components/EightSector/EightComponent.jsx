import "./EightComponent.css";

export default function EightComponent() {
  return (
    <div className="success-stories-container">
      <div className="header">
        <h3 className="brand-name">VIAGGI FELICI</h3>
        <h1 className="main-title">Storie Di Successo Dentale</h1>
      </div>

      <div className="cards-container">
        <div className="story-card">
          <div className="card-image">
            <img
              className="story-image"
              src="/fifth-image.jpg"
              alt="Image description"
            />
          </div>
          <div className="card-content">
            <h2 className="card-title">Trasformazione Del Sorriso</h2>
            <p className="card-description">
              Un Uomo Di 65 Anni Si È Rivolto A Noi Con Un Problema Che Lo
              Affliggeva Da Tempo: Il Bruxismo, Che Ha Danneggiato I Suoi Denti,
              Soprattutto Nelle Aree Laterali.
            </p>
            <a
              href="https://gohealthalbania.com/case-studies/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="read-more-btn">READ MORE</button>
            </a>
          </div>
        </div>

        <div className="story-card">
          <div className="card-image">
            <img
              className="story-image"
              src="/sixth-image.jpg"
              alt="Image description"
            />
          </div>
          <div className="card-content">
            <h2 className="card-title">Corone Dentali E Impianti</h2>
            <p className="card-description">
              Una Paziente Di 58 Anni Si È Rivolta A Noi Con Una Storia Di
              Parodontite E Ritiro Gengivale, Che Aveva Causato Denti Irregolari
              E Una Base Debole. Dopo Una Diagnosi...
            </p>
            <a
              href="https://gohealthalbania.com/case-studies/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="read-more-btn">READ MORE</button>
            </a>
          </div>
        </div>

        <div className="story-card">
          <div className="card-image">
            <img
              className="story-image"
              src="/seventh-image.jpg"
              alt="Image description"
            />
          </div>
          <div className="card-content">
            <h2 className="card-title">Ricostruzione Totale</h2>
            <p className="card-description">
              Aenean Viverra Cursus Ipsum. Etiam Vitae Aliquet Lorem, Id
              Ultricies Nisl. Integer Tempor Metus Eget Massa.
            </p>
            <a
              href="https://gohealthalbania.com/case-studies/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="read-more-btn">READ MORE</button>
            </a>
          </div>
        </div>
      </div>

      <div className="pagination">
        <span className="dot active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
}
