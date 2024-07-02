import React, { useEffect, useState } from 'react'
import * as posts from '../../apis/post/post'
import * as cmmt from '../../apis/post/comment';
import DetailPost from '../../components/post/DetailPost';
import * as like from '../../apis/post/like';
import * as wish from '../../apis/user/wish';
import { useNavigate } from 'react-router-dom';

const PostContainer = ({postNo}) => {

    console.log("게시글번호: " + postNo);
    const navigate = useNavigate();

    // 🔁state
    const [post, setPost] = useState({});
    const [fileList, setFileList] = useState([]);
    
    // 🔁 댓글관련 status
    const [cmmtList, setCmmtList] = useState([]);
    
    // 💨이벤트 함수
    const getPost = async () => {

        const response = await posts.select(postNo);
        const data = await response.data;

        // 응답받은 게시글과 파일목록 꺼내기
        const post = data.post;
        const fileList = data.fileList;

        setPost(post);
        setFileList(fileList);
    }
    
    // 💨 댓글관련 function
    const getCmmtList = async () => {
        const response = await cmmt.list(postNo);
        const data = await response.data;

        console.log(data);

        setCmmtList(data);
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
                
                if (data === "SUCCESS") {
                    alert('좋아요 삭제완료');
                } else {
                    alert('좋아요 삭제실패');
                }
            }
            getPost();
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
    
            getPost();
        }
            

    // ❓ Hook
    useEffect( () => {
        getPost();
        getCmmtList();
    }, [])
    

  return (
    <>
        <DetailPost post={post} fileList={fileList} cmmtList={cmmtList} handleLike={handleLike} handleWish={handleWish} />
    </>
  )
}

export default PostContainer