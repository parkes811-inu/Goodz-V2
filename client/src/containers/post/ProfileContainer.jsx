import React, { useContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import * as follow from '../../apis/post/follow';
import * as post from '../../apis/post/post';
import * as like from '../../apis/post/like';
import * as wish from '../../apis/user/wish';
import BtnFollow from './BtnFollow';
import BtnFollowing from './BtnFollowing';
import BtnWish from  '../../components/common/BtnWish';
import BtnLike from  '../../components/common/BtnLike';
import { Button } from 'react-bootstrap';
import ModalFollow from '../../components/post/ModalFollow';
import { LoginContext } from '../../contexts/LoginContextProvider';

const ProfileContainer = ({nickname}) => {

    const navigate = useNavigate();

    // 유저 정보
    const {userInfo} = useContext(LoginContext);
    let viewer;

    // 👩‍💼⭕ 유저 로그인
    if (userInfo) {
        viewer = userInfo.userId;
        console.log("유저아이디: " + viewer);
    }
    
    // 🔁 프로필 유저
    const [profileUser, setProfileUser] = useState({});
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const [postList, setPostList] = useState([]);

    // 💨 프로필유저 + 게시글 functions
    const getPostList = async () => {
        
        try {
            // console.log("게시글 요청")
            const response = await post.setProfile(nickname);
            const data = await response.data;
            // console.log(data.profileUser);
            // console.log(data.postList);
            setProfileUser(data.profileUser);
            setPostList(data.postList);
            
        } catch (error) {
            console.error('게시글을 가져오는 중 오류 발생:', error);
        }
    }

    /* 🔁 팔로우/팔로잉 모달 */
    const [mFollower, setMFollower] = useState(false);
    const [mFollowing, setMFollowing] = useState(false);

    /* 💨 팔로우/팔로잉 + 게시글 functions */
    const getFollowers = async (userId) => {
        if (userId === undefined || userId == null) {
            console.log("조회할 아이디가 존재하지않습니다. - 비로그인")
            return;
        }
        const response =  await follow.followerList(userId);
        const data = response.data;
        console.log(data);
    }
    const getFollowings = async (userId) => {
        if (userId === undefined || userId == null) {
            console.log("조회할 아이디가 존재하지않습니다. - 비로그인")
            return;
        }
        const response =  await follow.followingList(userId);
        const data = response.data;
        console.log(data);
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

    // ❓ Hook
    useEffect ( () => {
        getPostList();
        // getFollowers(profileUser.userId);   // 프로필 계정의 팔로워 조회
        // getFollowings(profileUser.userId);  // 프로필 계정의 팔로잉 조회
        // getFollowings(viewer)               // 조회하는 계정의 팔로잉 조회
        
    },[])

    useEffect( () => {
        getFollowers(profileUser.userId);   // 프로필 계정의 팔로워 조회
        getFollowings(profileUser.userId);  // 프로필 계정의 팔로잉 조회
        getFollowings(viewer)               // 조회하는 계정의 팔로잉 조회
    }, [postList])


    // 🔎 props
    // const profileInfo = {profileUser, folloers, followings};
    // const {profileUser, followers, followings} = profileInfo;
    // const {profileImgNo, profileNickname, userId} = profileUser;



    return (
        <>
            {/* <!-- 유저 정보 --> */}
            <div className="user d-flex justify-content-start justify-content-between align-items-end mt-4">
                <div className="user d-flex justify-content-start mt-4">
                    {/* <!-- 프사 --> */} 
                    { !profileUser.profileImgNo || profileUser.profileImgNo == null ?
                        <img src="/img/user/basic_social.png" alt="프로필이미지" className="profile-img-lg" />
                    :
                        <img src={`/files/${profileUser.profileImgNo}`} alt="프로필이미지" className="profile-img-lg"/>
                    }

                    <div className="d-flex flex-column justify-content-center ms-3">
                        <div className="user_nickname_area mb-2 d-flex justify-content-start">
                            {/* <!-- 유저닉네임 --> */}
                            <p className="userNickname fs-2 m-0 text-start">{nickname}</p>

                            {/* <!-- 프로필 관리 버튼 --> */}
                            {viewer === profileUser.userId ?
                            <div className="d-flex align-items-center justify-content-center">
                                <Link to={'/user/manage_info'} className="btn border-secondary-subtle ms-3"  style={{color: 'rgb(80, 80, 80)', fontSize: 'smaller', width: '100px', height: '30px'}}>
                                    프로필 관리
                                </Link>
                            </div>
                            :
                            <></>
                            }
                        </div>

                        {/* <!-- 팔로워/팔로잉 정보 --> */}
                        <div className="followInfo d-flex text-start">
                            <Button onClick={() => setMFollower(true)} className='btn ps-0 pe-2 py-0'><span>팔로워 {followers.length}</span></Button>
                            <ModalFollow show={mFollower} onHide={() => setMFollower(false)} title={"팔로워"} />
                            <span className="text-body-tertiary ">|</span>
                            <Button onClick={() => setMFollowing(true)} className='btn ps-2 py-0'><span>팔로잉 {followings.length}</span></Button>
                            <ModalFollow show={mFollowing} onHide={() => setMFollowing(false)} title={"팔로잉"}/>
                        </div>

                    </div>
                </div>
                {viewer === profileUser.userId ?
                    <>
                    {/*  본인프로필 ➡ 게시글 등록 */}
                        <Link href="/styles/insert" className="p-0" style={{ color: "black", display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid black", padding: "5px", borderRadius: "4px", textDecoration: "none" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" width="24px" height="24px">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </Link>
                    </>
                    :
                    <>
                    {/* 타인프로필 ➡ 팔로우/팔로잉버튼 */}
                        <BtnFollow />
                        <BtnFollowing />
                    </>
                }
                
            </div>

            <hr className="my-2"></hr>

            {/* <!-- [DB] 게시글 반복 위치 --> */}
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-3" style={{marginBottom: '70px'}}>
            { !postList || postList.length === 0 ?
            <>
                {/* <!-- 조회된 게시글이 없는 경우 --> */}
                <p className="fw-bold mx-auto text-center text-body-tertiary mt-5">등록된 스타일이 없습니다!</p>
            </>
            :
            <>
                {/* <!-- 조회된 게시글이 있는 경우 --> */}
                {postList.map((post) => (
                    <div className="col">
                        <div className="card border-0">
                            <div className="card-body">
                                {/* <!--[DB] 이미지 --> */}
                                {/* <!-- <a href="/styles/cmmtX"> --> */}
                                <Link to={`/styles/${post.postNo}`}>
                                    <img src={`/files/${post.fileNo}`} alt="게시글" className="rounded-4" style={{width: '100%'}} />
                                </Link>
                                {/* <!--[DB] 스크랩 & 하트 --> */}
                                <div className="d-flex justify-content-end column-gap-2 mt-2 px-2">
                                    <BtnWish wishCount={post.wishCount} isWished={post.wished} handleWish={handleWish} postNo={post.postNo} />
                                    <BtnLike likeCount={post.likeCount} isLiked={post.liked} handleLike={handleLike} postNo={post.postNo}/>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </>
            }

            </div>
        </>
    )
}

export default ProfileContainer