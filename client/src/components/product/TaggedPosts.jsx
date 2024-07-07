import React from 'react';

const TaggedPosts = ({ taggedPosts }) => {
    if (!taggedPosts || taggedPosts.length === 0) {
        return (
            <div className="container mt-4">
                <h5 className="text-md-start fw-bold mt-5" style={{ paddingRight: '100px' }}>태그된 스타일</h5>
                <h5 className="text-body-tertiary text-center">아직 태그된 상품이 없습니다.</h5>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h5 className="text-md-start fw-bold mt-5" style={{ paddingRight: '100px' }}>태그된 스타일</h5>
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-3">
                {taggedPosts.map((post, index) => (
                    <div className="col" key={index}>
                        <div className="card-text py-2">
                            <a href={`/styles/user/${post.nickname}`} className="d-flex justify-content-start column-gap-1" style={{ textDecoration: 'none', color: '#393E46' }}>
                                <img src={`/files/${post.profileImgNo}`} alt="프로필이미지" className="profile-img" />
                                <p className="userId fw-bold m-0">{post.nickname}</p>
                            </a>
                        </div>
                        <a href={`/styles/${post.postNo}`}>
                            <img src={`/files/${post.fileNo}`} alt="게시글" className="rounded-4" style={{ width: '100%' }} />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaggedPosts;
