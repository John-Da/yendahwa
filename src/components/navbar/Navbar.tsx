import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../../index.css";
import './Navbar.css';
import { PATHTO, SOCIALLINKS } from "../../PathTO";
import { MENUICON, SOCIALICONS, SKILLICONS } from '../../assets/iconsvg/iconList';

/* ---------------- HOME NAVBAR ---------------- */
export function HomeNavBar({ author }: { author: string }) {
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
            <li><Link to={PATHTO.aboutpage.path}>About</Link></li>
            <li><Link to={PATHTO.projectpage.path}>Work</Link></li>
          </ul>
        </div>

        <div className="hnavbar_logo_container">
          <Link to={PATHTO.homepage.path} className="navbar_logo">@{author}</Link>
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
        <Link to={PATHTO.homepage.path} className="navbar_logo">@{author}</Link>
        <div className="menu_icon" onClick={handleMenuToggle}>
          <img src={click ? MENUICON['cross'] : MENUICON['menu']} alt="Menu" />
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div className={`mobile-menu ${click ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <div className="nav-menu">
            <Link to={PATHTO.homepage.path} onClick={handleCloseMenu}>Home</Link>
            <Link to={PATHTO.aboutpage.path} onClick={handleCloseMenu}>About</Link>
            <Link to={PATHTO.projectpage.path} onClick={handleCloseMenu}>Work</Link>
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

/* ---------------- PROJECT NAVBAR ---------------- */
function ProjectsNavBar({ author }: { author: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".designDropDown")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path === "/projects") {
      return location.pathname === "/projects" ? "active" : "";
    }
    return location.pathname.startsWith(path) ? "active" : "";
  };

  return (
    <nav className="projects-navbar">
      <div className="pnavbar_container">
        {/* Logo */}
        <Link to={PATHTO.homepage.path} className="pnavbar_logo">@{author}</Link>

        {/* Center Navigation */}
        <div className="projectNav">
          <Link to={`/projects`} className={`pnavbarC ${isActive(`/projects`)}`}>All Projects</Link>
          <Link to={`/projects/games`} className={`pnavbarC ${isActive(`/projects/games`)}`}>Games</Link>
          <Link to={`/projects/web`} className={`pnavbarC ${isActive(`/projects/web`)}`}>Web Developments</Link>

          {/* Design Dropdown */}
          <div className="designDropDown">
            <div className={`designTags ${isActive(`/projects/design`)}`} onClick={() => setIsOpen(!isOpen)}>
              <span>Design</span>
              <span className="arrow">{isOpen ? "▲" : "▼"}</span>
            </div>
            <div className={`dropdownContent ${isOpen ? "open" : ""}`}>
              <Link to={`/projects/design/uxui`} onClick={() => setIsOpen(false)} className={`pnavbarC ${isActive(`/projects/design/uxui`)}`}>UX/UI Design</Link>
              <Link to={`/projects/design/graphic`} onClick={() => setIsOpen(false)} className={`pnavbarC ${isActive(`/projects/design/graphic`)}`}>Graphic Design</Link>
              <Link to={`/projects/design/animation`} onClick={() => setIsOpen(false)} className={`pnavbarC ${isActive(`/projects/design/animation`)}`}>2D/3D Animation</Link>
            </div>
          </div>

          <Link to={`/projects/software`} className={`pnavbarC ${isActive(`/projects/software`)}`}>Software Developments</Link>
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

  const [profile, setProfile] = useState<{ author: string } | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}ProfileInfo.json`)
      .then(res => res.json())
      .then(data => {
        setTimeout(() => setProfile(data), 500);
      });
  }, []);

  if (!profile) return <div className="loading">Loading...</div>;

  const author = profile.author.toLowerCase();
  const getNavbarType = (pathname: string) => {
    if (pathname.startsWith(`/projects/games/play`)) return "none";
    if (pathname.startsWith(`/projects`)) return "projects";
    return "home";
  };

  const navbarFor = getNavbarType(path);

  switch (navbarFor) {
    case "home":
      return <HomeNavBar author={author} />;
    case "projects":
      return <ProjectsNavBar author={author} />;
    default:
      return null;
  }
}

export default NavBar;
