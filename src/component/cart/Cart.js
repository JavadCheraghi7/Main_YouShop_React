import React from "react";
import { FaAngleDown, FaAngleUp, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ToRial,
  increment,
  decrement,
  removeProduct,
  totalCart,
  removeAllProduct
} from "../../actions/productAction";
import EmptyCart from "./emptyCart";
import CartTitle from "./cartTitle";

const Cart = () => {
  const productCart = useSelector((state) => state.products);
  const { cart, cartSubTotal, cartTotal } = productCart;

  const dispatch = useDispatch();

  const handleDecrement = (id) => {
    dispatch(decrement(id));
    dispatch(totalCart());
  };

  const handleIncrement = (id) => {
    dispatch(increment(id));
    dispatch(totalCart());
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
    dispatch(totalCart());
  };

  const handleRemoveAll = () =>{
    dispatch(removeAllProduct());
    dispatch(totalCart());
  }

  return cart.length !== 0 ? (
    <>
      <div className="cartWrapper">
        <div className="title">
          <h4>محصولات</h4>
          <div className="line"></div>
        </div>
        <CartTitle />
        <div className="listWrapper">
          {Array.from(new Set(cart)).map((item) => {
            return (
              <div className="productList" key={item.title}>
                <div className="image">
                  <Link to={`/productDetail/${item.id}`}>
                    <img src={item.img} alt={item.title} />
                  </Link>
                </div>
                <div className="productName">
                  <p>{item.title}</p>
                </div>
                <div className="price">
                  <p>{ToRial(item.price)} تومان</p>
                </div>
                <div className="count">
                  <span
                    className="increment"
                    onClick={() => handleIncrement(item.id)}
                  >
                    <FaAngleUp />
                  </span>

                  <span className="num">{item.count}</span>

                  <span
                    className="decrement"
                    onClick={() => handleDecrement(item.id)}
                  >
                    <FaAngleDown />
                  </span>
                </div>
                <div className="color">
                  <p>color</p>
                </div>
                <div className="remove">
                  <span onClick={() => handleRemoveProduct(item.id)}>
                    <FaRegTrashAlt />
                  </span>
                </div>
                <div className="total">
                  <p>{ToRial(String(item.total))} تومان</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="calculationBox">
        <p><span>جمع محصولات :</span><span>{ToRial(String(cartSubTotal))} تومان</span></p>
        <p><span>جمع کل :</span><span>{ToRial(String(cartTotal))} تومان</span></p>
        <div className="btns">
          <button className="removeAll" onClick={handleRemoveAll}>حذف محصولات</button>
          <button className="continueShop">ادامه خرید</button>
        </div>  
      </div>
    </>
  ) : (
    <EmptyCart />
  );
};

export default Cart;
