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
import SingUp from './pages/user/SingUp';
import SingUp2 from './pages/user/SingUp2';
import LoginContextProvider, { LoginContext } from './contexts/LoginContextProvider';
import { useContext } from 'react';
import BrandListPage from './pages/admin/BrandListPage';
import ProductListPage from './pages/admin/ProductListPage';
import PayPage from './pages/admin/PayPage';
import PurchasePage from './pages/admin/PurchasePage';
import BrandInsertPage from './pages/admin/BrandInsertPage';
import OAuth2RedirectHandler from './components/user/OAuth2RedirectHandler';
import MyPage from './pages/user/MyPage';
import Purchase from './pages/user/Purchase';
import Sales from './pages/user/Sales';
import Wishlist_Products from './pages/user/Wishlist_Products';
import Wishlist_Posts from './pages/user/Wishlist_Posts';
import Manage_Info from './pages/user/Manage_Info';
import Address from './pages/user/Address';
import Account from './pages/user/Account';
import ProfilePage from './pages/post/ProfilePage';
import FindId from './pages/user/FindId';
import FindPW from './pages/user/FindPW';
import ChangePW from './pages/user/changePW';
import Add_address from './pages/user/Add_address';
import ProductInsertPage from './pages/admin/ProductInsertPage';
import Insert from './pages/post/Insert';
import ProductContextProvider from './contexts/product/ProductContextProvider';
import ProductDetailPage from './pages/product/ProductDetailPage';
import ProductDetailContextProvider from './contexts/product/ProductDetailContextProvider';
import PurchaseDetailPage from './pages/admin/PurchaseDetailPage';
import BuyPage from './pages/pay/BuyPage';


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
      <Route path="/users/signup" element={<SingUp />} />
      <Route path="/users/signup2" element={<SingUp2 />} />
      <Route path="/users/findID" element={<FindId/>} />
      <Route path="/users/findPW" element={<FindPW/>} />
      <Route path="/users/ChangePW" element={<ChangePW/>} />
      

      {/* 헤더 접근 링크 */}
      <Route path="/product/top" element={
        <ProductContextProvider endpoint="/product/top">
          <Top />
        </ProductContextProvider>
      } />
      <Route path="/product/pants" element={
        <ProductContextProvider endpoint="/product/pants">
          <Pants />
        </ProductContextProvider>
      } />
      <Route path="/product/shoes" element={
        <ProductContextProvider endpoint="/product/shoes">
          <Shoes />
        </ProductContextProvider>
      } />
      <Route path="/product/accessory" element={
        <ProductContextProvider endpoint="/product/accessory">
          <Accessory />
        </ProductContextProvider>
      } />
      <Route path="/styles" element={<AllPosts />} />
      <Route path="/product" element={
        <ProductContextProvider endpoint="/product/shop">
          <AllProduct />
        </ProductContextProvider>
      } />
      <Route path="/product/detail/:pNo" element={
        <ProductDetailContextProvider endpoint="/product/detail/:pNo">
          <ProductDetailPage />
        </ProductDetailContextProvider>
      } />
      {/* 어드민만 접근 가능한 곳 */}
      <Route path="/admin" element={
        // <ProtectedRoute requiredRole="admin">
          <AdminIndex />
        // </ProtectedRoute>
      } />
      <Route path="/admin/brands" element={
        // <ProtectedRoute requiredRole="admin">
          <BrandListPage />
        // </ProtectedRoute>
      } />
      <Route path="/admin/products" element={
        // <ProtectedRoute requiredRole="admin">
          <ProductListPage />
        // </ProtectedRoute>
      } />
      <Route path="/admin/pay_history" element={
        // <ProtectedRoute requiredRole="admin">
          <PayPage />
        // </ProtectedRoute>
      } />
      <Route path="/admin/purchase_state" element={
        // <ProtectedRoute requiredRole="admin">
          <PurchasePage />
        // </ProtectedRoute>
      } />
      <Route path="/admin/add_brand" element={
        // <ProtectedRoute requiredRole="admin">
          <BrandInsertPage />
        // </ProtectedRoute>
      } />
      <Route path="/admin/add_product" element={
        // <ProtectedRoute requiredRole="admin"?> 
          <ProductInsertPage />
        // </ProtectedRoute>
      } />

    <Route path="/admin/purchase/:saleNo" element={
        // <ProtectedRoute requiredRole="admin">
          <PurchaseDetailPage />
        // </ProtectedRoute>
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
              <Wishlist_Posts />
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

        <Route path="/users/add_address" element={
          // <ProtectedRoute requiredRole="user">
              <Add_address/>
          // </ProtectedRoute>
        }/>

        <Route path="/pay/buy" element={
          // <ProtectedRoute requiredRole="user">
              <BuyPage />
          // </ProtectedRoute>
        }/>


      {/* 다른 보호된 라우트들을 여기에 추가할 수 있습니다 */}
      <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

      {/* styles */}
      <Route path="/styles/:postNo" element={<Read />} />
      <Route path='/styles/user/:nickname' element={<ProfilePage />}/>
      <Route path='/styles/insert' element={<Insert />} />
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
