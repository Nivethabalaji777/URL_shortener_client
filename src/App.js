import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import { Routes,Route } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Forget from './Pages/Forget';
import Signup from './Pages/Signup';
import Reset from './Pages/Reset';

function App() {
  return (
    <div>
    {/* <Header/> */}
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/forget' element={<Forget/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/reset/:id/:token' element={<Reset/>}/>
    </Routes>
    </div>
  );
}

export default App;
