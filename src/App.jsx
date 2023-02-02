import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Client/Auth/Login/Login';
import Signup from './Client/Auth/Signup/Signup';
import UserOtp from './Client/Auth/Signup/UserOtp';
import Home from './Client/Home/Home';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/userOtp' element={<UserOtp />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
