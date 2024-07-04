import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useEffect, useState } from 'react';
import Post from '../../components/post/Post';
import * as post from '../../apis/post/post';
import * as wish from '../../apis/user/wish';
import * as like from '../../apis/post/like';
import BtnLike from '../../components/common/BtnLike';
import BtnWish from '../../components/common/BtnWish';
import { LoginContext } from '../../contexts/LoginContextProvider';
import { useNavigate } from 'react-router-dom';

const AllPostsContainer = () => {

    const navigate = useNavigate();

    // 🔁state
    const [postList, setPostList] = useState([]);


    // 💨 functions
    const getPostList = async () => {
        
        try {
            // console.log("게시글 요청")
            const response = await post.list();
            const data = await response.data;
            setPostList(data);
            
        } catch (error) {
            console.error('게시글을 가져오는 중 오류 발생:', error);
        }
        
        // setPostList(null);   // 빈 게시글 시 화면체크
    }
    
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
    
            // console.log(data);
            getPostList();

            // if (data === "SUCCESS") {
            //     alert('좋아요 등록완료');
            // } else {
            //     alert('좋아요 등록실패');
            // }
            
        } else {
            // 좋아요 삭제 (true ➡ false)
            const response = await like.deleteLike(likeData);
            const data = await response.data;
            // console.log(data);
    
            getPostList();

            // if (data === "SUCCESS") {
            //     alert('좋아요 삭제완료');
            // } else {
            //     alert('좋아요 삭제실패');
            // }
        }
    }
    
    /* 💌 관심 */
    const handleWish = async (status, userId, postNo) =>  {
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
            // console.log(data);
    
            

            // if (data === "SUCCESS") {
            //     alert('관심 등록완료');
            // } else {
            //     alert('관심 등록실패');
            // }
            
        } else {
            // 관심 삭제 (true ➡ false)
            const response = await wish.deleteWish(wishData);
            const data = await response.data;
            // console.log(data);
    
            // if (data === "SUCCESS") {
            //     alert('관심 삭제완료');
            // } else {
            //     alert('관심 삭제실패');
            // }
        }

        getPostList();
    }
                
         
    /* --------------------Hook-------------------- */
    useEffect ( () => {
        getPostList();
    },[])
                     

    return (

        <div className="mainContainer">
            {/* 여기서 받아온 게시글을 map 반복 돌려서 Post컴포넌트 반복함. */}
             <h3 className="text-center fw-bold my-4">STYLE</h3>
            { !postList ?
                <>
                    {/* 게시글이 존재하지 않는 경우 */}
                    <h2 className="text-body-tertiary text-center">조회된 게시글이 없습니다.</h2>
                </>
                :
                <>
                    {/* 게시글이 존재하는 경우 */}
                    <div className="grid">
                        {postList.map(post => (
                            <div className="item" key={post.no}>
                                <Post post={post} />
                                <div className="d-flex justify-content-end column-gap-2 mt-2 px-2">
                                    {/* BtnWish와 BtnLike 컴포넌트에 handleWish와 handleLike prop을 전달하여 클릭 이벤트를 처리가능 */}
                                    <BtnWish wishCount={post.wishCount} isWished={post.wished} handleWish={handleWish} postNo={post.postNo} />
                                    <BtnLike likeCount={post.likeCount} isLiked={post.liked} handleLike={handleLike} postNo={post.postNo}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            }
        </div>
    )
}

export default AllPostsContainer