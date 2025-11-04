import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../../index.css"
import "./GameView.css";

function GameView() {

    useEffect(() => {
        document.body.classList.add("gameview");
        return () => document.body.classList.remove("gameview");
    }, []);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const gameName = query.get("game");
  const id = query.get("id");

  const [project, setProject] = useState(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showGameInfo, setShowGameInfo] = useState(true);

  useEffect(() => {
    fetch("/ProjectDetails.json")
      .then((res) => res.json())
      .then((data) => {
        const selected = data.find((p) => String(p.id) === id);
        setProject(selected);
      });
  }, [id]);

  if (!project) return <div>Loading...</div>;

  return (
    <div className="gameview-container">
      {/* Header */}
      <div className="view-header">
        <Link to="/projects/games" className="esc-link">ESC</Link>
        <button
          onClick={() => setShowGameInfo((prev) => !prev)}
          className="toggle-info-btn"
        >
          {showGameInfo ? "Hide Description" : "Show Description"}
        </button>
      </div>

      {/* Main Content */}
      <div className="gameview-content">
        {/* Game Selection */}
        <div className="gameViewSelection">
            <div className="selectedGameImg">
                <img src={project.thumbnail || "/placeholder.png"} alt={project.title} />
            </div>
            <div className="gameImgBtnBox">
                <button className="prevGameBtn">
                    <img src="#" alt="Previous Game" />
                </button>
                <div className="gamename-box">
                    <p>{project.title}</p>
                </div>
                <button className="nextGameBtn">
                    <img src="#" alt="Next Game" />
                </button>
            </div>
        </div>

        {/* Game Play Section */}
        <div className="playGameSection">
          <iframe
            src={project.pathTo}
            frameBorder="0"
            className="gameScreen"
            title={project.title}
          />
        </div>

        {/* Game Information */}
        {showGameInfo && (
          <div className="gameInformation">
            <h1>{project.title}</h1>
            <p><strong>Description:</strong> {project.description}</p>
            <p>
              <strong>Tags:</strong>{" "}
              {project.tags.map((tag, idx) => (
                <span key={idx} className="tag">{tag}</span>
              ))}
            </p>
            <div className="button-box">
              <button>Download</button>
              <button>GitHub</button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="view-footer">
        <button className="footer-btn" onClick={() => setShowBottomSheet(!showBottomSheet) }>
          <img src={showBottomSheet? "down": "up"} alt="footer button" />
        </button>
      </div>

      {/* Bottom Sheet */}
      {showBottomSheet && (
        <div className="bottomSheet">
          <div className="bottomSheet-header">
            <button onClick={""}>Welcome</button>
            <button onClick={""}>Games Collections</button>
            <button onClick={""}>Sources</button>
          </div>
          <div className="bottomSheet-content">
            <div className="welcomeTab">
                <h1>Welcome To GameMode</h1>
            </div>
            <div className="gameTab">
                <div className="bottomSheetGrid">
                    {project.category.map((game, index) => (
                        <div key={index} className="gameItem">
                            <div className="gameimg-box">
                                <img src={project.image} alt="game name" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="sourcesTab"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameView;
