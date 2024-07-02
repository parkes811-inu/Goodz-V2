import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import { Button, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import * as cmmt from '../../apis/post/comment';
import ProfileInfo from '../common/ProfileInfo'
import WishBtn from '../common/WishBtn';
import LikeBtn from '../common/LikeBtn';
import TagItem from './TagItem';

const DetailPost = ({post, fileList, cmmtList}) => {
    // console.log(fileList);
    
    console.log(cmmtList);
    

    // 🔁 게시글 status
    const {userId, nickname, profileImgNo, postNo, content, likeCount, wishCount} = post;
    
    // 🔁 모달창 status
    const [show, setShow] = useState(false);
    // 💨 모달창 function
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const deleteCmmt = (cmmt.cNo) => console.log(cmmt, cNo)
    

    // 하드코딩
    const tagCount = 5;
    const taggedProducts = [];

    return (
        <>
            <div className="mainContainer" style={{width: '640px'}}>
                <h3 className="text-center fw-bold my-4">STYLE</h3>
                <div className="socialBox d-flex justify-content-between mt-5 mb-2">
                    {/* 작성자 프로필정보 */}   
                    <ProfileInfo nickname={nickname} profileImgNo={profileImgNo} size={"-m"}    /> 

                    <div className="udpateDelete d-flex align-items-end">
                        {/* 본인 게시글 -> 수정/삭제 */}
                        <Link to={`/styles/update/${postNo}`}>수정</Link>
                        <span>|</span>
                        <Link type="button" onClick={`deletePost(${postNo})`}>삭제</Link>
                        
                        {/* 타인 게시글 -> 팔로우/팔로잉 */}
                        <button type="button" className="followBtn btn btn-dark btn-sm" id="follow" onClick="updateFollow(this)" data-profileId={`${userId}`}>팔로우</button>
                    </div>
                </div>

                {/* 게시글 이미지 슬라이드*/}
                <div className="postImgs">
                    <Carousel className='' style={{ width: '640px', margin: '0 auto'}}>
                        {fileList.map(file => (
                            <Carousel.Item key={file.no}>
                                <img src={`/files/${file.no}`} className="d-block w-100 img-fluid rounded-2" alt={`file-${file.no}`} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>

                {/* 게시글 버튼들 */}
                <div className="social_contents mt-2">
                    {/* <!-- 소셜버튼들 --> */}
                    <div className="d-flex justify-content-end column-gap-2 px-2">
                        {/* <!-- 저장 --> */}
                        <WishBtn wishCount={wishCount}/>
                        {/* <!-- 좋아요 --> */}
                        <LikeBtn likeCount={likeCount} />
                        {/* <!-- 댓글 --> */}
                        <Button variant="none" onClick={handleShow} className="me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" width="26" height="26">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                            </svg>
                            <span className="count" id="countCmmt"></span>
                        </Button>
                    </div>
                </div>

                {/* 게시글 내용 */}
                <div className="social_text mt-2 mb-5">
                    <p className="text_title fs-4 text-start">{content}</p>
                </div>

                {/* <!-- 상품태그 영역 --> */}
                <div className="productTags">
                    <div className="product_title text-start mt-5">
                        <span>상품 태그 <span>{tagCount}</span>개</span>
                        <div className="product_list_area mb-5">
                            {!taggedProducts ?
                                <>
                                    <h5 className="text-body-tertiary text-center">태그된 상품이 없습니다.</h5>
                                </>
                                :
                                <>
                                    <ul className="product_list row row-cols-1 row-cols-sm-2 row-cols-md-4 p-0 m-0">
                                        {/* <!-- [DB] 게시글에 포함된 상품태그 불러옴 --> */}
                                        {taggedProducts.map((product) => {
                                            <li className="product_item text-start p-0">
                                                <TagItem product={product}/>
                                            </li>
                                        })}
                                    </ul>
                                </>
                            }
                        </div>
                    </div>
                </div>

                {/* 댓글 모달창 */}
                <Offcanvas show={show} onHide={handleClose} placement={"end"} className="modal-cmmt" style={{ width: '500px' }}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>댓글</Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <div className="comment_container">
                            {/* 댓글 입력 */}
                            <div className="comment_input d-flex align-items-center">
                                <img src={`/files/${profileImgNo}`} className="profile-img-m" alt="프로필 이미지" />
                                <form method="post" className="d-flex align-items-center">
                                    <div className="ms-3">
                                        <input type="hidden" name="userId" id="cmmt_writer" value={userId} />
                                        <input type="text" name="comment" id="cmmt_content" className="form-control bg-light border-secondary-subtle rounded-4" placeholder="댓글을 입력하세요." style={{width:'330px'}}/>
                                    </div>
                                    <button type="button" className="addCmmtBtn btn rounded-0 p-0 ms-3" onClick="insertCmmt()">등록</button>
                                </form>
                            </div>

                            {/* 댓글목록 */}
                            <div className="cmmt_list" id="cmmt_list">
                                <hr class="mb-2" />
                                {
                                    !cmmtList ?
                                    <>
                                        <br /><br />
                                        <p className="text-body-tertiary text-center">첫 댓글 달기</p>
                                    </>
                                    :
                                    <>
                                        <div className="comment px-1">
                                            {cmmtList.map((cmmt, index) => (
                                                <div key={index}>
                                                    <p style={{ fontWeight: 'bold', fontSize: 'small' }} className="mb-2">{cmmt.nickname}</p>
                                                    <input type="hidden" name="userId" value={cmmt.userId} />
                                                    <p className="m-0">{cmmt.comment}</p>
                                                    <div className="d-flex justify-content-end">
                                                        <button type="button" className="btn-cmmt-delete btn p-0 text-body-tertiary" style={{ fontSize: 'small', width: '40px' }}>삭제</button>
                                                    </div>
                                                    <hr className="mb-2 mt-1" />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    )
}

export default DetailPost