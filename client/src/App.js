import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Index from './pages/user/Index';
import Top from './pages/product/Top';
import Pants from './pages/product/Pants';
import Shoes from './pages/product/Shoes';
import Accessory from './pages/product/Accessory';
import AllPosts from './pages/post/AllPosts';
import AllProduct from './pages/product/AllProduct';
import wishlist_products from './pages/user/wishlist_products';
import AdminIndex from './pages/admin/AdminIndex';
import LoginPage from './pages/user/LoginPage';
import LoginContextProvider, { LoginContext } from './contexts/LoginContextProvider';
import { useContext } from 'react';
import BrandListPage from './pages/admin/BrandListPage';
import ProductListPage from './pages/admin/ProductListPage';
import PayPage from './pages/admin/PayPage';
import PurchasePage from './pages/admin/PurchasePage';
import BrandInsertPage from './pages/admin/BrandInsertPage';

// 보호된 라우트를 위한 컴포넌트
const ProtectedRoute = ({children, requiredRole}) => {
  const {roles, isLogin} = useContext(LoginContext);

  if (!isLogin) {
    return <Navigate to="/" replace />;
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
        <Route path="/admin/products" element={
          <ProtectedRoute requiredRole="admin">
            <ProductListPage />
          </ProtectedRoute>
        }/>
         <Route path="/admin/pay_history" element={
          <ProtectedRoute requiredRole="admin">
            <PayPage />
          </ProtectedRoute>
        }/>
        <Route path="/admin/purchase_state" element={
          <ProtectedRoute requiredRole="admin">
            <PurchasePage />
          </ProtectedRoute>
        }/>
        <Route path="/admin/add_brand" element={
          <ProtectedRoute requiredRole="admin">
            <BrandInsertPage />
          </ProtectedRoute>
        }/>

      {/* 로그인된 유저만 접근 가능한 곳 */}
      <Route path='/users'
        element={
          <ProtectedRoute requiredRole="user">
            <Index />
          </ProtectedRoute>}>
      </Route>
      <Route path='/users/wishList/products'
        element={
          <ProtectedRoute requiredRole="user">
            <wishlist_products />
          </ProtectedRoute>}>
      </Route>

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
