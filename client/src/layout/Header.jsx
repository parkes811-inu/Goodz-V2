import 'bootstrap/dist/css/bootstrap.min.css';
import './Common.css'
import './Header.css'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { LoginContext } from '../contexts/LoginContextProvider';

const Header = () => {
  // 유저의 상태에 따라서 로그인/로그아웃 표시
    // LoginContext 가져오기
    // (state)  isLogin
    // (function) logout

    // props로 받아서 쓰는게 아니라 useContext로 바로 받아서 씀
    const {isLogin, logout, roles} = useContext(LoginContext);

  return (
    <header>
      <nav className='header_container'>
        <div className="container d-flex justify-content-between align-items-center">
          <div className=''>
            {/* 로고 */}
            <div className="logo">
              <Link to="/">
                <img src="/img/Goodz_logo3.png" alt="Goodz Logo" />
              </Link>
            </div>

            {/* 좌측 - 상품 카테고리 */}
            <div className='links-category'>
              <ul>
                <li className='Header-li'>
                  <Link to={"/product/top"}>상의</Link>
                </li>
                <li className='Header-li'>
                  <Link to="/product/pants">하의</Link>
                </li>
                <li className='Header-li'>
                  <Link to="/product/shoes">신발</Link>
                </li>
                <li className='Header-li'>
                  <Link to="/product/accessory">액세서리</Link>
                </li>
              </ul>
            </div>
          </div>

            <div className='d-flex flex-column align-items-end'>
              {/* 우측 상단 - 유저관련 링크 */}
              <div className='links-user d-flex flex-column align-items-end'>
                <ul>
                  {/* 관심 */}
                  <li className='Header-li'>
                    <Link to={"/users/wishlist/products"}>관심</Link>
                  </li>
                  <li className='Header-li'>
                    { roles.isAdmin ? 
                      <>
                        <Link to="/admin">관리자페이지</Link>
                      </>
                      :
                      <>
                        <Link to="/users">마이페이지</Link>
                      </>
                    }
                  </li>
                  <li className='Header-li'>
                    {
                      isLogin ?
                      <>
                        <Link onClick={ () => logout() }>로그아웃</Link>
                      </>
                      :
                      <>
                        <Link to="/users/login">로그인</Link>
                      </>
                    }
                  </li>
                </ul>
              </div>

              {/* 우측 하단 - 메인 페이지들 */}
              <div className='links-main'>
                <ul>
                  {/* 관심 */}
                  <li className='Header-li'>
                    <Link to={"/"}>HOME</Link>
                  </li>
                  <li className='Header-li'>
                    <Link to="/styles">STYLE</Link>
                  </li>
                  <li className='Header-li'>
                    <Link to="/product">SHOP</Link>
                  </li>
                </ul>
              </div>
              
            </div>

        </div>
      </nav>

      {/* <!-- 구분선 --> */}
      <div className="seperation"></div>
    </header>
  )
}

export default Header