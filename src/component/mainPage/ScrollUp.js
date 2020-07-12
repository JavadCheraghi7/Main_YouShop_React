import React from "react";

const ScrollUp = () => {

  const handleUp = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="scrollWrapper">
      <div className="leftUp"></div>
      <div className="scrollUp">
        <span className="up" onClick={handleUp}>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className="rightUp"></div>
      </div>
    </div>
  );
};

export default ScrollUp;
