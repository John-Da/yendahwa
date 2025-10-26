import React, { useState } from 'react';
import "../../../index.css";
import "./HeroSection.css";
import { Button } from '../../button/Button';

function HeroSection({ sectionFor }) {
  return (
    <div className="hero-container">
      {sectionFor === "home" ? (
        <div className="home-hero">
          <h1>Hi!</h1>
          <h2>UI/UX Designer | Web Developer | 2D/3D Animator</h2>
          <p>This is Me</p>
          <Button children="Contact" path="/" className="btn" btnStyle="btn--outline" btnSize="btn--large" />
        </div>
      ) : (
        <div className="about-hero">
          <h1>About Me</h1>
          <p>UI/UX Designer | Web Developer | 2D/3D Animator</p>
        </div>
      )}
    </div>
  );
}


export default HeroSection;
