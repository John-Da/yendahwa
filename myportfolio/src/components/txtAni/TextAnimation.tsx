import React, { useEffect, useRef } from "react";
import "../../index.css";
import "./TextAnimation.css";
import gsap from "gsap";
import SplitTextJS from "split-text-js";

function TextAnimation({
  texts = ["Web Developer", "2D/3D Animator", "Software Engineer", "UX/UI Designer"],
  color = "--color-accent",
  last = "--color-accent",
  bold = true,
  fontSize = 2,
  align = "center", 
  gap = 0, 
  t = 2.8,
}) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const elements = wrapperRef.current.querySelectorAll("p");
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

    elements.forEach((el) => {
      const split = new SplitTextJS(el);

      tl.from(split.chars, {
        opacity: 0,
        rotateX: -90,
        stagger: 0.02,
        duration: 0.6,
        y: 30,
      }, "<");

      tl.to(split.chars, {
        opacity: 0,
        rotateX: 90,
        stagger: 0.02,
        duration: 0.6,
        y: -30,
      }, `<${t}`);
    });
  }, []);

  return (
    <div
      className={`textani-wrapper ${align}`}
      style={{ 
        height: `${fontSize * 1.5}rem`
    }}>
      <div className="txt" ref={wrapperRef}>
        {texts.map((text, index) => (
          <p
            key={index}
            style={{
              fontSize: `${fontSize}rem`,
              fontWeight: bold ? "bold" : "normal",
              color: index === texts.length - 1 ? last : color,
            }}
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default TextAnimation;
