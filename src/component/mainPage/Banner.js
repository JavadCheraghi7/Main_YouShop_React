import React from 'react';


const firstBanner = (props) => {
    return (
        <div className="firstBanner">
            <div className="left"><img src={props.leftPic} alt="Xiaomi Mi 9T"/></div>
            <div className="right"><img src={props.rightPic} alt="Xiaomi Mi 10"/></div>
        </div>
    )
}

export default firstBanner;
