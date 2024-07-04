import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Wishlist_Posts = ({ postList_wished }) => {
    // postList_wished는 부모 컴포넌트에서 props로 전달받은 게시글 리스트라고 가정합니다.

    // CSS 스타일 객체 정의
    const styles = {
        filterBar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
        },
        filterButtons: {
            display: 'flex',
        },
        filterButton: {
            padding: '5px 15px',
            marginRight: '10px',
            border: 'none',
            borderRadius: '18px',
            backgroundColor: '#f0f0f0',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        filterButtonActive: {
            backgroundColor: '#000',
            color: '#fff',
        },
        filterButtonHover: {
            backgroundColor: '#ddd',
        },
        postImg: {
            width: '100%',
            aspectRatio: '1 / 1', // 정사각형 비율 유지
            objectFit: 'cover',
        },
    };

    return (
        <div className="userMainContainer">
            <div className="border-bottom border-3 mb-3" style={{ borderColor: '#393E46' }}>
                <p className="fs-4 fw-bold mb-1">관심</p>
            </div>

            {/* 관심 상품/스타일 필터링 */}
            <div style={styles.filterBar}>
                <div style={styles.filterButtons}>
                    <button className="filter-button" onClick={() => window.location.href = '/users/wishlist/products'} style={styles.filterButton}>상품</button>
                    <button className="filter-button active" onClick={() => window.location.href = '/users/wishlist/posts'} style={{ ...styles.filterButton, ...styles.filterButtonActive }}>스타일</button>
                </div>
            </div>

            {/* 유저가 관심으로 등록한 게시글 리스트 */}
            {/* 관심 게시글 리스트가 없는 경우 */}
            {/* {postList_wished.length === 0 && (
                <div>
                    <br /><br />
                    <h2 className="text-body-tertiary text-center">조회된 게시글이 없습니다.</h2>
                </div>
            )} */}

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-3 my-1">
                {/* [DB] 관심 게시글 리스트 반복 */}
                {/* {postList_wished.map(post => (
                    <div key={post.postNo} className="col">
                        <a href={`/styles/${post.postNo}`}>
                            <img src={`/files/${post.fileNo}`} style={styles.postImg} alt="게시글" />
                        </a>
                    </div>
                ))} */}
            </div>
        </div>
    );
};

export default Wishlist_Posts;
