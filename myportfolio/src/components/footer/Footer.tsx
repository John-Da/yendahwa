import React from 'react'
import "../../index.css"
import "./Footer.css"
import { SOCIALICONS, SKILLICONS } from '../../assets/iconsvg/iconList';
import { Link } from 'react-router-dom';
import { PATHTO, SOCIALLINKS } from '../../PathTO';


function Footer({footerFor}) {
  return (
    <>
    {footerFor === "home" ? (
        <div className='footer-container'>
            <span>© 2025 | @dada's Portfolio |</span>
            <ul>
                <li><a target='_blank' href={SOCIALLINKS.gh}><img src={SKILLICONS['gh']} alt="GitHub" /></a></li>
                <li><a target='_blank' href={SOCIALLINKS.fb}><img src={SOCIALICONS['fb']} alt="Facebook" /></a></li>
                <li><a target='_blank' href={SOCIALLINKS.ig}><img src={SOCIALICONS['ig']} alt="Instagram" /></a></li>
                <li><a target='_blank' href={SOCIALLINKS.th}><img src={SOCIALICONS['at']} alt="Thread" /></a></li>
            </ul>
        </div>
    ):(
        <div className='footer-container'>
            <span>© 2025 | @dada's Portfolio |</span>
            <span>
                <ul>
                    <li><a target='_blank' href={SOCIALLINKS.gh}><img src={SKILLICONS['gh']} alt="GitHub" /></a></li>
                    <li><a target='_blank' href={SOCIALLINKS.fb}><img src={SOCIALICONS['fb']} alt="Facebook" /></a></li>
                    <li><a target='_blank' href={SOCIALLINKS.ig}><img src={SOCIALICONS['ig']} alt="Instagram" /></a></li>
                    <li><a target='_blank' href={SOCIALLINKS.th}><img src={SOCIALICONS['at']} alt="Thread" /></a></li>
                </ul>
            </span>
        </div>
    )}
    </>
  )
}

export default Footer