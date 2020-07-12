import React from "react";

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleColor = (e) => {
    const items = document.querySelectorAll(".pageItem");
    items.forEach((item) => {
      item.style.background = "#592bff";
    });
    e.target.style.background = "#431ab6";
    e.target.style.transition = "0.5s";
  };

  return (
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
  );
};

export default Pagination;
