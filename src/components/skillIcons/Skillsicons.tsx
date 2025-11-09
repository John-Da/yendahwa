import "../../index.css"
import './Skillsicons.css'
import { SKILLICONS } from '../../assets/iconsvg/iconList'

function Skillsicons({ 
  timer = 20, 
  timeFunc = "linear", 
  iteration = "infinite", 
  startFrom = "right"
}) {
  const keys = Object.keys(SKILLICONS) as (keyof typeof SKILLICONS)[];

  return (
    <div className={`skillIcon-wrapper ${startFrom}`}>
      {keys.map((key, index) => {
        const delay = ((timer / keys.length) * (keys.length - index)) * -1;
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
