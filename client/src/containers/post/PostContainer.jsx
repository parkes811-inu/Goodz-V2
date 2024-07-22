import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Carousel, Offcanvas } from 'react-bootstrap';
import { LoginContext } from '../../contexts/LoginContextProvider';
import * as posts from '../../apis/post/post'
import * as cmmt from '../../apis/post/comment';
import * as like from '../../apis/post/like';
import * as wish from '../../apis/user/wish';
import * as cmmtApi from '../../apis/post/comment';
import ProfileInfo from '../../components/common/ProfileInfo';
import BtnFollow from '../../components/post/BtnFollow';
import BtnWish from '../../components/common/BtnWish';
import BtnLike from '../../components/common/BtnLike';
import TagItem from '../../components/post/TagItem';

const PostContainer = ({postNo}) => {

    // console.log("게시글번호: " + postNo);
    const navigate = useNavigate();

    // 유저 정보
    const {userInfo} = useContext(LoginContext);
    let userId;

    // 👩‍💼⭕ 유저 로그인
    if (userInfo) {
        userId = userInfo.userId;
        // console.log("유저아이디: " + userId);
    }

    // 🔁 게시글 관련state
    const [writer, setWriter] = useState({})
    const [post, setPost] = useState({});
    const [fileList, setFileList] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [tagCount, setTagCount] = useState(0);
    
    // 🔁 댓글관련 status
    const [cmmtList, setCmmtList] = useState([]);
    const [countCmmt, setCountCmmt] = useState(0);
    const [inputCmmt, setComment] = useState('');

    // 🔁 모달창 status
    const [show, setShow] = useState(false);

    // 💨 모달창 function
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // 💨게시글 관련 function
    const getPost = async () => {
        
        try {
            const response = await posts.select(postNo);
            const data = await response.data;
            
            setWriter(data.writer);
            setPost(data.post);
            setFileList(data.fileList);
            setTagList(data.tagList);
            setTagCount(data.tagCount);
            
            console.log(data.writer);
        } catch (error) {
            console.log('게시글 조회 중 에러발생');
            console.log(error);
        }
    }
    
    /* 💨 댓글 관련 function */
    // 댓글 작성 감지
    const handleInputCmmt = (e) => {
        setComment(e.target.value)
        // console.log(e.target.value);
    }

    // 댓글 조회
    const getCmmtList = async () => {
        try {
            const response = await cmmt.list(postNo);
            const data = await response.data;
            
            const cmmtList = data.cmmtList;
            setCmmtList(cmmtList);
            const countCmmt = data.countCmmt;
            setCountCmmt(countCmmt);
            // console.log(data);
            
        } catch (error) {
            console.log('댓글 조회 중 에러발생');
            console.log(error);
        }
        
    }

    // 댓글 작성
    const onInsertCmmt = async() => {
        alert("작성자: " + userId + " 글번호: " + post.postNo +" 내용: " + inputCmmt);

        // 댓글 처리 전 확인사항
        // 1️⃣ 로그인된 사용자인지 확인
        if (userId == undefined || userId == null) {
            alert("로그인 후 이용가능합니다. ");
            let confirm = window.confirm("로그인페이지로 이동 하시겠습니까?");
            if (!confirm) { return; }   // No
            navigate("/users/login");   // Yes
            return;
        }

        // 2️⃣ 빈칸인지 확인
        if (inputCmmt == '') {
            alert('내용을 입력해주세요.');
        }
        
        try {
            const data = {
                'userId': userId,
                'postNo': postNo,
                'comment': inputCmmt 
            }
            
            const headers = {
                'content-type' : 'application/json'
            }
            const response = await cmmtApi.insert(data, headers);
            
            console.log(response);
            
            getCmmtList();
            
        } catch (error) {
            console.log('댓글 작성 처리 중 에러발생');
            console.log(error);
        }

        setComment('');
    } 
    
    // 댓글 삭제
    const onDeleteCmmt = async(cNo) => {
        // console.log("삭제할 댓글번호: " + cNo);
        let confirm = window.confirm("정말로 삭제하시겠습니까?");
        if (!confirm) { return; }

        try {
            const response = await cmmtApi.deleteCmmt(cNo);
            const data = response.data;
            console.log(data);
            // if (data === 'SUCCESS') {
            //     alert("댓글 삭제 성공!");
            // } else {
                //     alert("댓글 삭제 실패!ㅜㅜ");
                // }
                getCmmtList();
                    
        } catch (error) {
            console.log('댓글 삭제 처리 중 에러발생');
            console.log(error);
        }
    }
            
    /* 소셜 관련 function */
    /* 💛좋아요 */
    const handleLike = async (status, userId, postNo) =>  {
        
        console.log(status, userId, postNo);
        
        // 👩‍💼❌ 비 로그인 시
        if (userId == undefined || userId == null) {
            alert("로그인 후 이용가능합니다. ");
            let confirm = window.confirm("로그인페이지로 이동 하시겠습니까?");
            
            if (!confirm) { return; }
            
            navigate("/users/login");
            return;
        }
        
        // 👩‍💼⭕ 로그인 시
        // data
        const likeData = {
            'userId': userId,
            'postNo': postNo
        }
        // 헤더
        const headers = {
            'content-type' : 'application/json'
        }
        
        if (!status) {
            // 좋아요 등록 (false ➡ true)
            const response = await like.addLike(likeData, headers);
            const data = await response.data;
            console.log(data);
                
            } else {
                // 좋아요 삭제 (true ➡ false)
                const response = await like.deleteLike(likeData);
                const data = await response.data;
                console.log(data);
            }
            getPost();
        }
            
    /* 💌 관심 */
    const handleWish = async (status, userId, postNo) =>  {
        console.log(status, userId, postNo);
        
        // 👩‍💼❌ 비 로그인 시
        if (userId === undefined || userId == null) {
            alert("로그인 후 이용가능합니다. ");
            let confirm = window.confirm("로그인페이지로 이동 하시겠습니까?");
            
            if (!confirm) { return; }
            
            navigate("/users/login");
            return;
        }
        
        // 👩‍💼⭕ 로그인 시
        // data
        const wishData = {
            'userId': userId,
            'parentTable': "post",
            'parentNo': postNo
        }
        // 헤더
        const headers = {
            'content-type' : 'application/json'
        }
        
        if (!status) {
            // 관심 등록 (false ➡ true)
            const response = await wish.addWish(wishData, headers);
            const data = await response.data;
            console.log(data);
    
        } else {
            // 관심 삭제 (true ➡ false)
            const response = await wish.deleteWish(wishData);
            const data = await response.data;
            // console.log(data);
        }
                
        getPost();
    }
            
    /* 🔎 props */
    const postDetail = {writer, post, fileList, countCmmt, cmmtList, tagList, tagCount};
    const hadleFunctions = {handleLike, handleWish};
    
    // ❓ Hook
    useEffect( () => {
        getPost();
        getCmmtList();
    }, [])
    
    const {nickname, profileImgNo, content, likeCount, wishCount, wished, liked} = post;
    
    return (
        <>
            {/* <DetailPost postDetail={postDetail} hadleFunctions={hadleFunctions} onInsertCmmt={onInsertCmmt} onDeleteCmmt={onDeleteCmmt} /> */}
            <div className="mainContainer" style={{width: '640px'}}>
                <h3 className="text-center fw-bold my-4">STYLE</h3>
                <div className="socialBox d-flex justify-content-between mt-5 mb-2">
                    {/* 작성자 프로필정보 */}   
                    <ProfileInfo nickname={nickname} profileImgNo={profileImgNo} size={"-m"}    /> 

                    <div className="udpateDelete d-flex align-items-end">
                        {userId == undefined ?
                        <>
                            {/* 타인 게시글 -> 팔로우/팔로잉 */}
                            <BtnFollow followInfo={writer} />
                        </>
                        :
                        <>
                            {userId == writer.userId ?
                            <>
                                {/* 본인 게시글 -> 수정/삭제 */}
                                <Link to={`/styles/update/${postNo}`}>수정</Link>
                                <span>|</span>
                                <Link type="button" onClick={`deletePost(${postNo})`}>삭제</Link>
                            </>
                            :
                            <>
                            {/* 타인 게시글 -> 팔로우/팔로잉 */}
                            <BtnFollow followInfo={writer} />
                            </>
                            }
                        </>
                        }
                        
                    </div>
                </div>

                {/* 게시글 이미지 슬라이드*/}
                <div className="postImgs">
                    <Carousel style={{ width: '640px', margin: '0 auto'}}>
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
                    <div className="d-flex justify-content-end column-gap-2">
                        {/* <!-- 저장 --> */}
                        <BtnWish wishCount={wishCount} isWished={wished} handleWish={handleWish} postNo={postNo} />
                        {/* <!-- 좋아요 --> */}
                        <BtnLike likeCount={likeCount} isLiked={liked} handleLike={handleLike} postNo={postNo}/>
                        {/* <!-- 댓글 --> */}
                        <Button variant="none" onClick={handleShow} className="p-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" width="26" height="26">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                            </svg>
                            <span className="count">{countCmmt}</span>
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
                        <div className="mb-2">
                            <span>상품 태그 <span>{tagCount}</span>개</span>
                        </div>
                        <div className="product_list_area mb-5">
                            {!tagList || tagList.length === 0 ?
                                <>
                                    <h5 className="text-body-tertiary text-center">태그된 상품이 없습니다.</h5>
                                </>
                                :
                                <>
                                    <ul className="product_list row row-cols-1 row-cols-sm-2 row-cols-md-4 p-0 m-0">
                                        {/* <!-- [DB] 게시글에 포함된 상품태그 불러옴 --> */}
                                        {tagList.map((product) => {
                                            return (
                                                <li className="product_item text-start p-0">
                                                    <TagItem product={product} />
                                                </li>
                                            )
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
                                        {/* <input type="hidden" name="userId" id="cmmt_writer" value={userId} /> */}
                                        <input type="text" name="comment" id="cmmt_content" value={inputCmmt} onChange={handleInputCmmt} className="form-control bg-light border-secondary-subtle rounded-4" placeholder="댓글을 입력하세요." style={{width:'330px'}}/>
                                    </div>
                                    <button type="button" className="addCmmtBtn btn rounded-0 p-0 ms-3" onClick={()=>onInsertCmmt()}>등록</button>
                                </form>
                            </div>

                            {/* 댓글목록 */}
                            <div className="cmmt_list" id="cmmt_list">
                                <hr className="mb-2" />
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
                                                    <div className="d-flex justify-content-between">
                                                        <span style={{ fontWeight: 'bold', fontSize: 'small' }} className="mb-2">{cmmt.nickname}</span>
                                                        {
                                                            cmmt.userId == userId ?
                                                            // comment.java상 cNo가 맞는데 cno로 매핑되는 오류 있음.
                                                            <button type="button" className="btn-cmmt-delete btn text-body-tertiary" onClick={() => onDeleteCmmt(cmmt.cno)}>삭제</button>
                                                            :
                                                            <></>
                                                        }
                                                    </div>
                                                    <input type="hidden" name="userId" value={cmmt.userId} />
                                                    <p className="m-0">{cmmt.comment}</p>
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

export default PostContainer