import React from 'react'
import "../../index.css"
import './Skillsicons.css'
import { SKILLICONS } from '../../assets/iconsvg/iconList'

function Skillsicons({ timer = 20, timeFunc = "linear", iteration = "infinite" }) {
  const keys = Object.keys(SKILLICONS);
  const total = keys.length;

  return (
    <div className="skillIcon-wrapper">
      {keys.map((key, index) => {
        const delay = ((timer / total) * (total - index)) * -1;

        return (
          <div
            className="item"
            key={index}
            style={{
              animationDelay: `${delay}s`,
              animationDuration: `${timer}s`,
              animationIterationCount: iteration,
              animationTimingFunction: timeFunc,
            }}
          >
            <img src={SKILLICONS[key]} alt={`${key} icon`} />
          </div>
        );
      })}
    </div>
  );
}

export default Skillsicons;
