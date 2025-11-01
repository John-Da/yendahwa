import React from 'react'
import "../../index.css"
import "./Footer.css"
import { SOCIALICONS, SKILLICONS } from '../../assets/iconsvg/iconList';
import { Link } from 'react-router-dom';
import { PATHTO } from '../../PathTO';


function Footer({footerFor}) {
  return (
    <>
    {footerFor === "home" ? (
        <div className='footer-container'>
            <span>© 2025 | @dada's Portfolio |</span>
            <ul>
                <li><Link to={PATHTO["gh"]}><img src={SKILLICONS['gh']} alt="GitHub" /></Link></li>
                <li><Link to={PATHTO["fb"]}><img src={SOCIALICONS['fb']} alt="Facebook" /></Link></li>
                <li><Link to={PATHTO["ig"]}><img src={SOCIALICONS['ig']} alt="Instagram" /></Link></li>
                <li><Link to={PATHTO["at"]}><img src={SOCIALICONS['at']} alt="Thread" /></Link></li>
            </ul>
        </div>
    ):(
        <div className='footer-container'>
            <span>© 2025 | @dada's Portfolio |</span>
            <span>
                <ul>
                    <li><Link to={PATHTO["gh"]}><img src={SKILLICONS['gh']} alt="GitHub" /></Link></li>
                    <li><Link to={PATHTO["fb"]}><img src={SOCIALICONS['fb']} alt="Facebook" /></Link></li>
                    <li><Link to={PATHTO["ig"]}><img src={SOCIALICONS['ig']} alt="Instagram" /></Link></li>
                    <li><Link to={PATHTO["at"]}><img src={SOCIALICONS['at']} alt="Thread" /></Link></li>
                </ul>
            </span>
        </div>
    )}
    </>
  )
}

export default Footer