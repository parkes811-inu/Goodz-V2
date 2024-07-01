import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useEffect, useState } from 'react';
import Post from '../../components/post/Post';
import * as post from '../../apis/post/post';
import * as wish from '../../apis/user/wish';
import LikeBtn from '../../components/common/LikeBtn';
import WishBtn from '../../components/common/WishBtn';
import { LoginContext } from '../../contexts/LoginContextProvider';

const AllPostsContainer = () => {
    
    // const {userInfo} = useContext(LoginContext);
    // const { no, userId, authList } = userInfo;
    // console.log("유저아이디: " + userId);

    /* -----------------state--------------------- */
    const [postList, setPostList] = useState([]);
    // const [wishList, setWish] = useState([]);
    // const [LikeList, setLike] = useState([]);

    // const [isWished, setWish]

    
    

    /* -----------------functions----------------- */
    const getPostList = async () => {

        const response = await post.list();
        const data = await response.data;

        setPostList(data);

        // setPostList(null);   // 빈 게시글 시 화면체크
    }

    // const getWishList = async () => {
    //     const response = await wish.listById("post");
    //     const data = await response.data;

    //     setWish(data);
    //     console.log(data);
    // }
    

    
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
                        {postList.map( (post) => 
                            <>
                                <div className="item">
                                    <Post post={post} />
                                    <div class="d-flex justify-content-end column-gap-2 mt-2 px-2" >
                                        <WishBtn wishCount={99}/>
                                        <LikeBtn likeCount={99}/>
                                    </div>
                                </div>
                            </>
                        )}   
                    </div>
                </>
            }
        </div>
    )
}

export default AllPostsContainer