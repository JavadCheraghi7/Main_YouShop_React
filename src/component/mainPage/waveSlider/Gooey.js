import React from "react";

const SquareWave = () => {
  return (
    <>
      <div className="gooey">
        <span className="circle1"></span>
        <span className="circle2"></span>
      </div>

      <svg className="svgGooey">
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
            <feColorMatrix values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 20 -10
            " />
          </filter>
      </svg>
    </>
  );
};

export default SquareWave;
