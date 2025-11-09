import { useState, useEffect } from "react";
import "./CarouselCard.css";
import { type Project } from "../../types/project";


// Define the shape of a single project/game item

export interface CarouselCardProps {
  projectList: Project[];
  currentProject: Project;
  onSelectGame: (game: Project) => void;
}

export default function CarouselCard({
  projectList,
  onSelectGame,
  currentProject,
}: CarouselCardProps) {
  const games = projectList || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textColor, setTextColor] = useState("white");

  // Detect current project index
  useEffect(() => {
    if (currentProject) {
      const idx = games.findIndex((g: Project) => g.id === currentProject.id);
      if (idx >= 0) setCurrentIndex(idx);
    }
  }, [currentProject, games]);

  // Detect image brightness and adjust text color
  useEffect(() => {
    if (!games[currentIndex]?.image) return;

    const img = new Image();
    img.src = games[currentIndex].image as string;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, img.width, img.height);
      const { data } = ctx.getImageData(0, 0, img.width, img.height);
      let colorSum = 0;

      for (let x = 0; x < data.length; x += 4 * 50) {
        const r = data[x];
        const g = data[x + 1];
        const b = data[x + 2];
        const avg = (r + g + b) / 3;
        colorSum += avg;
      }

      const brightness = colorSum / (data.length / (4 * 50));
      setTextColor(brightness > 128 ? "black" : "white");
    };
  }, [currentIndex, games]);

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + games.length) % games.length;
    setCurrentIndex(newIndex);
    onSelectGame(games[newIndex]);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % games.length;
    setCurrentIndex(newIndex);
    onSelectGame(games[newIndex]);
  };

  const getClassName = (index: number): string => {
    const total = games.length;
    const diff = (index - currentIndex + total) % total;
    if (diff === 0) return "gameItem active";
    if (diff === 1) return "gameItem next";
    if (diff === total - 1) return "gameItem prev";
    if (diff === 2) return "gameItem next2";
    if (diff === total - 2) return "gameItem prev2";
    return "gameItem hidden";
  };

  return (
    <div className="gameListDisplay">
      <div className="gameCount" style={{ color: textColor }}>
        <p>
          {currentIndex + 1}/{games.length}
        </p>
      </div>

      <div className="imgBox carouselContainer">
        {games.map((game: Project, index: number) => (
          <div key={index} className={getClassName(index)}>
            {game.image && game.image.trim() !== "" ? (
              <img src={game.image} alt={game.title} />
            ) : (
              <p>Empty Image</p>
            )}
          </div>
        ))}
      </div>

      <div className="btnBox">
        <button onClick={handlePrev}>◀︎</button>
        <p>{games[currentIndex]?.title}</p>
        <button onClick={handleNext}>▶︎</button>
      </div>
    </div>
  );
}
