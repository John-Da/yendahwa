import React from "react";
import "../../index.css";
import "./ProjectPage.css";
import { useLocation, useParams } from "react-router-dom";
import ProjectPageSec from "../../components/sections/projectsec/ProjectSec";
import Footer from "../../components/footer/Footer";
import PROJECTDETAILS from "../../ProjectDetails.json";

function ProjectPage() {
  const { category, subcategory } = useParams();

  const projectdetails = PROJECTDETAILS.filter(p => {
    if (subcategory) {
      return p.category.toLowerCase() === subcategory.toLowerCase();
    }
    if (category === "design") {
      return ["uxui", "graphic", "animation"].includes(p.category.toLowerCase());
    }
    if (category) {
      return p.category.toLowerCase() === category.toLowerCase();
    }
    return true;
  });



  return (
    <>
      <ProjectPageSec 
        projectdetails={projectdetails} 
        navRoute={
          subcategory ? `/projects/${category}/${subcategory}`:
          category ? `/projects/${category}` : `/projects`}
      />
      <Footer />
    </>
  );
}

export default ProjectPage;
