import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Post from '../../components/post/post';
import * as post from '../../apis/post/post';

const AllPostsContainer = () => {

    /* -----------------state--------------------- */
    const [postList, setPostList] = useState([]);
    
    /* ------------------------------------------- */
    

    /* -----------------functions----------------- */
    const getPostList = async () => {

        const response = await post.list();
        const data = await response.data;

        setPostList(data);

        // setPostList(null);   // 빈 게시글 시 화면체크
    }
    
    /* ------------------------------------------- */

    
    /* --------------------Hook-------------------- */
    useEffect ( () => {
        getPostList();
    },[])


    /* -------------------------------------------- */

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
                        {postList.map( (post) => 
                            <Post post={post} />
                        )}   
                    </div>
                </>
            }
        </div>
    )
}

export default AllPostsContainer