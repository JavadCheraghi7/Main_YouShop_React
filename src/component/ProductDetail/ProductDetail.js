import React, { useState, useRef, useEffect } from "react";
import { FaAngleUp, FaAngleLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Magnifier from "react-magnifier";
import {
  handleDetail,
  Like,
  ToRial,
  getProducts,
  addToCart,
  totalCart,
  increment
} from "../../actions/productAction";
import Loading from "../layout/Loading";
import DetailSvg from "../../Pic/detailOtherPic/detailSvg.svg";
import ComparePng from "../../Pic/detailOtherPic/compare.png";

const ProductDetail = (props) => {
  const { id } = useParams();
  console.log(props.match);
  const productDetail = useSelector((state) => state.products);
  const { detail, loading, cart } = productDetail;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleDetail(id));
    dispatch(getProducts());
    window.scrollTo(0, 0);
  }, []);

  const [heart, setHeart] = useState("");
  const [bol, setBol] = useState(false);
  const [numProduct, setNumProduct] = useState({
    transform: "rotateX(-180deg)",
    opacity: 0,
    toggle: false,
  });

  const mainImage = useRef();

  if (loading || detail === null) {
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
  };

  // product images exchange to array
  const images = Object.entries(detail).filter((item) => {
    let img;
    if (item[0].indexOf("img") !== -1) {
      return (img = item);
    } else {
      img = null;
    }
    return img;
  });
  delete images[1];

  // product Like
  const handleLike = () => {
    if (bol === false) {
      setBol(true);
      setHeart("active-heart");
      detail.like = detail.like + 1;
      dispatch(Like({ ...detail }));
    } else {
      setBol(false);
      setHeart("");
      detail.like = detail.like - 1;
      dispatch(Like({ ...detail }));
    }
  };

  // change image
  const handleImage = (e) => {
    let square = document.querySelector(".magnifying-glass");
    mainImage.current.img.src = e.target.src;
    square.style.backgroundImage = `url('${e.target.src}')`;
  };

  // show storeRoom inventory
  const handleNumProduct = () => {
    if (numProduct.toggle === false) {
      setNumProduct({
        transform: "rotateX(0deg)",
        opacity: 1,
        toggle: true,
      });
      document.querySelector(".detailPlus").style.transform =
        "translateY(4px) rotate(180deg)";
    } else {
      setNumProduct({
        transform: "rotateX(-180deg)",
        opacity: 0,
        toggle: false,
      });
      document.querySelector(".detailPlus").style.transform =
        "translateY(2px) rotate(0deg)";
    }
  };

  // Add to cart
  const handleToCart = (product) => {
    const existProduct = cart.find(item => item.id === product.id);
    if(existProduct){
      dispatch(increment(product.id));
      dispatch(totalCart());
    }
    else{
      dispatch(addToCart(product.id));
      dispatch(totalCart());
    }
  };

  // product Information
  let entries = Object.entries(detail);
  const total = entries.find((item) => {
    return item[0] === "total";
  });
  const inx = entries.indexOf(total);
  const arr = entries.slice(inx + 1);

  

  return (
    <div className="detailContainer">
      <div className="overlay first"></div>
      <div className="overlay second"></div>
      <div className="overlay third"></div>

      <div className="detailProduct">
        <img src={DetailSvg} className="detailSvg" alt="detailSvg" />
        {/* Info */}
        <div className="info">
          <h3>{detail.title}</h3>
          <h4>
            <span>برند : {detail.company} </span>
            <span className="category">
              دسته بندی : {`${detail.group} / ${detail.category}`}
            </span>
          </h4>
          <ul>
            <li>
              {detail.color && (
                <span>
                  رنگ :{" "}
                  {detail.color.map((col, index) => (
                    <span
                      key={index}
                      style={{
                        background: col,
                        height: "15px",
                        width: "15px",
                        borderRadius: "50%",
                        display: "inline-block",
                        margin: "0 5px",
                      }}
                    ></span>
                  ))}
                </span>
              )}
            </li>
            {arr && arr.map((item, index) => {
              return (
                <li key={index}>
                  <FaAngleLeft className="arrowLeftDetail" /> {item[0]} :{" "}
                  {item[1]}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Product Image */}
        <div className="productImage">
          <Magnifier
            ref={mainImage}
            width={300}
            height={500}
            src={detail.img}
            mgWidth={250}
            mgHeight={250}
            mgShape={"square"}
            zoomFactor={0.8}
            mgBorderWidth={1}
          />
        </div>

        {/* Shop Info */}
        <div className="shopInfo">
          <div className="other">
            <div className="btnHeart" onClick={() => handleLike()}>
              <span className={`heart ${heart}`}></span>
              <span className="like">می پسندم</span>
              <span className="numb">{detail.like}</span>
            </div>

            <Link
              to={`/compare/${detail.id}`}
              className="compare"
              data-tooltip="مقایسه"
            >
              <img src={ComparePng} alt="compare" />
            </Link>
          </div>

          <div className="images">
            {images.map((image, index) => (
              <img
                key={index}
                src={image[1]}
                alt="عکس محصول"
                onClick={handleImage}
              />
            ))}
          </div>

          <div
            className="storeRoom"
            style={{
              transform: `${numProduct.transform}`,
              opacity: `${numProduct.opacity}`,
              perspective: 1500,
              transition: "1.5s",
            }}
          >
            {detail.numproduct} عدد موجود در انبار
          </div>

          <div className="shopBox">
            <span className="toUp" onClick={handleNumProduct}>
              <FaAngleUp className="detailPlus" />
            </span>
            <p>{ToRial(detail.price)} تومان</p>

            <button
              type="button"
              className="shopBtn"
              onClick={() => handleToCart(detail)}              
            >
              <span>افزودن به سبد خرید</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
