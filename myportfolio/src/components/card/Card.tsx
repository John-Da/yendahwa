import React, { useEffect, useState } from 'react'
import "../../index.css"
import "./Card.css"
import { Button } from '../button/Button'
import { Link } from 'react-router-dom'
import { PATHTO } from '../../PathTO'
import { MENUICON } from '../../assets/iconsvg/iconList'

function Card({cardFor, btnName, projectItems, onClick}) {

  return (
    <>
    {cardFor === "homepj" ? (
        <div className="hcard-container" onClick={onClick}>
            <div className="img-box">
                {projectItems.image ? (
                <Link
                    to={`/projects/${projectItems.category}`}
                    className="card-link"
                >
                    <img src={projectItems.image} alt={projectItems.title} />
                    <span>↗</span>
                </Link>
                ) : (
                <p>Empty Image</p>
                )}
                <h2>{projectItems.title}</h2>
            </div>
        </div>
    ):(
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