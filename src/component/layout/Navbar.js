import React, { useState, useRef } from "react";
import {
  FaShoppingCart,
  FaMicrophone,
  FaSearch,
  FaAngleDown,
  FaBars,
  FaUser,
} from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "./SideBar";
import Logo from "../../Pic/logo/logo.svg";
import DropDownPng from "../../Pic/navbarPng/navPng.png";
import { productSearch } from "../../actions/productAction";

const Navbar = () => {
  const setCart = useSelector((state) => state.products);
  const { cart } = setCart;
  const dispatch = useDispatch();

  const [hide, setShow] = useState(null);
  const [inVisible, setVisible] = useState(null);
  const [hideBox, setHideBox] = useState(null);
  const [goSearch, setGoSearch] = useState("");
  const [microColor, setColor] = useState("#e8e8e8");
  const [sidebar, setSidebar] = useState({ translate: -350, width: 0 });
  const text = useRef();

  // itemList mouseEnter event
  const handleEnter = () => {
    setShow("show");
    setTimeout(() => {
      setVisible("active");
    }, 150);
    setHideBox("open");

    const navBox = document.querySelector(".navBox");
    const drop = document.querySelector(".containerDropdown");
    const itemList = document.querySelector(".mainList");
    const dropdownCoords = drop.getBoundingClientRect();
    const itemListCoords = itemList.getBoundingClientRect();

    const coords = {
      width: dropdownCoords.width,
      height: dropdownCoords.height,
      top: dropdownCoords.top - itemListCoords.top,
      left: dropdownCoords.left,
    };

    navBox.style.setProperty("width", `${coords.width}px`);
    navBox.style.setProperty("height", `${coords.height}px`);
    navBox.style.setProperty(
      "transform",
      `translate(${coords.left - 40}px, ${coords.top}px)`
    );
  };

  // itemList mouseLeave event
  const handleLeave = () => {
    setShow(null);
    setVisible(null);
    setHideBox(null);
  };

  // Speech Search
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "fa-IR";
  recognition.interimResults = true;

  const start = () => {
    microColor === "#e8e8e8" ? recognition.start() : recognition.stop();
  };

  recognition.addEventListener("start", () => {
    const searchField = document.querySelector(".search input");
    setColor("#00ff9b");
    searchField.focus();
  });

  recognition.addEventListener("end", () => {
    const searchField = document.querySelector(".search input");
    setColor("#e8e8e8");
    searchField.focus();

    console.log("end");
  });

  
  recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results)
      .map((part) => {
        return part[0].transcript;
      })
      .join(" ");

    text.current.value = transcript + " ";
    dispatch(productSearch(text.current.value));
    text.current.value !== "" ? setGoSearch("/search") : setGoSearch("/");  
  });

  const handleSearch = (e) => {
    dispatch(productSearch(e.target.value));
    text.current.value !== "" ? setGoSearch("/search") : setGoSearch("/");   
  };

  const openSidebar = () => {
    setSidebar({ translate: 0, width: 350 });
  };

  return (
    <>
      <nav className="navbar" id="Up">
        <div className="navigate">
          <div className={`navBox ${hideBox}`}>
            <span className="arrow"></span>
          </div>

          <Link to="/" className="logo">
            <img src={Logo} alt="logo" />
            <p>یــــو شــــاپ</p>
          </Link>

          <Link to="/cart" className="cart">
            <FaShoppingCart className="shoppingCart" />
            <span className="buy">{cart.length}</span>
          </Link>

          <div className="search">
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
              <Link to={goSearch} className="btnSearch">
                <button type="submit">
                  <FaSearch />
                </button>
              </Link>
              <span
                className="btnMicro"
                onClick={start}
                style={{ color: `${microColor}` }}
              >
                <FaMicrophone />
              </span>
            </form>
          </div>

          <ul className="mainList">
            <li
            // onMouseEnter={handleEnter}
            // onMouseLeave={handleLeave}
            // className={`account ${hide} ${hide !== null && inVisible}`}
            >
              <NavLink to="/userAccount" activeClassName="activeLink">
                حساب کاربری
              </NavLink>
              {/* <div className="containerDropdown">
                <FaUser />
                <span>برای خرید محصول لطفا در سایت ثبت نام کنید</span>
              </div> */}
            </li>

            <li
              className={`pro ${hide} ${hide !== null && inVisible}`}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              <NavLink to="/">
                محصولات <FaAngleDown className="arrowDown" />
              </NavLink>
              <div className="containerDropdown">
                <img src={DropDownPng} alt="products" />
                <ul className="dropdown">
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
              </div>
            </li>
          </ul>
          <span className="bars" onClick={openSidebar}>
            <FaBars className="bars" />
          </span>
        </div>
      </nav>
      <SideBar
        hide={hide}
        inVisible={inVisible}
        hideBox={hideBox}
        microColor={microColor}
        handleSearch={handleSearch}
        start={start}
        setHideBox={setHideBox}
        setShow={setShow}
        setVisible={setVisible}
        sidebar={sidebar}
        setSidebar={setSidebar}
        recognition={recognition}
        goSearch={goSearch}
        setGoSearch={setGoSearch}
      />
    </>
  );
};

export default Navbar;
