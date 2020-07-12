import React, { useState, useEffect, useRef } from "react";
import { FaAngleDown, FaAngleLeft } from "react-icons/fa";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ToRial,
  handleCompare,
  getProducts,
  setGroupCompare,
  addToComponentList,
  searchProductCompare,
  clearSearchFilter,
  addWithFiltered,
  closeProductCompare,
} from "../../actions/productAction";
import Loading from "../layout/Loading";
import Add from "../../Pic/compareSvg/add.svg";
import Modal from "react-awesome-modal";

const Compare = () => {
  const { id } = useParams();

  const productCompare = useSelector((state) => state.products);
  const { products, compare, filteredCompare, loading } = productCompare;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleCompare(id));
    dispatch(getProducts());
    if (filteredCompare === null) {
      text.current.value = "";
    }
  }, []);

  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState({
    height: 0,
    opacity: 0,
    marginTop: 0,
    transition: "1s, opacity 1s 0.5s",
    bol: false,
  });

  const addCompareBox = useRef();
  let text = useRef("");

  if (loading || compare === null) {
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

  // Modal Events
  const openModal = () => {
    setModal(true);
    dispatch(setGroupCompare(compare[0]));
  };

  const closeModal = () => {
    setModal(false);
  };

  // Add to compare list
  const addToCompare = (id) => {
    if (compare.length <= 4) {
      dispatch(addToComponentList(id));
    }
  };

  // Add to compare list with filtered
  const addWithFilteredToCompare = (id) => {
    if (compare.length <= 4) {
      dispatch(addWithFiltered(id));
    }
  };

  // handle close product of compare
  const closeCompareProduct = (id) => {
    dispatch(closeProductCompare(id));
  };

  // search to compare
  const handleChange = (e) => {
    if (text.current.value !== "") {
      dispatch(searchProductCompare(e.target.value));
    } else {
      dispatch(clearSearchFilter());
    }
  };

  const toggleInfo = () => {
    if (info.bol === false) {
      setInfo({ height: "340px", opacity: 1, marginTop: "90px", transition: "1s, opacity 1s 0.5s", bol: true });
    }
    else{
      setInfo({ height: 0, opacity: 0, marginTop: 0, transition: "1s, opacity 0.2s", bol: false });
    }        
  };

  // for information
  var entries;
  var total;
  var inx;

  return (
    <div className="compareContainer">
      {Array.from(new Set(compare)).map((item) => {
        return (
          <div key={item.id} className="compareProduct">
            <span
              className="closeProduct"
              onClick={() => closeCompareProduct(item)}
              style={{ display: compare.length === 1 ? "none" : "block" }}
            >
              &times;
            </span>
            <div className="compareImage">
              <img src={item.img} alt="عکس محصول" />
            </div>
            <h4>{item.title}</h4>
            <h4>{ToRial(item.price)} تومان</h4>
            <Link to={`/productDetail/${item.title}`} className="btn">
              صفحه محصول
            </Link>
            <div className="viewInfo">
              <span onClick={toggleInfo}>
                <FaAngleDown className="compareArrow" style={{transition: "0.7s"}} />
              </span>
            </div>

            <div
              className="info"
              style={{
                height: `${info.height}`,
                opacity: `${info.opacity}`,
                marginTop: `${info.marginTop}`,
                transition: `${info.transition}`,
              }}
            >
              <ul>
                <li>
                  {item.color && (
                    <span>
                      رنگ :{" "}
                      {item.color.map((col) => (
                        <span
                          key={col}
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
                {
                  // information
                  ((entries = Object.entries(item)),
                  (total = entries.find((attr) => {
                    return attr[0] === "total";
                  })),
                  (inx = entries.indexOf(total)),
                  entries.slice(inx + 1).map((part) => {
                    return (
                      <li key={part}>
                        <FaAngleLeft className="compareLeftArrow" /> {part[0]} :{" "}
                        {part[1]}
                      </li>
                    );
                  }))
                }
              </ul>
            </div>
          </div>
        );
      })}

      {/* Add to compare box */}
      <div
        className="addToCompare"
        ref={addCompareBox}
        style={{ display: compare.length >= 4 ? "none" : "block" }}
      >
        <div className="border">
          <h5>محصول مورد نظر را برای مقایسه انتخاب کنید</h5>
          <img src={Add} alt="اضافه کردن محصول" />
        </div>

        <button id="popup" className="btnOpenModal" onClick={() => openModal()}>
          افزودن محصول برای مقایسه
        </button>
      </div>

      <Modal
        visible={modal}
        width="1300"
        height="600"
        effect="fadeInUp"
        onClickAway={() => closeModal()}
      >
        <div className="modalBox">
          <div className="modalHead">
            <a
              // href="javascript:void(0);"
              className="closeModal"
              onClick={() => closeModal()}
            >
              &times;
            </a>
            <div className="search">
              <input
                type="text"
                name="search"
                ref={text}
                onChange={handleChange}
                placeholder="کالای مورد نظر را پیدا کن"
              />
              <span className="btnSearch">
                <i className="fas fa-search" />
              </span>
            </div>
          </div>

          <div className="modalBody">
            {filteredCompare !== null
              ? filteredCompare.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="compareProduct"
                      onClick={() => addWithFilteredToCompare(item.id)}
                      onMouseUp={() => closeModal()}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="compareImage">
                        <img src={item.img} alt="عکس محصول" />
                      </div>
                      <h4>{item.title}</h4>
                      <h4>{ToRial(item.price)} تومان</h4>
                    </div>
                  );
                })
              : products !== null &&
                products.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="compareProduct"
                      onClick={() => addToCompare(item.id)}
                      onMouseUp={() => closeModal()}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="compareImage">
                        <img src={item.img} alt="عکس محصول" />
                      </div>
                      <h4>{item.title}</h4>
                      <h4>{ToRial(item.price)} تومان</h4>
                    </div>
                  );
                })}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Compare;
