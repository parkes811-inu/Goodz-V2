import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import UserIndex from './pages/user/Index';
import Top from './pages/product/Top';
import Pants from './pages/product/Pants';
import Shoes from './pages/product/Shoes';
import Accessory from './pages/product/Accessory';
import AllProduct from './pages/product/AllProduct';
import AllPosts from './pages/post/AllPosts';
import Read from './pages/post/Read';
import AdminIndex from './pages/admin/AdminIndex';
import LoginPage from './pages/user/LoginPage';
import LoginContextProvider, { LoginContext } from './contexts/LoginContextProvider';
import { useContext } from 'react';
import BrandListPage from './pages/admin/BrandListPage';

// 보호된 라우트를 위한 컴포넌트
const ProtectedRoute = ({children, requiredRole}) => {
  const {roles, isLogin} = useContext(LoginContext);

  if (!isLogin) {
    console.log("권한: " + roles)
    return <Navigate to="/users/login" replace />;
  }

  if (!roles.isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (!roles.isUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users/login" element={<LoginPage />} />
      {/* 헤더 접근 링크 */}
      <Route path="/product/top" element={<Top />} />
      <Route path="/product/pants" element={<Pants />} />
      <Route path="/product/shoes" element={<Shoes />} />
      <Route path="/product/accessory" element={<Accessory />} />
      <Route path="/styles" element={<AllPosts />} />
      <Route path="/product" element={<AllProduct />} />

      {/* 어드민만 접근 가능한 곳 */}
      <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <AdminIndex />
          </ProtectedRoute>
        }/>
        <Route path="/admin/brands" element={
          <ProtectedRoute requiredRole="admin">
            <BrandListPage />
          </ProtectedRoute>
        }/>

      {/* 로그인된 유저만 접근 가능한 곳 */}
      <Route path='/users'
        element={
          // <ProtectedRoute requiredRole="user">
            <UserIndex />
          // </ProtectedRoute>
          }>
      </Route>
      <Route path='/users/wishList/products'
        element={
          <ProtectedRoute requiredRole="user">
            <wishProducts />
          </ProtectedRoute>}>
      </Route>

      {/* post */}
      <Route path="/styles/:postNo" element={<Read />}></Route>
      {/* 다른 보호된 라우트들을 여기에 추가할 수 있습니다 */}
    </Routes>
  );
}


function App() {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <AppRoutes />
      </LoginContextProvider>
    </BrowserRouter>
  );
}

export default App;
