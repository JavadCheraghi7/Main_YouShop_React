import React, { useRef } from "react";
import {
  FaShoppingCart,
  FaMicrophone,
  FaAngleDown,
  FaSearch,
} from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { productSearch } from "../../actions/productAction";
import Logo from "../../Pic/logo/logo.svg";

const SideBar = (props) => {
  const setCart = useSelector((state) => state.products);
  const { cart } = setCart;
  const dispatch = useDispatch();

  const text = useRef();

  // sidbar nav hover
  const handleEnter = () => {
    props.setShow("show");

    setTimeout(() => {
      props.setVisible("active");
    }, 150);
    props.setHideBox("open");
  };

  const handleLeave = () => {
    props.setShow(null);
    props.setVisible(null);
    props.setHideBox(null);
  };

  // call recognition for sidebar
  props.recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results)
      .map((part) => {
        return part[0].transcript;
      })
      .join(" ");

    text.current.value = transcript + " ";
    text.current.focus();
    dispatch(productSearch(text.current.value));
    text.current.value !== ""
      ? props.setGoSearch("/search")
      : props.setGoSearch("/");
  });

  const handleSearch = (e) => {
    dispatch(productSearch(e.target.value));
    text.current.value !== "" ? props.setGoSearch("/search") : props.setGoSearch("/");   
  };

  const closeSidebar = () => {
    props.setSidebar({ translate: -350, width: 0 });
  };

  return (
    <nav
      className="sidebar"
      style={{
        transform: `translateX(${props.sidebar.translate}px)`,
        width: `${props.sidebar.width}px`,
        transition: "0.8s",
      }}
    >
      <div className="side">

        <div className="top-sidebar">
          <Link to="/" className="sidebar-logo">
            <img src={Logo} alt="logo" />
            <p>یــــو شــــاپ</p>
          </Link>

          <Link to="/cart" className="sidebar-cart">
            <FaShoppingCart className="shoppingSideBar" />
            <span className="sidebar-buy">{cart.length}</span>
          </Link>
          <span className="exit" onClick={closeSidebar}>
            &times;
          </span>
        </div>

        <div className="sidebar-search">
          <form>
            <input
              ref={text}
              type="text"
              name="search"
              onChange={handleSearch}
              placeholder="کالای مورد نظر را پیدا کن"
              contentEditable="true"
              autoComplete="off"
            />
            <Link to={props.goSearch} className="sidebar-btnSearch">
              <button type="submit" >
                <FaSearch className="searchSideBar" />
              </button>
            </Link>
            <span
              className="sidebar-btnMicro"
              onClick={props.start}
              style={{ color: `${props.microColor}` }}
            >
              <FaMicrophone className="microphoneSideBar" />
            </span>
          </form>
        </div>

        <ul className="sidebar-mainList">
          <li>
            <NavLink to="/userAccount" activeClassName="activeLink">
              حساب کاربری
            </NavLink>
          </li>

          <li
            className={`${props.hide} ${
              props.hide !== null && props.inVisible
            }`}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <NavLink to="/" activeClassName="activeLink">
              محصولات <FaAngleDown className="downSideBar" />
            </NavLink>
            <ul className="sidebar-dropdown">
              <li>
                <NavLink to="/digitalProducts" activeClassName="activeLink">
                  کالای دیجیتال
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/beautifyHygenProducts"
                  activeClassName="activeLink"
                >
                  آرایشی و بهداشتی
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
