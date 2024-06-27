import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes, Router} from 'react-router-dom'
import Home from './pages/Home';
import BrandListPage from './pages/admin/BrandListPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/admin/brands" element={<BrandListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
