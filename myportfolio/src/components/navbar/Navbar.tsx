import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../index.css"
import './Navbar.css';

import githubIcon from '../../assets/iconsvg/github.svg';
import facebookIcon from '../../assets/iconsvg/facebook.svg';
import instagramIcon from '../../assets/iconsvg/instagram.svg';
import threadIcon from '../../assets/iconsvg/thread.svg';
import menuIcon from '../../assets/iconsvg/menu.svg';
import crossIcon from '../../assets/iconsvg/cross.svg';

function NavBar() {
  const [click, setClick] = useState(false);

  const handleMenuToggle = () => setClick(!click);
  const handleCloseMenu = () => setClick(false);

  return (
    <nav className="navbar">
      {/* DESKTOP NAVBAR */}
      <div className="navbar_container">
        <div className="navbarL">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About Me</Link></li>
            <li><Link to="/project">Projects</Link></li>
          </ul>
        </div>

        <div className="navbar_logo_container">
          <Link to="/" className="navbar_logo">@DADA's</Link>
        </div>

        <div className="navbarR">
          <ul>
            <li><Link to="/github"><img src={githubIcon} alt="GitHub" /></Link></li>
            <li><Link to="/facebook"><img src={facebookIcon} alt="Facebook" /></Link></li>
            <li><Link to="/instagram"><img src={instagramIcon} alt="Instagram" /></Link></li>
            <li><Link to="/thread"><img src={threadIcon} alt="Thread" /></Link></li>
          </ul>
        </div>
      </div>

      {/* MOBILE NAVBAR TOP BAR */}
      <div className='nav-mobile'>
        <Link to="/" className="navbar_logo">@DADA's</Link>
        <div className="menu_icon" onClick={handleMenuToggle}>
          <img src={click ? crossIcon : menuIcon} alt="Menu" />
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div className={`mobile-menu ${click ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <div className="nav-menu">
            <Link to="/home" onClick={handleCloseMenu}>Home</Link>
            <Link to="/about" onClick={handleCloseMenu}>About Me</Link>
            <Link to="/project" onClick={handleCloseMenu}>Projects</Link>
          </div>

          <div className="social-icons">
            <Link to="/github" onClick={handleCloseMenu}><img src={githubIcon} alt="GitHub" /></Link>
            <Link to="/facebook" onClick={handleCloseMenu}><img src={facebookIcon} alt="Facebook" /></Link>
            <Link to="/instagram" onClick={handleCloseMenu}><img src={instagramIcon} alt="Instagram" /></Link>
            <Link to="/thread" onClick={handleCloseMenu}><img src={threadIcon} alt="Thread" /></Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
