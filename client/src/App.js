import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import LoginPage from './pages/user/LoginPage';
import LoginContextProvider from './contexts/LoginContextProvider';

function App() {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/user/login" element={ <LoginPage /> } />
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  );
}

export default App;
