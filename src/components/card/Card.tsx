import React, { useEffect, useState } from 'react'
import "../../index.css"
import "./Card.css"
import { Button } from '../button/Button'
import { Link } from 'react-router-dom'
import { PATHTO } from '../../PathTO'
import { MENUICON } from '../../assets/iconsvg/iconList'
import { SOCIALLINKS } from '../../PathTO'

function Card({cardFor, btnName, projectItems, onClick}) {
    const [showOverlay, setShowOverlay] = useState(false);
  const handleOpenDetail = () => setShowOverlay(true);
  const handleCloseDetail = () => setShowOverlay(false);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setShowOverlay(false);
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
                                <img src={projectItems.image} alt={projectItems.title} />
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
                    <div className="projectDetailView-container" onClick={handleCloseDetail}>
                        <div className="detail-content" onClick={(e) => e.stopPropagation()}>
                            <div className="detailsView-header">
                                <h2>{projectItems.title}</h2>
                                <button className="close-box" onClick={handleCloseDetail}>
                                    <img src={MENUICON["cross"]} alt="close" />
                                </button>
                            </div>

                            <div className="projectImage">
                                {projectItems.image ? (
                                    <img src={projectItems.image} alt={projectItems.title} />
                                ) : (
                                    <p>Empty Image</p>
                                )}
                            </div>

                        <div className="detailDescription">
                            <p>{projectItems.description || "No description available."}</p>
                            {projectItems.category === "games" ? (
                                <div className="demonBtn">
                                    <Button
                                        onClick={handleCloseDetail}
                                        children={"Play"}
                                        btnType={"gBtn"}
                                        btnSize={"gBtn--medium"}
                                        btnStyle={"gBtn--primary"}
                                        path={`${PATHTO.gamemode.path}?game=${encodeURIComponent(
                                        projectItems.title
                                        )}&id=${projectItems.id}`}
                                    />
                                </div>
                            ) : (
                                <div className="demonBtn">
                                    <Button
                                        path={SOCIALLINKS.gh}
                                        onClick={handleCloseDetail}
                                        children={"GitHub"}
                                        btnType={"btn"}
                                        btnSize={"btn--medium"}
                                        btnStyle={"btn--primary"}
                                    />
                                    <Button
                                        path={SOCIALLINKS.gh}
                                        onClick={handleCloseDetail}
                                        children={"Live Demo"}
                                        btnType={"btn"}
                                        btnSize={"btn--medium"}
                                        btnStyle={"btn--outline"}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="detailsContainer">
                            <div className="detailsGrid">
                                <div className="detailsItem">
                                    <p className="label">Category:</p>
                                    <span className="value">{projectItems.category || "N/A"}</span>
                                </div>
                                <div className="detailsItem">
                                    <p className="label">Tags:</p>
                                    <div className="tags">
                                        {projectItems.tags?.length ? (
                                        projectItems.tags.map((tag, index) => (
                                            <span key={index} className="tag">
                                            {tag}
                                            </span>
                                        ))
                                        ) : (
                                        <span className="no-tags">No tags</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="detailsView-footer">

                        </div>
                        </div>
                    </div>
                )}
            </>
        ) :(
            <div className="pcard-container" onClick={onClick}>
                <div className="pcard-img">
                    {projectItems.image? 
                    (<img src={projectItems.image} alt={projectItems.title} />):(
                    <p>Empty Image</p>
                    )}
                </div>
                <div className="pcard-description">
                    <h1>{projectItems.title}</h1>
                    <p>{projectItems.description || "No description yet."}</p>
                    <div>
                        {projectItems.tags?.map((tag, index) => (
                            <span key={index} className='item-tag'>{tag}</span>
                        ))}
                    </div>
                    {btnName && <button className='project-btn'>{btnName}</button>}
                </div>
            </div>
        )}
    </>
  )
}

export default Card