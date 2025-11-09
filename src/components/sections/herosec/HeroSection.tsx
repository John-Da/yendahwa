import "../../../index.css";
import "./HeroSection.css";
import TextAnimation from "../../txtAni/TextAnimation";
import { type Profile } from "../../../types/profile"; // adjust path
import { BACKGROUND_IMG } from "../../../assets/bgImg/BackgroundImg";
import SliderButton from "../../slidebtn/SlideButton";
import { PATHTO } from "../../../PathTO";
import Skillsicons from "../../skillIcons/Skillsicons";
import { useNavigate } from "react-router-dom";


// Define HeroSectionProps
interface HeroSectionProps {
  sectionFor: string;
  profileData: Profile;
}

function HeroSection({ sectionFor, profileData }: HeroSectionProps) {
  const navigate = useNavigate();
  
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
          <div className="quick-about-grid">

            {/* ---------- Box 1: Highlights ---------- */}
            <div className="hightlightsbox">
              <div className="hightlightbg">
                <img src={BACKGROUND_IMG.bgt} alt="Highlights background" />
              </div>
              <div className="hightlightcontent">
                <h1>Highlights</h1>
                <div className="highlight-list">
                  {["Design", "UXUI", "Animation"].map((title, i) => (
                    <div
                      key={i}
                      className="highlight-card"
                      onClick={() =>
                        navigate(`/projects/highlights/${title.toLowerCase().replace(/\s+/g, '-')}`)
                      }
                    >
                      <h2>{title}</h2>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ---------- Box 2: Timezone ---------- */}
            <div className="timezonebox">
              <div className="timezonebg">
                <img src={BACKGROUND_IMG.net} alt="Network background" />
              </div>
              <div className="timezonecontent">
                <div className="context">
                  <h2>Let’s Connect</h2>
                  <p>I’m flexible with any time zone 🌍</p>
                </div>
                <div className="timeZone">
                  <span>🇲🇲 12:00</span>
                  <span className='tCenter'>🇺🇸 12:00</span>
                  <span>🇯🇵 12:00</span>
                </div>
              </div>
            </div>

            {/* ---------- Box 3: Game Mode ---------- */}
            <div className="gamemodebox">
              <div className="gamemodebg">
                <video src={BACKGROUND_IMG.globe} autoPlay loop muted playsInline />
              </div>
              <div className="gamemodecontent">
                <h1>Game Mode</h1>
                <div className="gameModeBtnBox">
                  <SliderButton btnName="Slide to play" path={PATHTO.gamemode.path} />
                </div>
              </div>
            </div>

            {/* ---------- Box 4: Tools ---------- */}
            <div className="toolsbox">
              <div className="toolsbg">
                <img src={BACKGROUND_IMG.bg4} alt="Crafting tools background" />
              </div>
              <div className="toolscontent">
                <h2>Crafting Tools</h2>
                <div className="skills-wrapper">
                  <Skillsicons />
                  <Skillsicons startFrom="left" />
                  <Skillsicons />
                </div>
                <h3>Code - Design - Explore</h3>
              </div>
            </div>

            {/* ---------- Box 5: Recent ---------- */}
            <div className="recentbox">
              <div className="recentbg">
                <img src={BACKGROUND_IMG.bgt} alt="Recent projects background" />
              </div>
              <div className="recentcontent">
                <h1>Recent</h1>
                <p>Click to explore latest projects →</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


export default HeroSection;