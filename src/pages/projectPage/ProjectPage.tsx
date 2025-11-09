import { useEffect, useState } from "react";
import "../../index.css";
import "./ProjectPage.css";
import { useLocation, useParams } from "react-router-dom";
import ProjectPageSec from "../../components/sections/projectsec/ProjectSec";
import Footer from "../../components/footer/Footer";

function ProjectPage() {
  const [projectDetail, setProjectDetail] = useState(null);
  const { category, subcategory } = useParams();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    fetch('/ProjectDetails.json')
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          setProjectDetail(data);
          setLoading(false);
        }, 500);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [location.pathname]);



  if (!projectDetail) return <div className="loading"></div>;

  const projectdetails = projectDetail.filter(p => {
    if (subcategory) return p.category.toLowerCase() === subcategory.toLowerCase();
    if (category === "design") return ["uxui", "graphic", "animation"].includes(p.category.toLowerCase());
    if (category) return p.category.toLowerCase() === category.toLowerCase();
    return true;
  });

  return (
    <>
      <ProjectPageSec projectdetails={projectdetails} />
      <Footer footerFor={""}/>
    </>
  );
}

export default ProjectPage;
