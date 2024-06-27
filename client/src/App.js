import './App.css';
import {BrowserRouter, Route, Routes, Router} from 'react-router-dom'
import Home from './pages/Home';
import BrandListPage from './pages/admin/BrandListPage';
import LoginPage from './pages/user/LoginPage';
import LoginContextProvider from './contexts/LoginContextProvider';

function App() {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/user/login" element={ <LoginPage /> } />
          <Route path="/admin/brands" element={<BrandListPage />} />
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  );
}

export default App;
