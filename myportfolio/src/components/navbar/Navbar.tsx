import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../../index.css";
import './Navbar.css';
import { PATHTO, SOCIALLINKS } from "../../PathTO";
import { MENUICON, SOCIALICONS, SKILLICONS } from '../../assets/iconsvg/iconList';

/* ---------------- HOME NAVBAR ---------------- */
export function HomeNavBar() {
  const [click, setClick] = useState(false);
  const handleMenuToggle = () => setClick(!click);
  const handleCloseMenu = () => setClick(false);

  return (
    <nav className="home-navbar">
      {/* DESKTOP NAVBAR */}
      <div className="hnavbar_container">
        <div className="hnavbarL">
          <ul>
            <li><Link to={PATHTO.homepage.path}>Home</Link></li>
            <li><Link to={PATHTO.aboutpage.path}>About Me</Link></li>
            <li><Link to={PATHTO.projectpage.path}>Projects</Link></li>
          </ul>
        </div>

        <div className="hnavbar_logo_container">
          <Link to={PATHTO.homepage.path} className="navbar_logo">@dada's</Link>
        </div>

        <div className="hnavbarR">
          <ul>
            <li><a target='_blank' href={SOCIALLINKS.gh}><img src={SKILLICONS['gh']} alt="GitHub" /></a></li>
            <li><a target='_blank' href={SOCIALLINKS.fb}><img src={SOCIALICONS['fb']} alt="Facebook" /></a></li>
            <li><a target='_blank' href={SOCIALLINKS.ig}><img src={SOCIALICONS['ig']} alt="Instagram" /></a></li>
            <li><a target='_blank' href={SOCIALLINKS.th}><img src={SOCIALICONS['at']} alt="Thread" /></a></li>
          </ul>
        </div>
      </div>

      {/* MOBILE NAVBAR */}
      <div className='nav-mobile'>
        <Link to={PATHTO.homepage.path} className="navbar_logo">@dada's</Link>
        <div className="menu_icon" onClick={handleMenuToggle}>
          <img src={click ? MENUICON['cross'] : MENUICON['menu']} alt="Menu" />
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div className={`mobile-menu ${click ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <div className="nav-menu">
            <Link to={PATHTO.homepage.path} onClick={handleCloseMenu}>Home</Link>
            <Link to={PATHTO.aboutpage.path} onClick={handleCloseMenu}>About Me</Link>
            <Link to={PATHTO.projectpage.path} onClick={handleCloseMenu}>Projects</Link>
          </div>

          <div className="social-icons">
            <a target='_blank' href={SOCIALLINKS.gh} onClick={handleCloseMenu}><img src={SKILLICONS['gh']} alt="GitHub" /></a>
            <a target='_blank' href={SOCIALLINKS.fb} onClick={handleCloseMenu}><img src={SOCIALICONS['fb']} alt="Facebook" /></a>
            <a target='_blank' href={SOCIALLINKS.ig} onClick={handleCloseMenu}><img src={SOCIALICONS['ig']} alt="Instagram" /></a>
            <a target='_blank' href={SOCIALLINKS.th} onClick={handleCloseMenu}><img src={SOCIALICONS['at']} alt="Thread" /></a>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ---------------- ABOUT NAVBAR ---------------- */
function AboutNavBar() {
  return (
    <nav className="about-navbar">
      <div className="anavbar_container">
        <Link to={PATHTO.homepage.path} className="navbar_logo">@dada's</Link>
        <div className="anavbar_about_links">
          <Link to={PATHTO.projectpage.path}>My Works</Link>
          <Link to={PATHTO.homepage.path}>Back Home</Link>
        </div>
      </div>
    </nav>
  );
}

/* ---------------- PROJECT NAVBAR ---------------- */
function ProjectsNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".designDropDown")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  const isActive = (path) => {
    if (path === "/projects") {
      return location.pathname === "/projects" ? "active" : "";
    }
    return location.pathname.startsWith(path) ? "active" : "";
  };

  return (
    <nav className="projects-navbar">
      <div className="pnavbar_container">
        {/* Logo */}
        <Link to="/" className="pnavbar_logo">@Projects</Link>

        {/* Center Navigation */}
        <div className="projectNav">
          <Link to="/projects" className={`pnavbarC ${isActive("/projects")}`}>All Projects</Link>
          <Link to="/projects/games" className={`pnavbarC ${isActive("/projects/games")}`}>Games</Link>
          <Link to="/projects/web" className={`pnavbarC ${isActive("/projects/web")}`}>Web Developments</Link>

          {/* Design Dropdown */}
          <div className="designDropDown">
            <div className={`designTags ${isActive("/projects/design")}`} onClick={() => setIsOpen(!isOpen)}>
              <span>Design</span>
              <span className="arrow">{isOpen ? "▲" : "▼"}</span>
            </div>
            <div className={`dropdownContent ${isOpen ? "open" : ""}`}>
              <Link
                to="/projects/design/uxui"
                onClick={() => setIsOpen(false)}
                className={`pnavbarC ${isActive("/projects/design/uxui")}`}
              >
                UX/UI Design
              </Link>
              <Link
                to="/projects/design/graphic"
                onClick={() => setIsOpen(false)}
                className={`pnavbarC ${isActive("/projects/design/graphic")}`}
              >
                Graphic Design
              </Link>
              <Link
                to="/projects/design/animation"
                onClick={() => setIsOpen(false)}
                className={`pnavbarC ${isActive("/projects/design/animation")}`}
              >
                2D/3D Animation
              </Link>
            </div>
          </div>

          <Link to="/projects/software" className={`pnavbarC ${isActive("/projects/software")}`}>Software Developments</Link>
        </div>

        {/* Right Side Social */}
        <div className="pnavbarR">
          <a href={SOCIALLINKS.gh} target="_blank" rel="noopener noreferrer">
            <img src={SKILLICONS["gh"]} alt="GitHub" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ---------------- MAIN NAV WRAPPER ---------------- */
function NavBar() {
  const location = useLocation();
  const path = location.pathname;

  let navbarFor = "home";
  if (path.includes("about")) navbarFor = "about";
  else if (path.includes("project")) navbarFor = "projects";

  switch (navbarFor) {
    case "about":
      return <AboutNavBar />;
    case "projects":
      return <ProjectsNavBar />;
    default:
      return <HomeNavBar />;
  }
}

export default NavBar;
