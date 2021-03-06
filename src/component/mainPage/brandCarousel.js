import React from "react";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";
import Title from "./Title";

const brandCarousel = (props) => {
  const { loading, products, brands, TitleText } = props;

  if (loading || products === null) {
    return "";
  }

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
    spaceBetween: 30,
    slidesPerView: 5,
  };

  return (
    <div className="brandCarousel">
      <Title TitleText={TitleText} />

      <Swiper
        {...params}
        data-observer="true"
        data-loop="true"
        data-centered-slides="true"
      >
        {brands.map((brand, index) => {
          return (
            <div key={index} className="brand">
              <img src={brand} alt="برند محصولات" />
            </div>
          );
        })}
      </Swiper>
    </div>
  );
};

export default brandCarousel;
