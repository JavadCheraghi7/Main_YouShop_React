import React from "react";
import Call from "../../Pic/services/24-hours-support.svg";
import Original from "../../Pic/services/original.svg";
import Return from "../../Pic/services/return.svg";
import FastSend from "../../Pic/services/fastSend.svg";

const Services = () => {
  return (
    <div className="services">
      <div className="service">
        <img src={Call} alt="call" />
        <p>پشتیباین 24 ساعته</p>
      </div>
      <div className="service">
        <img src={Original} alt="original" />
        <p>تضمین اصل بودن کالا</p>
      </div>
      <div className="service">
        <img src={Return} alt="giveBack" />
        <p>بازگشت محصول تا 7 روز</p>
      </div>
      <div className="service">
        <img src={FastSend} alt="fastSend" />
        <p>تحویل سریع</p>
      </div>
    </div>
  );
};

export default Services;
