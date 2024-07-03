import React from 'react';
import AdminLayout from '../../layout/AdminLayout';
import ProductInsertContainer from '../../containers/admin/ProductInsertContainer';


function ProductInsertPage() {
    return (
        <AdminLayout>

            <div className="container mt-5">
                <h2 className="fs-4 fw-bold p-0">상품 등록</h2>
                <ProductInsertContainer />
            </div>
        </AdminLayout>
    );
}

export default ProductInsertPage;