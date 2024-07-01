import React, { useEffect } from 'react';
import './css/PopularPosts.css';

const PopularPosts = ({ popularPosts }) => {
  useEffect(() => {
    let page = 1;
    const size = 4;
    const postsListContainer = document.getElementById('postsList');
    let allPostsLoaded = false;
    const loadedPosts = new Set();

    const loadMorePosts = () => {
      if (allPostsLoaded) return;

      fetch(`/index/posts?page=${page}&size=${size}`)
        .then(response => response.json())
        .then(data => {
          if (data.length === 0) {
            allPostsLoaded = true;
            return;
          }

          if (data.length < size) {
            allPostsLoaded = true;
          }

          data.forEach(post => {
            if (!loadedPosts.has(post.postNo)) {
              loadedPosts.add(post.postNo);

              const col = document.createElement('div');
              col.classList.add('col');

              const card = `
                <div class="card border-0">
                  <div class="card-text py-2">
                    <a href="/styles/user/@${post.nickname}" class="d-flex justify-content-start column-gap-1" style="text-decoration: none; color: #393E46;">
                      <img src="/files/${post.profileImgNo}" alt="프로필이미지" class="profile_img">
                      <p class="userId fw-bold m-0">${post.nickname}</p>
                    </a>
                  </div>
                  <a href="/styles/${post.postNo}">
                    <img src="/files/${post.fileNo}" alt="게시글" class="rounded-4" style="width: 100%;">
                  </a>
                </div>
              `;
              col.innerHTML = card;
              postsListContainer.appendChild(col);
            }
          });
          page++;
        })
        .catch(error => console.error('Error:', error));
    };

    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    loadMorePosts();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="PopularPosts mb-5">
      <h5 className="text-md-start fw-bold mt-5">Popular Posts</h5>
      {(!popularPosts || popularPosts.length === 0) ? (
        <div>
          <br /><br /><h5 className="text-body-tertiary text-center" id="noProductsMessage">조회된 게시글이 없습니다.</h5><br /><br />
        </div>
      ) : (
        <div className="row row-cols-2 row-cols-sm-2 row-cols-md-4 row-cols-lg-4 g-3" id="postsList">
          {popularPosts.map((post) => (
            <div className="col" key={post.postNo}>
              <div className="card-text py-2">
                <a href={`/styles/user/${post.nickname}`} className="d-flex justify-content-start column-gap-1" style={{ textDecoration: 'none', color: '#393E46' }}>
                  <img src={`/files/${post.profileImgNo}`} alt="프로필이미지" className="profile_img" />
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
    </div>
  );
};

export default PopularPosts;
