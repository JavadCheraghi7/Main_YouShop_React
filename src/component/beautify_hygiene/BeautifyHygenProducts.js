import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToRial, getProducts } from "../../actions/productAction";
import Loading from "../layout/Loading";
import BeautifyHygenList from "./BeautifyHygenList";
import Pagination from "./Pagination";

const BeautifyHygenProducts = () => {
  const getProduct = useSelector((state) => state.products);
  const { products, loading } = getProduct;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

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

  const beautifyHygenProduct = products.filter((item) => {
    return item.category === "آرایشی, بهداشتی, سلامت";
  });

  const indexOfLastProducts = currentPage * productsPerPage;
  const indexOfFirstProducts = indexOfLastProducts - productsPerPage;
  const currentProducts = beautifyHygenProduct.slice(
    indexOfFirstProducts,
    indexOfLastProducts
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className="beautifyHygenWrapper">
      <div className="container">
        <div className="beautifyHygenProducts">
          {currentProducts.map((product) => {
            return (
              <div className="card" key={product.id}>
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
                </div>
              </div>
            );
          })}
        </div>
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={beautifyHygenProduct.length}
          paginate={paginate}
        />
      </div>

      <BeautifyHygenList />
    </div>
  );
};

export default BeautifyHygenProducts;
