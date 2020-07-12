import React from 'react';

const Title = (props) => {
    return (
        <div className="titleLine">
            <h4>{props.TitleText}</h4>
            <div className="line"></div>
        </div>
    )
}

export default Title;
