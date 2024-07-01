import React, { useEffect, useState } from 'react'
import * as posts from '../../apis/post/post'
import * as cmmt from '../../apis/post/comment';
import DetailPost from '../../components/post/DetailPost';

const PostContainer = ({postNo}) => {
    console.log("게시글번호: " + postNo);

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

    // ❓ Hook
    useEffect( () => {
        getPost();
        getCmmtList();
    }, [])
    

  return (
    <>
        <DetailPost post={post} fileList={fileList} cmmtList={cmmtList} />
    </>
  )
}

export default PostContainer