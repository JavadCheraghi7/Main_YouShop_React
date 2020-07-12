import React from "react";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";

import Product from "./Product";
import Title from "./Title";

const Carousel = (props) => {
  const { filterProduct, TitleText } = props;

  const params = {
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1300: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1000: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      700: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
    spaceBetween: 50,
    slidesPerView: 5,
  };

  return (
    <div className="carousel">
      <Title TitleText={TitleText} />

      <Swiper
        {...params}
        data-observer="true"
        data-loop="true"
        data-centered-slides="true"
      >
        {filterProduct.map((product) => {
          return (
            <div className="swiper-slide" key={product.id}>
              <Product product={product} />
            </div>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;
