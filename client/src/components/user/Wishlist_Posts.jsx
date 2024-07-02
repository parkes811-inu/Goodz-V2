import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Wishlist_Posts = ({ postListWished }) => {

  return ( 
    // <div className="userMainContainer">

    //   <div className="border-bottom border-3 mb-3" style={{ borderColor: '#393E46' }}>
    //     <p className="fs-4 fw-bold mb-1">관심</p>
    //   </div>

    //   {/* 관심 상품/스타일 */}
    //   <div className="filter-bar">
    //     <div className="filter-buttons">
    //       <button className="filter-button" onClick={() => window.location.href = '/users/wishlist/products'}>상품</button>
    //       <button className="filter-button active" onClick={() => window.location.href = '/users/wishlist/posts'}>스타일</button>
    //     </div>
    //   </div>

    //   {/* 유저가 관심으로 등록한 게시글 리스트 */}
    //   {/* 관심 게시글 리스트가 없는 경우 */}
    //   {postListWished && postListWished.length === 0 ? (
    //     <div>
    //       <br /><br />
    //       <h2 className="text-body-tertiary text-center">조회된 게시글이 없습니다.</h2>
    //     </div>
    //   ) : (
    //     <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-3 my-1">
    //       {/* [DB] 관심 게시글 리스트 반복 */}
    //       {postListWished.map((post, index) => (
    //         <div className="col" key={index}>
    //           <a href={`/styles/${post.postNo}`}>
    //             <img src={`/files/${post.fileNo}`} className="postImg" alt="게시글" />
    //           </a>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
    <div>안녕하세요</div>
  );
}

export default Wishlist_Posts;
