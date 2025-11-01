import React, { useEffect, useState } from 'react'
import "../../index.css"
import "./Card.css"
import { Button } from '../button/Button'
import { Link } from 'react-router-dom'
import { PATHTO } from '../../PathTO'
import { MENUICON } from '../../assets/iconsvg/iconList'

function Card({cardFor, btnName, projectItems, navRoute, onClick}) {
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isClicked ? 'hidden' : 'auto';
        return () => (document.body.style.overflow = 'auto');
    }, [isClicked]);


    useEffect(() => {
    const handleClickOutside = (e) => {
        if (
            isClicked &&
            !e.target.closest('.detail-content') &&
            e.target.closest('.projectDetailView-container')
        ) {
        setIsClicked(false);
        }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
    }, [isClicked]);

  return (
    <>
    {cardFor === "homepj" ? (
        <div className="hcard-container">
            <div className="img-box">
                {projectItems.image ? (
                <img src={projectItems.image} alt={projectItems.title} />
                ) : <p>Empty Image</p>}
                <h2>{projectItems.title}</h2>
            </div>
            <div className="hcard-description">
                <h1>{projectItems.title}</h1>
                <p>{projectItems.description || "No description yet."}</p>
                {btnName && (
                <Button
                    children={btnName}
                    btnType="btn"
                    btnStyle="btn--outline"
                    onClick={onClick}
                />
                )}
            </div>
        </div>
    ):(
    <>
        <div className="pcard-container" onClick={() => setIsClicked(true)}>
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

        {isClicked && (
            <div
                className="projectDetailView-container"
                onClick={() => setIsClicked(false)}
            >
                <div
                className="detail-content"
                onClick={(e) => e.stopPropagation()}
                >
                <div className="detailsView-header">
                    <h2>{projectItems.title}</h2>
                    <button className="close-box" onClick={() => setIsClicked(false)}>
                    <img src={MENUICON['cross']} alt="close" />
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
                    <p>{projectItems.description || 'No description available.'}</p>
                </div>
                </div>
            </div>
        )}
    </>
    )}
    </>
  )
}

export default Card