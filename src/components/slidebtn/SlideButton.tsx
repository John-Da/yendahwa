import React, { useEffect, useRef, useState } from "react";
import "../../index.css";
import "./SlideButton.css";
import { useNavigate } from "react-router-dom";
import { BACKGROUND_IMG } from "../../assets/bgImg/BackgroundImg";

function SliderButton({ path, btnName }) {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const startHandler = (e: TouchEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    btn.addEventListener("touchstart", startHandler, { passive: false });
    return () => btn.removeEventListener("touchstart", startHandler);
  }, []);

  const handleDragStart = () => {
    if (isCompleted) return;
    setIsDragging(true);
  };

  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !trackRef.current || !btnRef.current || isCompleted)
      return;

    const track = trackRef.current.getBoundingClientRect();
    const btn = btnRef.current.getBoundingClientRect();
    const text = trackRef.current.querySelector("p");

    const clientX =
      e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;

    let newLeft = clientX - track.left - btn.width / 2;
    newLeft = Math.max(0, Math.min(newLeft, track.width - btn.width));

    btnRef.current.style.left = `${newLeft}px`;

    if (text) {
      const progress = newLeft / (track.width - btn.width);
      text.style.opacity = `${1 - progress}`;
    }

    // ✅ Trigger finish animation if reached end
    if (newLeft >= track.width - btn.width - 5) {
      setIsCompleted(true);
      setIsDragging(false);

      // Snap to end & glow
      btnRef.current.style.left = `${track.width - btn.width - 4}px`;
      btnRef.current.classList.add("glow");

      // Small delay before navigating
      setTimeout(() => {
        navigate(path);
      }, 500);
    }
  };

  const handleDragEnd = () => {
    if (!trackRef.current || !btnRef.current || isCompleted) return;

    const text = trackRef.current.querySelector("p");

    // Snap back if not completed
    btnRef.current.style.transition = "left 0.3s ease";
    btnRef.current.style.left = "4px";
    if (text) text.style.opacity = "1";

    setTimeout(() => {
      if (btnRef.current) btnRef.current.style.transition = "";
    }, 300);

    setIsDragging(false);
  };

  return (
    <div
      className="slideTrack"
      ref={trackRef}
      onMouseMove={handleDrag as any}
      onMouseUp={handleDragEnd}
      onTouchMove={handleDrag as any}
      onTouchEnd={handleDragEnd}
    >
      <p className="slideText">{btnName}</p>
      <div
        className={`sliderBtn ${isCompleted ? "glow" : ""}`}
        ref={btnRef}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <img src={BACKGROUND_IMG.play} alt="Play" />
      </div>
    </div>
  );
}

export default SliderButton;
