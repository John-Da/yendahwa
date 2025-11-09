import "../../../index.css";
import "./HeroSection.css";
import TextAnimation from "../../txtAni/TextAnimation";
import { type Profile } from "../../../types/profile"; // adjust path


// Define HeroSectionProps
interface HeroSectionProps {
  sectionFor: string;
  profileData: Profile;
}

function HeroSection({ sectionFor, profileData }: HeroSectionProps) {

  return (
    <>
      {sectionFor === "home" ? (
        <div className="home-hero" id="home">
          <p className="herotxt">{profileData.heroText}</p>
          <div className="textbox">
            <h1>
              Hi! I'm <span>{profileData.author}</span>
            </h1>
            <TextAnimation
              fontSize={1.3}
              color="var(--color-primary)"
              last="var(--color-primary)"
              align="right"
            />
          </div>
          <a href="#contact" className="hhero-btn">
            Contact
          </a>
        </div>
      ) : (
        <div className="quick-about">
          {/* ...rest of your JSX */}
        </div>
      )}
    </>
  );
}

export default HeroSection;
