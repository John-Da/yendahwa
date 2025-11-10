import { useEffect, useState } from "react";
import "../../index.css";
import "./Card.css";
import { OverlayPage } from "../pageOverlay/OverlayPage";
import { type ProjectData } from "../../types/project";


// Define props for the Card component
interface CardProps {
  cardFor: "homepj" | "project" | string;
  btnName?: string;
  projectItems: ProjectData;
  onClick?: () => void;
}

function Card({ cardFor, btnName, projectItems, onClick }: CardProps) {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleOpenDetail = () => setShowOverlay(true);
  const handleCloseDetail = () => setShowOverlay(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowOverlay(false);
    };

    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = showOverlay ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [showOverlay]);

  return (
    <>
      {cardFor === "homepj" ? (
        <>
          {/* Project Preview Card */}
          <div className="hcard-container" onClick={handleOpenDetail}>
            <div className="img-box">
              <div className="card-link">
                {projectItems.image ? (
                  <>
                    <img src={`${import.meta.env.BASE_URL}${projectItems.image}`} alt={projectItems.title} />
                    <span>↗</span>
                  </>
                ) : (
                  <>
                    <p>Empty Image</p>
                    <span>↗</span>
                  </>
                )}
              </div>
              <h2>{projectItems.title}</h2>
            </div>
          </div>

          {/* Overlay Detail View */}
          {showOverlay && (
            <OverlayPage selectedProject={projectItems} handleCloseDetail={handleCloseDetail} />
          )}
        </>
      ) : (
        <div className="pcard-container" onClick={onClick}>
          <div className="pcard-img">
            {projectItems.image ? (
              <img src={`${import.meta.env.BASE_URL}${projectItems.image}`} alt={projectItems.title} />
            ) : (
              <p>Empty Image</p>
            )}
          </div>
          <div className="pcard-description">
            <h1>{projectItems.title}</h1>
            <p>{projectItems.description || "No description yet."}</p>
            <div>
              {projectItems.tags?.map((tag: string, index: number) => (
                <span key={index} className="item-tag">
                  {tag}
                </span>
              ))}
            </div>
            {btnName && <button className="project-btn">{btnName}</button>}
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
