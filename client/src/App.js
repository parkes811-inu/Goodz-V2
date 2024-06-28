import './App.css';
import {BrowserRouter, Route, Routes, Router} from 'react-router-dom'
import Home from './pages/Home';
import BrandListPage from './pages/admin/BrandListPage';
import LoginPage from './pages/user/LoginPage';
import Index from './pages/admin/Index';
import LoginContextProvider from './contexts/LoginContextProvider';
import Test from './pages/Test';

function App() {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/test" element={ <Test/> } />
          <Route path="/user/login" element={ <LoginPage /> } />
          <Route path="/admin/brands" element={<BrandListPage />} />
          <Route path="/admin" element={<Index />} />

        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  );
}

export default App;
