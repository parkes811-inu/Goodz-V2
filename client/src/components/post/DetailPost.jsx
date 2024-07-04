import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import { Button, Offcanvas } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react'
import ProfileInfo from '../common/ProfileInfo'
import BtnWish from '../common/BtnWish';
import BtnLike from '../common/BtnLike';
import TagItem from  './TagItem';
import { LoginContext } from '../../contexts/LoginContextProvider';


const DetailPost = ({postDetail, hadleFunctions, onInsertCmmt, onDeleteCmmt}) => {

    // 🔎 props
    const {writer, post, fileList, cmmtList, countCmmt, tagList, tagCount} = postDetail;
    const {handleLike, handleWish} = hadleFunctions
    const {nickname, profileImgNo, postNo, content, likeCount, wishCount, wished, liked} = post;

    // console.log(tagList);
    // 화면전환을 위한 navigate
    const navigate = useNavigate();

    // 유저 정보
    const {userInfo} = useContext(LoginContext);
    let userId;

    // 👩‍💼⭕ 유저 로그인
    if (userInfo) {
        userId = userInfo.userId;
        // console.log("유저아이디: " + userId);
    }

    // console.log(fileList);
    // console.log(post);
    // console.log(cmmtList);

    // 🔁 모달창 status
    const [show, setShow] = useState(false);

    // 💨 모달창 function
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /* 🔁 댓글 status */
    const [inputCmmt, setComment] = useState('');
    
    /* 💨 댓글 function */
    const handleInputCmmt = (e) => {
        setComment(e.target.value)
        // console.log(e.target.value);
    }

    // 댓글 작성 처리
    const insertCmmt = () => {

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
        // alert(inputCmmt);
        onInsertCmmt(userId, postNo, inputCmmt);

        setComment('');
    }

    // 댓글 삭제 처리
    const deleteCmmt = (cNo) => {
        // alert("삭제할 댓글번호: " + cNo);
        // ✅ 삭제여부 더블체크
        let confirm = window.confirm("정말로 삭제하시겠습니까?");
        if (!confirm) { return; }   // No

        onDeleteCmmt(cNo);
    }
    
    return (
        <>
 
        </>
    )
}

export default DetailPost