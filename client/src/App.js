import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
import ProductListPage from './pages/admin/ProductListPage';
import PayPage from './pages/admin/PayPage';
import PurchasePage from './pages/admin/PurchasePage';
import BrandInsertPage from './pages/admin/BrandInsertPage';
import OAuth2RedirectHandler from './components/user/OAuth2RedirectHandler';
import Index from './components/user/Index';
import MyPage from './pages/user/MyPage';
import Purchase from './pages/user/Purchase';
import Sales from './pages/user/Sales';
import Wishlist_Products from './pages/user/Wishlist_Products';
import Manage_Info from './pages/user/Manage_Info';
import Address from './pages/user/Address';
import Account from './pages/user/Account';

import ProductInsertPage from './pages/admin/ProductInsertPage';

// 보호된 라우트를 위한 컴포넌트
const ProtectedRoute = ({ children, requiredRole }) => {
  const { roles, isLogin } = useContext(LoginContext);

  if (!isLogin) {
    console.log("권한: " + roles)
    return <Navigate to="/users/login" replace />;
  }

  if (requiredRole === 'admin' && !roles.isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole === 'user' && !roles.isUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

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
      } />
      <Route path="/admin/brands" element={
        <ProtectedRoute requiredRole="admin">
          <BrandListPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/products" element={
        <ProtectedRoute requiredRole="admin">
          <ProductListPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/pay_history" element={
        <ProtectedRoute requiredRole="admin">
          <PayPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/purchase_state" element={
        <ProtectedRoute requiredRole="admin">
          <PurchasePage />
        </ProtectedRoute>
      } />
      <Route path="/admin/add_brand" element={
        <ProtectedRoute requiredRole="admin">
          <BrandInsertPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/add_product" element={
        <ProtectedRoute requiredRole="admin">
          <ProductInsertPage />
        </ProtectedRoute>
      } />

      {/* 로그인된 유저만 접근 가능한 곳 */}
      <Route path='/users'
        element={
          // <ProtectedRoute requiredRole="users">
              <MyPage />
          // </ProtectedRoute>
        }>
      </Route>
      <Route path="/users/purchase" element={
          // <ProtectedRoute requiredRole="user">
              <Purchase />
          // </ProtectedRoute>
        }/>
      <Route path="/users/sales" element={
          // <ProtectedRoute requiredRole="user">
              <Sales />
          // </ProtectedRoute>
        }/>
      <Route path="/users/wishList/products" element={
          // <ProtectedRoute requiredRole="user">
              <Wishlist_Products />
          // </ProtectedRoute>
        }/>
      <Route path="/users/wishList/posts" element={
          // <ProtectedRoute requiredRole="user">
              <Wishlist_Products />
          // </ProtectedRoute>
        }/>
        <Route path="/users/manage_info" element={
          // <ProtectedRoute requiredRole="user">
              <Manage_Info />
          // </ProtectedRoute>
        }/>
        <Route path="/users/address" element={
          // <ProtectedRoute requiredRole="user">
              <Address />
          // </ProtectedRoute>
        }/>
          <Route path="/users/account" element={
          // <ProtectedRoute requiredRole="user">
              <Account />
          // </ProtectedRoute>
        }/>


      {/* <Route path='/users/wishList/products'
        element={
          <ProtectedRoute requiredRole="user">
            <wishlist_products />
          </ProtectedRoute>}>
      </Route> */}

      {/* 다른 보호된 라우트들을 여기에 추가할 수 있습니다 */}
      <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
      <Route path="/styles/:postNo" element={<Read />} />
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
