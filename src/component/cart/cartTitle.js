import React from 'react';

const cartTitle = () => {
    return (
        <div className="cartTitle">
            <div className="products">محصولات</div>
            <div className="name">نام محصول</div>
            <div className="price">مبلغ</div>
            <div className="count">تعداد</div>
            <div className="color">رنگ</div>
            <div className="remove">حذف</div>
            <div className="total">کل</div>
        </div>
    )
}

export default cartTitle;
