import { useEffect, useState, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../../index.css";
import "./GameView.css";
import CarouselCard from "../../components/CarouselCard/CarouselCard";
import { type Project } from "../../types/project";


// ---------------------- Types ----------------------

interface OtherText {
  welcome?: string;
  sources?: string;
  [key: string]: string | undefined;
}

// ---------------------------------------------------

function GameView() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

  const [projectList, setProjectList] = useState<Project[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [showGameInfo, setShowGameInfo] = useState(true);
  const [showStartup, setShowStartup] = useState(true);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [activeTab, setActiveTab] = useState<"welcome" | "games" | "sources">("games");
  const bottomSheetRef = useRef<HTMLDivElement | null>(null);
  const [OTHER_TEXT, setOtherText] = useState<OtherText>({});

  // ---------------- Handlers ----------------
  const handleOpenTab = (tabName: "welcome" | "games" | "sources") => {
    setActiveTab(tabName);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (!bottomSheetRef.current) return;
    if (!bottomSheetRef.current.contains(e.target as Node)) {
      setShowBottomSheet(false);
      setActiveTab("games");
    }
  };

  const handleSelectGame = (game: Project) => {
    setProject(game);
    navigate(
      `/projects/games/play?game=${encodeURIComponent(game.title)}&id=${game.id}`,
      { replace: false }
    );
  };

  // ---------------- Effects ----------------
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}OtherTexts.json`)
      .then((res) => res.json())
      .then((data: OtherText) => setOtherText(data));
  }, []);

  useEffect(() => {
    if (showBottomSheet) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showBottomSheet]);

  useEffect(() => {
    document.body.classList.add("gameview");
    return () => document.body.classList.remove("gameview");
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}ProjectDetails.json`)
      .then((res) => res.json())
      .then((data: Project[]) => {
        const games = data.filter((item) => item.category === "games");
        setProjectList(games);

        const selected = id ? games.find((p) => String(p.id) === id) : games[0];
        setProject(selected || null);

        setTimeout(() => setShowStartup(false), 5000);
      });
  }, [id]);

  // ---------------- Render ----------------
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
            <Link className="game-esc" to={`/projects/games`}>
              ESC
            </Link>
            <button onClick={() => setShowGameInfo((prev) => !prev)}>
              {showGameInfo ? "Hide Description" : "Show Description"}
            </button>
          </div>

          {/* Main Content Grid */}
          <div
            className={`gameViewContent-grid ${
              !showGameInfo ? "expanded-view" : ""
            }`}
          >
            {/* Carousel (Left) */}
            {showGameInfo && (
              <CarouselCard
                projectList={projectList}
                onSelectGame={handleSelectGame}
                currentProject={project}
              />
            )}

            {/* Center Game Screen */}
            <div className="gameScreenView">
              <div className="game-screen">
                <iframe
                  key={project.id || project.title}
                  src={project.data?.demoLink}
                  allowFullScreen
                  title={project.title}
                />
              </div>
            </div>

            {/* Game Info (Right) */}
            {showGameInfo && (
              <div className="gameInfo">
                <h1>{project.title}</h1>
                <p>{project.description}</p>

                <div className="tagsbox">
                  <p>Tags:</p>
                  {project.tags?.map((tag, index) => (
                    <span key={index}>{tag}</span>
                  ))}
                </div>
                <a
                  href={project.data?.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </div>
            )}
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
                      <p>{OTHER_TEXT.welcome}</p>
                    </div>
                  )}

                  {activeTab === "games" && (
                    <div className="gamesTab fadeIn">
                      <div className="gameList-grid">
                        {projectList.map((game: Project, i: number) => (
                          <div
                            key={i}
                            className="game"
                            onClick={() => {
                              handleSelectGame(game);
                              setShowBottomSheet(false);
                            }}
                          >
                            {game.image && game.image.trim() !== "" ? (
                              <img src={`${import.meta.env.BASE_URL}${game.image}`} alt={game.title} />
                            ) : (
                              <p className="emptyImage">Empty Image</p>
                            )}
                            <p className="gameTitle">{game.title}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "sources" && (
                    <div className="sourcesTab fadeIn">
                      <h1>Sources</h1>
                      <p>{OTHER_TEXT.sources}</p>
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
