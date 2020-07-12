import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToRial, getProducts } from "../../actions/productAction";
import Loading from "../layout/Loading";
import DigitalList from "./DigitalList";
import Pagination from "./Pagination";

const DigitalProducts = () => {
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

  const digitalProduct = products.filter((item) => {
    return item.category === "digital";
  });

  const indexOfLastProducts = currentPage * productsPerPage;
  const indexOfFirstProducts = indexOfLastProducts - productsPerPage;
  const currentProducts = digitalProduct.slice(
    indexOfFirstProducts,
    indexOfLastProducts
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className="digitalWrapper">
      <div className="container">
        <div className="digitalProducts">
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
          totalProducts={digitalProduct.length}
          paginate={paginate}
        />
      </div>

      <DigitalList />
    </div>
  );
};

export default DigitalProducts;
