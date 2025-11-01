import React, { useState } from 'react';
import "../../../index.css";
import "./HeroSection.css";
import { Button } from '../../button/Button';
import TextAnimation from '../../txtAni/TextAnimation';

function HeroSection({ sectionFor, author, heroDescription, aboutDescription, aboutImage }) {
  return (
    <>
      {sectionFor === "home" ? (
        <div className="home-hero">
          <h1>Hi! I'm <span color='white'>{author}</span></h1>
          <TextAnimation 
            fontSize={4} 
            color='var(--color-primary)'
            last='var(--color-primary'
          />
          <p>{heroDescription}</p>
          <Button children="Contact" path="/" btnType="btn" btnStyle="btn--outline" btnSize="btn--large" />
        </div>
      ) : (
        <div className="about-hero">
          <div className="about-header">
            <h1>
              <span className="about-title">About Me</span>
              <TextAnimation fontSize={1.3}
                color="var(--color-accent)"
                last="var(--color-accent)"
                align="right"
                gap={1}
                t={5}
              />
            </h1>
            <hr />
          </div>

          <div className="about-content">
            <div className="about-left">
              <h1>Hi there!</h1>
              <p>{aboutDescription}</p>
              <div className="btn-box">
                <Button children="Get To Know More" path="/" btnType="btn" btnStyle="btn--primary" btnSize={"btn--medium"} />
                <Button children="Download Resume" path="/" btnType="btn" btnStyle="btn--outline" btnSize={"btn--medium"} />
              </div>
            </div>
            <div className="about-right">
              <div className="img-box box1">
                <img src={aboutImage} alt="Profile Picture" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


export default HeroSection;
