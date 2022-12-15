import React, { useState } from "react";
import {Link} from "react-router-dom";
import SvgShape from "../../Pic/sliderOtherPic/svg-shape2.svg";

const Slider = (props) => {
  const { loading, filterProduct } = props;

  let [current, setCurrent] = useState(0);
  const [constant, setConstant] = useState(0);
  const [animation, setAnimation] = useState("");

  let navControls;

  const handleNext = () => {
    if (current + 1 < filterProduct.length) {
      setConstant(constant + -180);
      navControls = document.querySelectorAll(".slider__nav-bar .nav-control");
      navControls[current].style.opacity = 0.5;
      setAnimation("");
      setTimeout(() => {
        setCurrent(current + 1);
        navControls[current + 1].style.opacity = 0.9;
        setAnimation(animation === "nextMotion" ? "nextMotion" : "nextMotion");
      }, 350);
      setConstant(constant + -360);
      return;
    } else {
      setAnimation("");
      navControls = document.querySelectorAll(".slider__nav-bar .nav-control");
      navControls[current].style.opacity = 0.5;
      setConstant(constant + -360);
      setTimeout(() => {
        setCurrent(0);
        navControls[0].style.opacity = 0.9;
        setAnimation(animation === "nextMotion" ? "nextMotion" : "nextMotion");
      }, 350);
    }
  };

  const handlePrev = () => {
    if (current - 1 > filterProduct.length || current !== 0) {
      setConstant(constant + 180);
      navControls = document.querySelectorAll(".slider__nav-bar .nav-control");
      navControls[current].style.opacity = 0.5;
      setAnimation("");
      setTimeout(() => {
        setCurrent(current - 1);
        navControls[current - 1].style.opacity = 0.9;
        setAnimation(animation === "prevMotion" ? "prevMotion" : "prevMotion");
      }, 350);
      setConstant(constant + 360);
      return;
    } else {
      setAnimation("");
      navControls = document.querySelectorAll(".slider__nav-bar .nav-control");
      navControls[current].style.opacity = 0.5;
      setConstant(constant + 360);
      setTimeout(() => {
        setCurrent(current + 4);
        navControls[current + 4].style.opacity = 0.9;
        setAnimation(animation === "prevMotion" ? "prevMotion" : "prevMotion");
      }, 350);
    }
  };

  const handleNav = (ind) => {
    navControls = document.querySelectorAll(".slider__nav-bar .nav-control");
    navControls[current].style.opacity = 0.5;
    setConstant(constant + -180);
    setAnimation("");
    setTimeout(() => {
      setCurrent(ind);
      navControls[ind].style.opacity = 0.9;
      setAnimation(animation === "nextMotion" ? "nextMotion" : "nextMotion");
    }, 350);
    setConstant(constant + -360);
  };

  const part = filterProduct[current];

  return (
    <section className="page-wrapper">
      <img
        src={SvgShape}
        alt="sliderShape"
        className="sliderShape"
      />
      <span className="bubble1"></span>
      <span className="bubble2"></span>
      <span className="bubble3"></span>
      <span className="bubble4"></span>
      <div className="slider">
        <ul className="slider-list">
          {!loading && filterProduct.length === 0 ? (
            <h2>اشکال در سرور</h2>
          ) : (
            <li
              className="slider-list__item"
              style={{
                transform: `rotate(${constant}deg)`,
                zIndex: 2,
                transition: "1s ease-in-out",
              }}
            >
              <span className="main__element">
                <img src={part.img} alt="pic" />
              </span>
              <span className="title__element">
                <span className={`title ${animation}`}>{part.twoTitle}</span>
              </span>
              <span className="more__element">
                <span className="content">
                  <span className="headline">{part.twoTitle}</span>
                  <span className="excerpt">
                    برای خرید این محصول وارد لینک زیر شوید
                  </span>
                  <span className="link">
                    <div className="fill"></div>
                    <Link to={`/productDetail/${part.id}`} className="sliderBtn">خرید محصول</Link>
                  </span>
                </span>
              </span>
            </li>
          )}
        </ul>

        <div className="slider__nav-bar">
          <span
            className="nav-control"
            onClick={() => handleNav(0)}
            style={{ opacity: 1 }}
          ></span>
          <span className="nav-control" onClick={() => handleNav(1)}></span>
          <span className="nav-control" onClick={() => handleNav(2)}></span>
          <span className="nav-control" onClick={() => handleNav(3)}></span>
          <span className="nav-control" onClick={() => handleNav(4)}></span>
        </div>

        <div className="slider__controls">
          <span
            className="slider__arrow slider__arrow_prev"
            onClick={handlePrev}
          ></span>
          <span
            className="slider__arrow slider__arrow_next"
            onClick={handleNext}
          ></span>
        </div>
      </div>
    </section>
  );
};

export default Slider;

// Object.keys(part).slice(2);
