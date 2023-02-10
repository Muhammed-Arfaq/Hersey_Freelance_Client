import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllGigs from './Client/AllGigs/AllGigs';
import Login from './Client/Auth/Login/Login';
import Signup from './Client/Auth/Signup/Signup';
import UserOtp from './Client/Auth/Signup/UserOtp';
import Home from './Client/Home/Home';
import SingleGig from './Client/SingleGig/SingleGig';
import VendorDetails from './Client/VendorDetails/VendorDetails';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/userOtp' element={<UserOtp />}/>
          <Route path='/allGigs' element={<AllGigs />}/>
          <Route path='/singleGig' element={<SingleGig />}/>
          <Route path='/vendorDetails' element={<VendorDetails />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
