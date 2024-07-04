import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PurchaseDetail = ({ saleDetail }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        saleNo: '',
        saleDate: '',
        userId: '',
        address: '',
        productNo: '',
        productName: '',
        size: '',
        salesTrackingNo: '',
        account: '',
        saleState: ''
    });

    useEffect(() => {
        if (saleDetail) {
            setFormData({
                saleNo: saleDetail.saleNo || '',
                saleDate: saleDetail.saleDate || '',
                userId: saleDetail.userId || '',
                address: saleDetail.address || '',
                productNo: saleDetail.productNo || '',
                productName: saleDetail.productName || '',
                size: saleDetail.size || '',
                salesTrackingNo: saleDetail.salesTrackingNo || '',
                account: saleDetail.account || '',
                saleState: saleDetail.saleState || ''
            });
        }
    }, [saleDetail]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`필드 ${name} 변경됨: ${value}`);  // 상태 변경 시 로그 출력
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('폼 데이터를 제출 중:', formData);  // 폼 제출 시 현재 상태 출력
        try {
            const payload = {
                sNo: formData.saleNo,
                saleState: formData.saleState
            };
            console.log('서버로 보낼 데이터:', payload); // JSON 변환 전의 데이터 로그 출력

            const jsonString = JSON.stringify(payload);
            console.log('JSON 문자열:', jsonString); // JSON 문자열 로그 출력

            const response = await fetch('/admin/purchase/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonString
            });
            const data = await response.json();
            console.log("서버 응답:", data);
        } catch (error) {
            console.error("폼 제출 중 오류 발생:", error);
        }
        navigate('/admin/purchase_state');
    };

    if (!saleDetail) {
        return <div>Loading...</div>;
    }

    return (
        <form id="purchase-form" onSubmit={handleSubmit} class="container">
    <input type="hidden" name="saleNo" value={formData.saleNo} />
    
    <div class="form-group row" style={{marginBottom : '10px'}}>
        <label for="sale-date" class="col-sm-3 col-form-label font-weight-bold">판매 요청 일자</label>
        <div class="col-sm-9">
            <input type="text" id="sale-date" name="saleDate" value={new Date(formData.saleDate).toLocaleDateString()} class="form-control border-0 border-bottom" readonly />
        </div>
    </div>
    
    <div class="form-group row" style={{marginBottom : '10px'}}>
        <label for="user-ID" class="col-sm-3 col-form-label font-weight-bold">유저 ID</label>
        <div class="col-sm-9">
            <input type="text" id="user-ID" name="userId" value={formData.userId} class="form-control border-0 border-bottom" readonly />
        </div>
    </div>
    
    <div class="form-group row" style={{marginBottom : '10px'}}>
        <label for="address" class="col-sm-3 col-form-label font-weight-bold">반송 주소</label>
        <div class="col-sm-9">
            <input type="text" id="address" name="address" value={formData.address} class="form-control border-0 border-bottom" readonly />
        </div>
    </div>
    
    <div class="form-group row" style={{marginBottom : '10px'}}>
        <label for="sales-number" class="col-sm-3 col-form-label font-weight-bold">판매 번호</label>
        <div class="col-sm-9">
            <input type="text" id="sales-number" name="saleNo" value={formData.saleNo} class="form-control border-0 border-bottom" readonly />
        </div>
    </div>
    
    <div class="form-group row" style={{marginBottom : '10px'}}>
        <label for="product-number" class="col-sm-3 col-form-label font-weight-bold">상품 번호</label>
        <div class="col-sm-9">
            <input type="text" id="product-number" name="productNo" value={formData.productNo} class="form-control border-0 border-bottom" readonly />
        </div>
    </div>
    
    <div class="form-group row" style={{marginBottom : '10px'}}>
        <label for="product-name" class="col-sm-3 col-form-label font-weight-bold">상품명</label>
        <div class="col-sm-9">
            <input type="text" id="product-name" name="productName" value={formData.productName} class="form-control border-0 border-bottom" readonly />
        </div>
    </div>
    
    <div class="form-group row" style={{marginBottom : '10px'}}>
        <label for="size" class="col-sm-3 col-form-label font-weight-bold">사이즈</label>
        <div class="col-sm-9">
            <input type="text" id="size" name="size" value={formData.size} class="form-control border-0 border-bottom" readonly />
        </div>
    </div>
    
    <div class="form-group row" style={{marginBottom : '10px'}}>
        <label for="tracking-no" class="col-sm-3 col-form-label font-weight-bold">운송장 번호</label>
        <div class="col-sm-9">
            <input type="text" id="tracking-no" name="salesTrackingNo" value={formData.salesTrackingNo} class="form-control border-0 border-bottom" readonly />
        </div>
    </div>
    
    <div class="form-group row" style={{marginBottom : '10px'}}>
        <label for="account" class="col-sm-3 col-form-label font-weight-bold">정산 계좌</label>
        <div class="col-sm-9">
            <input type="text" id="account" name="account" value={formData.account} class="form-control border-0 border-bottom" readonly />
        </div>
    </div>
    
    <div class="form-group row" style={{marginBottom : '10px'}}>
        <label for="sale-state" class="col-sm-3 col-form-label font-weight-bold">상태</label>
        <div class="col-sm-9">
            <select id="sale-state" class="form-control" name="saleState" value={formData.saleState} onChange={handleChange}>
                <option value="pending">판매요청</option>
                <option value="reception">수취완료</option>
                <option value="checking">검수중</option>
                <option value="completed">정산완료</option>
                <option value="cancelled">취소됨</option>
            </select>
        </div>
    </div>
    
    <div style={ {marginBottom : '100px'}}>
        <button type="submit" className="btn btn-dark btn-block my-4 w-100" style={{ backgroundColor: '#393E46'}}>등록 완료</button>
    </div>
</form>

    );
};

export default PurchaseDetail;
