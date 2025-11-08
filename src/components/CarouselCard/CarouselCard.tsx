import { useState, useEffect } from "react";
import "./CarouselCard.css";

export default function CarouselCard({ projectList, onSelectGame, currentProject }) {
  const games = projectList || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textColor, setTextColor] = useState("white");

  // Detect current project index
  useEffect(() => {
    if (currentProject) {
      const idx = games.findIndex((g) => g.id === currentProject.id);
      if (idx >= 0) setCurrentIndex(idx);
    }
  }, [currentProject, games]);

  // Detect image brightness and adjust text color
  useEffect(() => {
    if (!games[currentIndex]?.image) return;

    const img = new Image();
    img.src = games[currentIndex].image;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const { data } = ctx.getImageData(0, 0, img.width, img.height);
      let r, g, b, avg, colorSum = 0;

      for (let x = 0; x < data.length; x += 4 * 50) {
        // Skip some pixels for performance
        r = data[x];
        g = data[x + 1];
        b = data[x + 2];
        avg = (r + g + b) / 3;
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

  const getClassName = (index) => {
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
        {games.map((game, index) => (
          <div key={index} className={getClassName(index)}>
            <img src={game.image} alt={game.title} />
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
