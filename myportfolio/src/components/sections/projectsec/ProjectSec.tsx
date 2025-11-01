import React, { useEffect, useState } from 'react';
import "../../../index.css";
import "./ProjectSec.css";
import { Button } from '../../button/Button';
import Card from '../../card/Card';
import Skillsicons from '../../skillIcons/Skillsicons';
import { MENUICON } from '../../../assets/iconsvg/iconList';

function ProjectPageSec({ sectionFor, navRoute, projectdetails, displayAll = 'all', itemStart = 0, itemEnd = 3 }) {
  // Filter projects based on displayAll
  let projectsToShow = projectdetails || [];
  if (displayAll === 'evenly') projectsToShow = projectdetails.filter((_, i) => i % 2 === 0);
  if (displayAll === 'oddly') projectsToShow = projectdetails.filter((_, i) => i % 2 !== 0);

  const start = Math.max(0, itemStart - 1);
  const end = Math.min(projectsToShow.length, itemEnd);
  projectsToShow = projectsToShow.slice(start, end);

  // State for modal
  const [isClicked, setIsClicked] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Scroll lock when modal open
  useEffect(() => {
    document.body.style.overflow = isClicked ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isClicked]);

  return (
    <>
      {sectionFor === "home" ? (
        <div className='project-section'>
          <div className="project-header">
            <h1><span className="project-title">Featured Projects</span></h1>
            <Skillsicons />
          </div>
          <hr />
          <div className="project-content">
            <div className="project-grid">
              {projectsToShow.map((project) => (
                <Card
                  key={project.id}
                  btnName="see more"
                  projectItems={project}
                  cardFor="homepj"
                  onClick={() => {
                    setSelectedProject(project);
                    setIsClicked(true);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Modal Overlay */}
          {isClicked && selectedProject && (
            <div className="projectDetailView-container" onClick={() => setIsClicked(false)}>
              <div className="detail-content" onClick={(e) => e.stopPropagation()}>
                <div className="detailsView-header">
                  <h2>{selectedProject.title}</h2>
                  <button className="close-box" onClick={() => setIsClicked(false)}>
                    <img src={MENUICON['cross']} alt="close" />
                  </button>
                </div>
                <div className="projectImage">
                  {selectedProject.image ? (
                    <img src={selectedProject.image} alt={selectedProject.title} />
                  ) : <p>Empty Image</p>}
                </div>
                <div className="detailDescription">
                  <p>{selectedProject.description || 'No description available.'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className='project-container'>
          {projectdetails && projectdetails.length > 0 ? (
            <div className="project-grid">
              {projectdetails.map((item, index) => (
                <Card key={index} projectItems={item} navRoute={navRoute} />
              ))}
            </div>
          ) : <div className='no-projects'>No Projects yet.</div>}
        </div>
      )}
    </>
  );
}

export default ProjectPageSec;
