import { useParams } from "react-router-dom";
import "../../index.css";
import "./Hightlights.css";

function Hightlights() {
  const { name } = useParams();

  return (
    <div className="highlight-container">
      <h1>{name}</h1>
    </div>
  );
}

export default Hightlights;
