import React, { useState } from 'react';
import "../../../index.css";
import "./HeroSection.css";
import { Button } from '../../button/Button';
import TextAnimation from '../../txtAni/TextAnimation';
import HightLights from '../aboutsec/HightLights';

function HeroSection({ sectionFor, profileData }) {

  return (
    <>
      {sectionFor === "home" ? (
        <div className="home-hero" id='home'>
          <p className='herotxt'>{profileData.heroText}</p>
          <div className="textbox">
            <h1>Hi! I'm <span color='white'>{profileData.author}</span></h1>
            <TextAnimation 
              fontSize={1.3} 
              color='var(--color-primary)'
              last='var(--color-primary'
              align='right'
            />
          </div>
          <a href="#contact" className='hhero-btn'>Contact</a>
        </div>
      ) : (

        // box1 highlights (overlay)
        // box2 let's connect 
        // box3 game mode 
        // box4 software & tools 
        // box5 recent project (which scroll to featured projects)

        <div className="quick-about">
          <div className="quick-about-grid">
            <div className="box1">
              HightLights
            </div>
            <div className="box2">
              Let's connect
            </div>
            <div className="box3">
              <div className="gamemodebox">
                Game Mode
              </div>
              <div className="gamemodebtnbox">
                Game Mode On
              </div>
            </div>
            <div className="box4">
              Software & Tools
            </div>
            <div className="box5">
              Recent Project
            </div>
          </div>
        </div>
      )}
    </>
  );
}


export default HeroSection;
