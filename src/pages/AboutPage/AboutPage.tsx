import { useLocation } from "react-router-dom";
import "../../index.css";
import "./AboutPage.css";


function AboutPage() {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const lastPart = pathParts[pathParts.length - 1];

  return (
    <div className="aboutpage-container">
      <h1>{lastPart}</h1>
    </div>
  );
}

export default AboutPage;
