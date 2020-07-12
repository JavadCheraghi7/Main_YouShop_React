import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts, ToRial } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import arrowSvg from "../../Pic/searchSvg/arrow.svg";
import searchSvg from "../../Pic/searchSvg/search.svg";

const SearchPage = () => {
  const productSearch = useSelector((state) => state.products);
  const { search, loading } = productSearch;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(15);

  if (loading || search === null || search === "") {
    return (
      <div className="findText">
        <div>
          <img src={arrowSvg} alt="goSearch" />
          <h1>کالای مورد نظرت رو پیدا کن</h1>
        </div>
      </div>
    );
  }

  const lastIndexPage = currentPage * perPage;
  const firstIndexPage = lastIndexPage - perPage;
  const currentProducts = search.slice(firstIndexPage, lastIndexPage);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(search.length / perPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handleColor = (e) => {
    const items = document.querySelectorAll(".pageItem");
    items.forEach((item) => {
      item.style.background = "#592bff";
    });
    e.target.style.background = "#431ab6";
    e.target.style.transition = "0.5s";
  };



  return (
    <div className="searchContainer">
      <div className="container">
        {search === null || search.length === 0 ? (
          <div className="notfoundSearch">
            <div>
              <img src={searchSvg} alt="search" />
              <h1>محصول مورد نظر یافت نشد!</h1>
            </div>
          </div>
        ) : (
          currentProducts.map((product) => (
            <div className="card" key={product.id}>
              <Link to={`/productDetail/${product.id}`} className="imgBx">
                <img src={product.img} alt="محصول" />
              </Link>
              <div className="contentBx">
                <h5>
                  {/* {product.title.length > 36
                ? product.title.slice(0, 34) + " ..."
                : product.title} */}
                  {product.title}
                </h5>
                <p className="price">{ToRial(product.price)} تومان</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="pagination">
        <ul className="pageList">
          {pageNumbers.map((number) => (
            <li
              className="pageItem"
              key={number}
              onClick={() => paginate(number)}
              onMouseUp={handleColor}
            >
              {" "}
              {number}{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;
