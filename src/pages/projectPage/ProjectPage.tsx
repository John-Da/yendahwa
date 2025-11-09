import { useEffect, useState } from "react";
import "../../index.css";
import "./ProjectPage.css";
import { useLocation, useParams } from "react-router-dom";
import ProjectPageSec from "../../components/sections/projectsec/ProjectSec";
import Footer from "../../components/footer/Footer";

// ---------------- Types ----------------
interface ProjectData {
  demoLink?: string;
  sourceCode?: string;
}

interface Project {
  id: string | number;
  title: string;
  description?: string;
  category: string;
  tags?: string[];
  image?: string;
  data?: ProjectData;
}
// --------------------------------------

function ProjectPage() {
  const [projectDetail, setProjectDetail] = useState<Project[] | null>(null);
  const { category, subcategory } = useParams();
  const location = useLocation();

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}ProjectDetails.json`)
      .then((res) => res.json())
      .then((data: Project[]) => {
        setTimeout(() => {
          setProjectDetail(data);
        }, 500);
      })
      .catch((err) => console.error(err));
  }, [location.pathname]);

  if (!projectDetail) return <div className="loading"></div>;

  const projectdetails = projectDetail.filter((p: Project) => {
    if (subcategory) return p.category.toLowerCase() === subcategory.toLowerCase();
    if (category === "design")
      return ["uxui", "graphic", "animation"].includes(p.category.toLowerCase());
    if (category) return p.category.toLowerCase() === category.toLowerCase();
    return true;
  });

  return (
    <>
      <ProjectPageSec sectionFor={category || "all"} projectdetails={projectdetails} />
      <Footer footerFor={""} />
    </>
  );
}

export default ProjectPage;
