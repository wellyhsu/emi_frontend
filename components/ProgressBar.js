import React, { useEffect } from 'react';

const ProgressBar = () => {
  useEffect(() => {
    const range = document.querySelector("#range");
    const circle = document.querySelectorAll("circle")[1];
    
    if (range && circle) {
      const percent = 30 / 100;
      const perimeter = Math.PI * 2 * 170;
      circle.setAttribute('stroke-dasharray', `${perimeter * percent} ${perimeter * (1 - percent)}`);
    }
  }, []);

  return (
    <div>
      <style>
        {`
          circle {
            -webkit-transition: stroke-dasharray .25s;
            transition: stroke-dasharray .25s;
          }
        `}
      </style>
      <svg width="440" height="440" viewBox="0 0 440 440">
        <circle cx="200" cy="120" r="90" strokeWidth="30" stroke="#D1D3D7" fill="none"></circle>
        <circle cx="200" cy="120" r="90" strokeWidth="30" stroke="#00A5E0" fill="none" transform="matrix(0,-1,1,0,0,440)" strokeDasharray="0 1069"></circle>
      </svg>
    </div>
  );
};

export default ProgressBar;