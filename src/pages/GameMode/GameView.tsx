import { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import "../../index.css";
import "./GameView.css";
import CarouselCard from "../../components/CarouselCard/CarouselCard";

function GameView() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

  const [projectList, setProjectList] = useState([]);
  const [project, setProject] = useState(null);
  const [showGameInfo, setShowGameInfo] = useState(true);
  const [showStartup, setShowStartup] = useState(true);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [activeTab, setActiveTab] = useState("games");

  const bottomSheetRef = useRef(null);

  const [OTHER_TEXT, setOtherText] = useState({});

  // Handle active tab
  const handleOpenTab = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    fetch("/OtherTexts.json")
      .then((res) => res.json())
      .then((data) => setOtherText(data));
  }, []);

  // Handle click outside bottom sheet
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!bottomSheetRef.current) return;
      if (!bottomSheetRef.current.contains(e.target)) {
        setShowBottomSheet(false);
        setActiveTab("games");
      }
    };

    if (showBottomSheet) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showBottomSheet]);


  // Add page style class
  useEffect(() => {
    document.body.classList.add("gameview");
    return () => document.body.classList.remove("gameview");
  }, []);

  // Load project data
  useEffect(() => {
    fetch("/ProjectDetails.json")
      .then((res) => res.json())
      .then((data) => {
        const games = data.filter((item) => item.category === "games");
        setProjectList(games);

        const selected = id ? games.find((p) => String(p.id) === id) : games[0];
        setProject(selected);

        // startup animation duration
        setTimeout(() => setShowStartup(false), 5000);
      });
  }, [id]);

  const handleSelectGame = (game) => {
    setProject(game);
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="gameview-container">
      {showStartup ? (
        <div className="startup-overlay">
          <div className="startup-logo">
            <h1>
              GAME<span>MODE</span>
            </h1>
          </div>
        </div>
      ) : (
        <div className="gameViewContent">
          {/* Header */}
          <div className="gameViewContent-header">
            <Link className="game-esc" to="/projects/games">ESC</Link>
            <button onClick={() => setShowGameInfo((prev) => !prev)}>
              {showGameInfo ? "Hide Description" : "Show Description"}
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="gameViewContent-grid">
            {/* Carousel (Left) */}
            <div className="fixed-grid">
              {showGameInfo && (
                <CarouselCard
                  projectList={projectList}
                  onSelectGame={handleSelectGame}
                  currentProject={project}
                />
              )}
            </div>

            {/* Center Game Screen */}
            <div className="gameScreenView">
              <div className="game-screen">
                <iframe
                  key={project.id || project.title}
                  src={project.pathTo}
                  frameBorder="0"
                  allowFullScreen
                  title={project.title}
                />
              </div>
            </div>

            {/* Game Info (Right) */}
            <div className="fixed-grid">
              {showGameInfo && (
                <div className="gameInfo">
                  <h1>{project.title}</h1>
                  <p>{project.description}</p>
                  <div className="tagsbox">
                    <p>Tags:</p>
                    {project.tags.map((tag, index) => (
                      <span key={index}>{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Button & Bottom Sheet */}
          <div className="footer">
            <button
              className="footerBtn"
              onClick={() => setShowBottomSheet((prev) => !prev)}
            >
              ▴
            </button>

            {showBottomSheet && (
              <div ref={bottomSheetRef} className="bottomSheet-container">
                <div className="bottomSheet-header">
                  <button
                    className={activeTab === "welcome" ? "active" : ""}
                    onClick={() => handleOpenTab("welcome")}
                  >
                    Welcome
                  </button>
                  <button
                    className={activeTab === "games" ? "active" : ""}
                    onClick={() => handleOpenTab("games")}
                  >
                    Games
                  </button>
                  <button
                    className={activeTab === "sources" ? "active" : ""}
                    onClick={() => handleOpenTab("sources")}
                  >
                    Sources
                  </button>
                </div>

                <div className="bottomSheet-contents">
                  {activeTab === "welcome" && (
                    <div className="homeTab fadeIn">
                      <h1>Welcome</h1>
                      <p>
                        {OTHER_TEXT.welcome}
                      </p>
                    </div>
                  )}

                  {activeTab === "games" && (
                    <div className="gamesTab fadeIn">
                      <div className="gameList-grid">
                        {projectList.map((game, i) => (
                          <div
                            key={i}
                            className="game"
                            onClick={() => {
                              handleSelectGame(game);
                              setShowBottomSheet(false);
                            }}
                          >
                            <img src={game.image} alt={game.title} />
                            <p>{game.title}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "sources" && (
                    <div className="sourcesTab fadeIn">
                      <h1>Sources</h1>
                      <p>
                        {OTHER_TEXT.sources}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GameView;
