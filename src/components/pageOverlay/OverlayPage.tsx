import "../../index.css"
import "./OverlayPage.css"
import { MENUICON } from "../../assets/iconsvg/iconList";
import { PATHTO } from "../../PathTO";
import { Button } from "../button/Button";
import type { ProjectData } from "../../types/project";

interface OverlayProps {
  selectedProject: ProjectData;
  handleCloseDetail?: () => void;
}

export function OverlayPage({ selectedProject, handleCloseDetail }: OverlayProps) {

    return(
        <div className="projectDetailView-container" onClick={handleCloseDetail}>
            <div className="detail-content" onClick={(e) => e.stopPropagation()}>
            <div className="detailsView-header">
                <h2>{selectedProject.title}</h2>
                <button className="close-box" onClick={handleCloseDetail}>
                <img src={MENUICON["cross"]} alt="close" />
                </button>
            </div>

            <div className="projectImage">
                {selectedProject.image ? (
                <img src={`${import.meta.env.BASE_URL}${selectedProject.image}`} alt={selectedProject.title} />
                ) : (
                <p>Empty Image</p>
                )}
            </div>

            <div className="detailDescription">
                <p>{selectedProject.description || "No description available."}</p>
                {selectedProject.category === "games" ? (
                <div className="demonBtn">
                    <Button
                    path={selectedProject.data?.sourceCode || "#"}
                    onClick={handleCloseDetail}
                    children="GitHub"
                    btnType="btn"
                    btnSize="btn--medium"
                    btnStyle="btn--primary"
                    />
                    <Button
                    path={`${PATHTO.gamemode.path || "#"}?game=${encodeURIComponent(selectedProject.title)}&id=${selectedProject.id}`}
                    onClick={handleCloseDetail}
                    children="Play"
                    btnType="gBtn"
                    btnSize="gBtn--medium"
                    btnStyle="gBtn--primary"
                    />
                </div>
                ) : (
                <div className="demonBtn">
                    {selectedProject.data?.sourceCode && 
                    <Button
                    path={selectedProject.data.sourceCode || "#"}
                    onClick={handleCloseDetail}
                    children="GitHub"
                    btnType="btn"
                    btnSize="btn--medium"
                    btnStyle="btn--primary"
                    />}
                    {selectedProject.data?.demoLink && 
                    <Button
                    path={selectedProject.data.demoLink || "#"}
                    onClick={handleCloseDetail}
                    children="Live Demo"
                    btnType="btn"
                    target="_blank"
                    btnSize="btn--medium"
                    btnStyle="btn--outline"
                    />}
                </div>
                )}
            </div>

            <div className="detailsContainer">
                <div className="detailsGrid">
                <div className="detailsItem">
                    <p className="label">Category:</p>
                    <span className="value">{selectedProject.category || "N/A"}</span>
                </div>
                <div className="detailsItem">
                    <p className="label">Tags:</p>
                    <div className="tags">
                    {selectedProject.tags?.length
                        ? selectedProject.tags.map((tag, i) => (
                            <span key={i} className="tag">{tag}</span>
                        ))
                        : <span className="no-tags">No tags</span>
                    }
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}