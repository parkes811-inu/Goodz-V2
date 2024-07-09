import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/PopularPosts.css';

const PopularPosts = ({ initialPopularPosts }) => {

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const size = 4;
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialPopularPosts && initialPopularPosts.length > 0) {
      setPosts(initialPopularPosts);
    }
  }, [initialPopularPosts]);

  const loadMorePosts = async () => {
    if (allPostsLoaded || loading) return;

    setLoading(true);

    try {
      const response = await axios.get(`/index/posts?page=${page}&size=${size}`);
      const data = response.data;

      if (data.length === 0) {
        setAllPostsLoaded(true);
      } else {
        setPosts(prevPosts => [...prevPosts, ...data]);
        setPage(prevPage => prevPage + 1);
        if (data.length < size) {
          setAllPostsLoaded(true);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) {
      loadMorePosts();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [allPostsLoaded, page, loading]);

  return (
    <div className="PopularPosts mb-5">
      <h5 className="text-md-start fw-bold mt-5">Popular Posts</h5>
      {(!posts || posts.length === 0) ? (
        <div>
          <br /><br /><h5 className="text-body-tertiary text-center" id="noProductsMessage">조회된 게시글이 없습니다.</h5><br /><br />
        </div>
      ) : (
        <div className="row row-cols-2 row-cols-sm-2 row-cols-md-4 row-cols-lg-4 g-3" id="postsList">
          {posts.map((post) => (
            <div className="col" key={post.postNo}>
              <div className="card-text py-2">
                <a href={`/styles/user/${post.nickname}`} className="d-flex justify-content-start column-gap-1" style={{ textDecoration: 'none', color: '#393E46' }}>
                  <img 
                    src={`/files/${post.profileImgNo}`} 
                    alt="프로필이미지" 
                    className="profile_img" 
                    onError={(e) => { e.target.onerror = null; e.target.src = '/img/user/basic_social.png'; }}
                  />
                  <p className="userId fw-bold m-0">{post.nickname}</p>
                </a>
              </div>
              <a href={`/styles/${post.postNo}`}>
                <img src={`/files/${post.fileNo}`} alt="게시글" className="rounded-4" style={{ width: '100%' }} />
              </a>
            </div>
          ))}
        </div>
      )}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default PopularPosts;
