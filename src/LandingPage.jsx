import FirstSector from "./components/FirstSector/FirstSector";
import FourthSection from "./components/FourthSector/FourthSection";
import Navbar from "./components/Navbar";
import SecondSector from "./components/SecondSector/SecondSector";
import ThirdSection from "./components/ThirdSector/ThirdSection";
import FifthSection from "./components/FifthSector/FifthSection";
import SixthComponent from "./components/SixthSector/SixthComponent";
import SeventhComponent from "./components/SeventhSector/SeventhComponent";
import EightComponent from "./components/EightSector/EightComponent";
import NinthComponent from "./components/NinthSector/NinthComponent";
import TenthComponent  from "./components/TenthSector/TenthComponent";
import ElevenComponent  from "./components/ElevenSector/ElevenComponent";

const LandingPage = () => {
  return (
    <div>
      <FirstSector />
      <SecondSector />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixthComponent />
      <SeventhComponent />
      <EightComponent />
      <NinthComponent />
      <TenthComponent />
      <ElevenComponent />
    </div>
  );
};

export default LandingPage;