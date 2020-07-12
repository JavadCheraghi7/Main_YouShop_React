import React from "react";
import { Link } from "react-router-dom";


const DigitalList = () => {
  return (
    <div className="digitalList">
      <h4>دسته بندی محصولات</h4>
      <h5>موبایل</h5>
      <ul>
        <li>
          <Link to="#!" className="listItem">
            موبایل
          </Link>
        </li>
      </ul>

      <h5>لپ تاپ</h5>
      <ul>
        <li>
          <Link to="#!" className="listItem">
            لپ تاپ
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DigitalList;
