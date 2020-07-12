import React from "react";
import PropTypes from "prop-types";
import { ToRial, addToCart } from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="card">
      <Link to={`/productDetail/${product.id}`} className="imgBx">
        <img src={product.img} alt="محصول" />
      </Link>
      <div className="contentBx">
        <h5>
          {product.title.length > 36
            ? product.title.slice(0, 34) + " ..."
            : product.title}
        </h5>
        <p className="price">{ToRial(product.price)} تومان</p>

        {/* <button
          type="button"
          onClick={() => dispatch(addToCart(product.id))}
          disabled={product.inCart ? true : false}
          style={{background: `${product.inCart ? "rgba(101, 58, 255, 0.3)" : "rgb(101, 58, 255)"} `}}
        >
          <span className="icon">
            <i className="far fa-cart-arrow-down" />
          </span>
        </button> */}
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    img: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.string,
  }).isRequired,
};

export default Product;
