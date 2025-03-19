import FirstSector from "./components/FirstSector";
import FourthSection from "./components/FourthSection";
import Navbar from "./components/Navbar";
import SecondSector from "./components/SecondSector";
import ThirdSection from "./components/ThirdSection";
import FifthSection from "./components/FifthSection";
import SixthComponent from "./components/SixthComponent";

const LandingPage = () => {
  return (
    <div>
      <FirstSector />
      <SecondSector />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixthComponent />
    </div>
  );
};

export default LandingPage;