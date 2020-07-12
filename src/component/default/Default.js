import React from "react";
import {Link} from "react-router-dom";
import DefaultSvg from "../../Pic/404/404.svg";

const Default = (props) => {
  return (
    <div className="default">
      <img src={DefaultSvg} alt="404" />
      <div className="content">
        <p>
          !درخواستی شما یافت نشد{" "}
          <span className="pathname">{props.location.pathname}</span> آدرس
        </p>
        <Link to="/" className="goMainPage" >صفحه اصلی</Link>
      </div>
    </div>
  );
};

export default Default;
