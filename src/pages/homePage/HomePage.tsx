import { useEffect, useState } from "react";
import "../../index.css";
import "./HomePage.css"
import HeroSection from '../../components/sections/herosec/HeroSection';
import ProjectPageSec from "../../components/sections/projectsec/ProjectSec";
import Footer from "../../components/footer/Footer";
import ContactSection from "../../components/sections/contactsec/ContactSection";

function HomePage() {
  const [profile, setProfile] = useState(null);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/ProfileInfo.json').then(res => res.ok ? res.json() : Promise.reject('Profile fetch failed')),
      fetch('/ProjectDetails.json').then(res => res.ok ? res.json() : Promise.reject('Project fetch failed'))
    ])
      .then(([profileData, projectData]) => {
        setTimeout(() => {
          setProfile(profileData);
          setProject(projectData);
          setLoading(false);
        }, 500);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading"></div>;

  return (
    <>
      {profile && (
        <>
          <HeroSection 
            sectionFor={'home'} 
            profileData={profile}
          />
          <HeroSection 
            sectionFor={'about'}
            profileData={profile}
          />
        </>
      )}
      {project && <ProjectPageSec sectionFor={"home"} displayAll={false} projectdetails={project} />}
      
      {profile?.skills && (
        <div className="usedtoolicons">
          <h2>Tools & Software I Use</h2>
          <hr />
          <div className="iconsbox">
            {profile.skills.map((skill, index) => (
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
