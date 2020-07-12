import React, { useState, useRef, useEffect } from "react";
import {FaAngleLeft} from "react-icons/fa";
import {Link} from "react-router-dom";
import HeadTitle from "../headTitle";
import Gooey from "./Gooey";

const Wave = (props) => {
  const { loading, filterProduct } = props;
  const [current, setCurrent] = useState(0);
  
  var ooo;
  var ppp;
  var image;
  var info;

  useEffect(() => {
    autoWaveImg();
    autoWaveInfo();
    image = document.querySelector(".image");
    info = document.querySelector(".productInfo ul");
    return () => {
      clearInterval(ooo);
      clearInterval(ppp);
    };
  }, [current]);


  // const image = useRef("");
  // const info = useRef("");

  const autoWaveImg = () => {
    ppp = setInterval(() => {
      if (current + 1 < filterProduct.length) {
        setTimeout(() => {
          image.classList.remove("showImg");
          image.classList.add("hiddenImg");
        }, 5000);

        setTimeout(() => {
          setCurrent(current + 1);
        }, 6000);

        setTimeout(() => {
          image.classList.remove("hiddenImg");
          image.classList.add("showImg");
        }, 6500);

        return;
      } else {
        setTimeout(() => {
          image.classList.remove("showImg");
          image.classList.add("hiddenImg");
        }, 5000);

        setTimeout(() => {
          setCurrent(0);
        }, 6000);

        setTimeout(() => {
          image.classList.remove("hiddenImg");
          image.classList.add("showImg");
        }, 6500);
      }
    }, 6500);
  };

  const autoWaveInfo = () => {
    ooo = setInterval(() => {
      if (current + 1 < filterProduct.length) {
        setTimeout(() => {
          info.classList.remove("showInfo");
          info.classList.add("hiddenInfo");
        }, 5000);

        setTimeout(() => {
          info.classList.remove("hiddenInfo");
          info.classList.add("showInfo");
        }, 6500);

        return;
      } else {
        setTimeout(() => {
          info.classList.remove("showInfo");
          info.classList.add("hiddenInfo");
        }, 5000);

        setTimeout(() => {
          setCurrent(0);
        }, 6000);

        setTimeout(() => {
          info.classList.remove("hiddenInfo");
          info.classList.add("showInfo");
        }, 6500);
      }
    }, 6500);
  };

  const part = filterProduct[current];

  let entries = Object.entries(part);
  const total = entries.find((item) => {
    return item[0] === "total";
  });
  const inx = entries.indexOf(total);
  const arr = entries.slice(inx + 1);

  return (
    <div className="wave">
      <HeadTitle title="جدیدترین محصولات" />
      <Gooey />
      <div className="waveSlider">
        {!loading && filterProduct.length === 0 ? (
          <h2>اشکال در سرور</h2>
        ) : (
          <>
            <div className="sliderPic">
              <div className="img">
                <img
                  src={part.img}
                  className="image"
                  alt="محصولات"
                  // ref={image}
                />
              </div>
            </div>
            <div className="productInfo">
              <ul>
                <h3>{part.title}</h3>
                {arr.map((pcs, index) => {
                  return (
                    <li key={index}>
                      <FaAngleLeft className="arrowLeft" /> {pcs[0]} : {pcs[1]}
                    </li>
                  );
                })}
                <Link to={`/productDetail/${part.id}`} className="buyBtn" >                
                  صفحه محصول
                </Link>
              </ul>
            </div>
          </>
        )}
      </div>

      <svg x="0px" y="0px" viewBox="0 0 1665 700" className="svgWave">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="2%"
              style={{ stopColor: "#373737", stopOpacity: 1 }}
            ></stop>
            <stop
              offset="5%"
              style={{ stopColor: "#393939", stopOpacity: 1 }}
            ></stop>
            <stop
              offset="10%"
              style={{ stopColor: "#3a3f3f", stopOpacity: 1 }}
            ></stop>
            <stop
              offset="100%"
              style={{ stopColor: "#00ff9b", stopOpacity: 1 }}
            ></stop>
          </linearGradient>
        </defs>
        <path
          className="st0 w0"
          d="M0,575.09c288.8,116.63,330.49,91.43,440.68,91.47,190,.05,710.74-112.69,911-96.69C1598,589.56,1528.48,585.1,1665,607.24V0H0Z"
        />
        <path
          className="st0 w1"
          d="M0,582.86c273.5,111.6,357.76,88,484.59,73.12,186.23-21.83,389.34-65.19,576.82-83.44C1304.59,548.88,1524,544.9,1665,587.71V0H0Z"
        />
        <path
          className="st0 w2"
          d="M0,535.44C265.69,687,719.37,673.4,857.76,663c198.57-14.85,243.58-78.1,423.17-95,248-23.37,247.74,22.21,384.07,38V0H0Z"
        />
        <path
          className="st0 w3"
          d="M0,579.3c221.49-13.07,342.77-35.08,506.54-37.63,205.57-3.21,495.11,117.71,700,125.94,252.93,10.17,355-45.81,458.46-73.67V0H0Z"
        />
        <path
          className="st0 w4"
          d="M0,585.25c241.2,122.28,427.1,82.3,615.07,53.91,204.74-30.91,279.61-67.75,484.15-68.08,247.45-.4,425.44,41.41,565.78,94.29V0H0Z"
        />
      </svg>
    </div>
  );
};

export default Wave;
