import React, { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { getProducts } from "../../actions/productAction";
import Loading from "../layout/Loading";
import Slider from "./Slider";
import Wave from "./waveSlider/Wave";
import Carousel from "./Carousel";
import BrandCarousel from "./brandCarousel";
import Banner from "./Banner";
import ScrollUp from "./ScrollUp";


import Xiaomi9T from "../../Pic/banner/mainPageBanner/Xiaomi - Mi 9T.jpg";
import XiaomiMi10 from "../../Pic/banner/mainPageBanner/xiaomi mi 10_1.jpg";
import Tshirt from "../../Pic/banner/mainPageBanner/tshirt_1.jpg";
import Jacket from "../../Pic/banner/mainPageBanner/fashion-banner_1.jpg";

import Samsung from "../../Pic/brand/Samsung.png";
import Apple from "../../Pic/brand/Apple.png";
import Huawei from "../../Pic/brand/Huawi.png";
import Lenovo from "../../Pic/brand/Lenovo.png";
import LG from "../../Pic/brand/LG.png";
import Xiaomi from "../../Pic/brand/Xiaomi.png";
import Canon from "../../Pic/brand/Canon.png";


const MainPage = () => {
  
  const brands = [Huawei, Lenovo, LG, Canon, Xiaomi, Apple, Samsung];
  const productState = useSelector(state => state.products);
  const {products, loading} = productState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  

  if (loading || products === null) {
    return (
      <div
      style={{
        height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        >
        <Loading />
      </div>
    );
  }

  const filterTopSlider = products.filter((pro) => {
    return pro.position === "topSlider";
  });

  const filterWaveSlider = products.filter((pro) => {
    return pro.position === "waveSlider";
  });
  
  const filterMobile = products.filter((pro) => {
    return pro.group === "mobile";
  });

  const filterLenovo = products.filter((pro) => {
    return pro.group === "laptop";
  }).filter(lenovo =>{
    return lenovo.type === "lenovo";
  }).slice(0, 5);

  const filterApple = products.filter((pro) => {
    return pro.group === "laptop";
  }).filter(lenovo =>{
    return lenovo.type === "apple";
  }).slice(0, 5);

  const filterLaptop = [...filterApple, ...filterLenovo];

  const filterBeautify = products.filter(pro =>{
    return pro.group === "لوازم آرایشی";
  });

  const filterHygiene = products.filter(pro =>{
    return pro.group === "لوازم بهداشتی";
  });

  return (
    <>
      <Slider loading={loading} filterProduct={filterTopSlider} />
      <Wave loading={loading} filterProduct={filterWaveSlider} />
      <Carousel TitleText={"موبایل"} filterProduct={filterMobile}  />
      <Carousel TitleText={"لپ تاپ"} filterProduct={filterLaptop} />
      <Banner leftPic={Xiaomi9T} rightPic={XiaomiMi10} />
      <Carousel TitleText={"لوازم آرایشی"} filterProduct={filterBeautify} />
      <Carousel TitleText={"لوازم بهداشتی"} filterProduct={filterHygiene} />
      <Banner leftPic={Tshirt} rightPic={Jacket} />
      <BrandCarousel products={products} loading={loading} TitleText={"برندها"} brands={brands} />
      <ScrollUp />
    </>
  );
};

export default MainPage;
