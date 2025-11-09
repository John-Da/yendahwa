import { useEffect, useState, useRef } from 'react';
import "../../../index.css";
import "./ProjectSec.css";
import { Button } from '../../button/Button';
import Card from '../../card/Card';
import Skillsicons from '../../skillIcons/Skillsicons';
import { MENUICON } from '../../../assets/iconsvg/iconList';
import { PATHTO } from '../../../PathTO';
import { type Project } from "../../../types/project";

interface ProjectData {
  id: number;
  title: string;
  description?: string;
  category?: string;
  image?: string;
  tags?: string[];
  data: {
    sourceCode: string;
    demoLink: string;
  };
}

interface ProjectPageSecProps {
  sectionFor: string;
  projectdetails: Project[];
  displayAll?: boolean | 'evenly' | 'oddly';
  itemStart?: number;
  itemEnd?: number;
}

// --- Helper to normalize Project to ProjectData ---
const normalizeProject = (p: Project): ProjectData => ({
  ...p,
  id: Number(p.id),
  data: {
    demoLink: p.data?.demoLink || "",
    sourceCode: p.data?.sourceCode || "",
  },
});

function ProjectPageSec({
  sectionFor,
  projectdetails,
  displayAll = false,
  itemStart = 0,
  itemEnd = 3,
}: ProjectPageSecProps) {
  let projectsToShow = projectdetails || [];

  if (displayAll === 'evenly') {
    projectsToShow = projectdetails.filter((_, i) => i % 2 === 0);
  } else if (displayAll === 'oddly') {
    projectsToShow = projectdetails.filter((_, i) => i % 2 !== 0);
  } else if (displayAll === true) {
    projectsToShow = projectdetails;
  } else {
    const start = Math.max(0, itemStart - 1);
    const end = Math.min(projectsToShow.length, itemEnd);
    projectsToShow = projectsToShow.slice(start, end);
  }

  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [activeProject, setActiveProject] = useState<ProjectData | null>(
    projectsToShow[0] ? normalizeProject(projectsToShow[0]) : null
  );
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [fade, setFade] = useState(false);
  const firstLoad = useRef(true);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  const handleCloseDetail = () => setSelectedProject(null);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    setFade(true);
    const timeout = setTimeout(() => setFade(false), 300);
    return () => clearTimeout(timeout);
  }, [activeProject]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = entry.target.getAttribute("data-id");
            const project = projectsToShow.find(
              (p) => Number(p.id) === Number(projectId)
            );
            if (project && activeProject && Number(project.id) !== activeProject.id) {
              setFade(true);
              setTimeout(() => {
                setActiveProject(normalizeProject(project));
                setFade(false);
              }, 300);
            }
          }
        });
      },
      { threshold: 0.9 }
    );

    cardRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, [projectsToShow, activeProject]);

  return (
    <>
      {sectionFor === "home" ? (
        <div className="project-section" id="projects">
          <div className="project-header">
            <h1>
              <span className="project-title">Featured Projects</span>
            </h1>
            <span>
              <Skillsicons />
            </span>
          </div>
          <hr />
          <div className="project-content">
            <div className="projectScrollItems">
              {projectsToShow.map((project, index) => (
                <div
                  key={project.id}
                  data-id={project.id}
                  ref={(el) => { cardRefs.current[index] = el; }}
                >
                  <Card btnName="View" projectItems={project} cardFor="homepj" />
                </div>
              ))}
            </div>

            <div className={`projectFixedItemInfo ${fade ? "fade" : ""}`}>
              {activeProject ? (
                <div>
                  <h1>{activeProject.title}</h1>
                  <p>{activeProject.description}</p>
                  <div>
                    {activeProject.tags?.map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ) : (
                <p>Scroll to see project details</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="project-container">
          {projectdetails && projectdetails.length > 0 ? (
            <div className="project-grid">
              {projectdetails.map((item, index) => (
                <Card
                  key={index}
                  projectItems={item}
                  onClick={() => setSelectedProject(normalizeProject(item))}
                  cardFor="project"
                />
              ))}
            </div>
          ) : (
            <div className="no-projects">No Projects yet.</div>
          )}
        </div>
      )}

      {selectedProject && (
        <div className="projectDetailView-container" onClick={handleCloseDetail}>
          <div className="detail-content" onClick={(e) => e.stopPropagation()}>
            <div className="detailsView-header">
              <h2>{selectedProject.title}</h2>
              <button className="close-box" onClick={handleCloseDetail}>
                <img src={MENUICON["cross"]} alt="close" />
              </button>
            </div>

            <div className="projectImage">
              {selectedProject.image ? (
                <img src={selectedProject.image} alt={selectedProject.title} />
              ) : (
                <p>Empty Image</p>
              )}
            </div>

            <div className="detailDescription">
              <p>{selectedProject.description || "No description available."}</p>
              {selectedProject.category === "games" ? (
                <div className="demonBtn">
                  <Button
                    path={selectedProject.data.sourceCode}
                    onClick={handleCloseDetail}
                    children="GitHub"
                    btnType="btn"
                    btnSize="btn--medium"
                    btnStyle="btn--primary"
                  />
                  <Button
                    path={`${PATHTO.gamemode.path}?game=${encodeURIComponent(selectedProject.title)}&id=${selectedProject.id}`}
                    onClick={handleCloseDetail}
                    children="Play"
                    btnType="gBtn"
                    btnSize="gBtn--medium"
                    btnStyle="gBtn--primary"
                  />
                </div>
              ) : (
                <div className="demonBtn">
                  <Button
                    path={selectedProject.data.sourceCode}
                    onClick={handleCloseDetail}
                    children="GitHub"
                    btnType="btn"
                    btnSize="btn--medium"
                    btnStyle="btn--primary"
                  />
                  <Button
                    path={selectedProject.data.demoLink}
                    onClick={handleCloseDetail}
                    children="Live Demo"
                    btnType="btn"
                    btnSize="btn--medium"
                    btnStyle="btn--outline"
                  />
                </div>
              )}
            </div>

            <div className="detailsContainer">
              <div className="detailsGrid">
                <div className="detailsItem">
                  <p className="label">Category:</p>
                  <span className="value">{selectedProject.category || "N/A"}</span>
                </div>
                <div className="detailsItem">
                  <p className="label">Tags:</p>
                  <div className="tags">
                    {selectedProject.tags?.length
                      ? selectedProject.tags.map((tag, i) => (
                          <span key={i} className="tag">{tag}</span>
                        ))
                      : <span className="no-tags">No tags</span>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectPageSec;
