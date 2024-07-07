import React from 'react';

const ShippingInfo = () => {
    return (
        <div className="section_unit my-3">
            <div className="section_content p-2">
                <div className="shipping_info d-flex">
                    <img src="/img/pay/box.png" alt="배송박스" className="img-fluid me-3" style={{ width: '50px', height: '50px' }} />
                    <div className="shipping_detail d-flex flex-column ms-2">
                        <div className="shipping_method small">일반배송 3,000원</div>
                        <div className="shipping_cost text-secondary small">
                            검수 후 배송 | 9-11일 내 도착 예정
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingInfo;
