import { useEffect, useState } from "react";
import "../../index.css";
import "./HomePage.css";
import HeroSection from '../../components/sections/herosec/HeroSection';
import ProjectPageSec from "../../components/sections/projectsec/ProjectSec";
import Footer from "../../components/footer/Footer";
import ContactSection from "../../components/sections/contactsec/ContactSection";
import { useLocation } from "react-router-dom";
import {type Profile, type Skill } from "../../types/profile";


// --------------------------------------

function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [project, setProject] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const baseUrl = import.meta.env.BASE_URL;

    Promise.all([
      fetch(`${baseUrl}ProfileInfo.json`)
        .then(res => res.ok ? res.json() : Promise.reject('Profile fetch failed')),
      fetch(`${baseUrl}ProjectDetails.json`)
        .then(res => res.ok ? res.json() : Promise.reject('Project fetch failed'))
    ])
    .then(([profileData, projectData]) => {
      setProfile(profileData);
      setProject(projectData);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching JSON data:", err);
      setLoading(false);
    });
  }, [location.pathname]);


  if (loading) return <div className="loading"></div>;

  return (
    <>
      {profile && (
        <>
          <HeroSection sectionFor={'home'} profileData={profile} />
          <HeroSection sectionFor={'about'} profileData={profile} />
        </>
      )}

      {project.length > 0 && <ProjectPageSec sectionFor={"home"} displayAll={false} projectdetails={project} />}
      
      {profile?.skills && (
        <div className="usedtoolicons">
          <h2>Tools & Software I Use</h2>
          <hr />
          <div className="iconsbox">
            {profile.skills.map((skill: Skill, index: number) => (
              <div className="skillusedicons" key={index}>
                <img src={skill.icon} alt={skill.name} />
              </div>
            ))}
          </div>
        </div>
      )}

      <ContactSection />
      <Footer footerFor={"home"} />
    </>
  );
}

export default HomePage;
