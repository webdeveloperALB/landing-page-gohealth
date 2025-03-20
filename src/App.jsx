import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./LandingPage";
import ElevenComponent from './components/ElevenSector/ElevenComponent';
import CheckupPage from "./components/CheckupPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/eleven-component" element={<ElevenComponent />} />
        <Route path="/checkup" element={<CheckupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
