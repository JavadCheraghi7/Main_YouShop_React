import React from "react";
import { Link } from "react-router-dom";

const BeautifyHygenList = () => {
  return (
    <div className="beautifyHygenList">
      <h4>دسته بندی محصولات</h4>
      <h5>آرایشی</h5>
      <ul>
        <li>
          {/* <Link to="#!" className="listItem">
            آرایشی
          </Link> */}
        </li>
      </ul>

      <h5>بهداشتی</h5>
      <ul>
        <li>
          {/* <Link to="#!" className="listItem">
            بهداشتی
          </Link> */}
        </li>
      </ul>
    </div>
  );
};

export default BeautifyHygenList;
