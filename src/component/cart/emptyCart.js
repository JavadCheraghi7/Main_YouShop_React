import React from 'react';
import {Link} from "react-router-dom";
import EmptyCart from "../../Pic/emptyCartSvg/emptyCart.svg"

const emptyCart = () => {
    return (
        <div className="emptyCart">
            <div className="content">
                <img src={EmptyCart} alt="سبد خرید خالی"/>
                <h2>سبد خرید خالی است</h2>
                <Link to="/" className="emptyBtn">صفحه اصلی</Link>
            </div>
        </div>
    )
}

export default emptyCart
