import React from 'react'
import MainLayout from '../../layout/MainLayout'
import PostContainer from '../../containers/post/PostContainer'
import './css/Read.css';
import { useParams } from 'react-router-dom';

const Read = () => {
  // PathVariable 파라미터 가져오기
  const {postNo} = useParams();
  console.log(`요청게시글 번호: ${postNo}`)

  return (


    <MainLayout>
        <PostContainer  postNo={postNo} />
    </MainLayout>
  )
}

export default Read