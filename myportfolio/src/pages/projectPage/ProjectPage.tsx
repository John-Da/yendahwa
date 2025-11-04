import React, { useEffect, useState } from "react";
import "../../index.css";
import "./ProjectPage.css";
import { useParams } from "react-router-dom";
import ProjectPageSec from "../../components/sections/projectsec/ProjectSec";
import Footer from "../../components/footer/Footer";

function ProjectPage() {
  const [projectDetail, setProjectDetail] = useState(null);
  const { category, subcategory } = useParams();

  useEffect(() => {
    fetch('/ProjectDetails.json')
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          setProjectDetail(data);
        }, 500);
      });
  }, []);

  useEffect(() => {
    console.log("ProjectPage mounted", category, subcategory);
  }, [category, subcategory]);


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
      <Footer />
    </>
  );
}

export default ProjectPage;
