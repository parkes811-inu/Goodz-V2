import React from 'react';
import './css/NewArrivals.css';

const NewArrivals = ({ newArrivalsList }) => {
  console.log('NewArrivalsList:', newArrivalsList); // 디버깅을 위한 콘솔 로그

  return (
    <div className="NewArrivals">
      <h5 className="text-md-start fw-bold mt-5">New Arrivals</h5>
      {(!newArrivalsList || newArrivalsList.length === 0) ? (
        <div>
          <br /><br /><h5 className="text-body-tertiary text-center">최근 입고된 상품이 없습니다.</h5><br /><br />
        </div>
      ) : (
        <div className="row row-cols-2 row-cols-sm-2 row-cols-md-4 g-4" id="taggedStyles">
          {newArrivalsList.map((product) => {
            // 운영체제 경로를 웹 경로로 변환
            const imageUrl = product.imageUrl.replace('C:/upload', '').replace(/\\/g, '/');
            console.log('Image URL:', imageUrl); // 이미지 URL 디버깅
            return (
              <div className="col" key={product.pno}>
                <div className="card border-0">
                  <p>{product.pNo}</p> {/* 프로덕트 번호를 출력 */}
                  <div className="card-body">
                    <a href={`/product/${product.pno}`}>
                      <img src={`/files/${product.pno}`} alt="상품 이미지" className="rounded-4 w-100" />
                    </a>
                    <div className="card-text py-2">
                      <div className="d-flex justify-content-start column-gap-1">
                        <p className="user-id fw-bold m-0">{product.productName}</p>
                      </div>
                      <div className="d-flex justify-content-start column-gap-1">
                        <p>{product.formattedMinPrice}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
