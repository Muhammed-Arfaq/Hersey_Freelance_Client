import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllGigs from './Client/AllGigs/AllGigs';
import Login from './Client/Auth/Login/Login';
import Signup from './Client/Auth/Signup/Signup';
import UserOtp from './Client/Auth/Signup/UserOtp';
import Chat from './Client/Chat/Chat';
import Home from './Client/Home/Home';
import PageNotFound from './Client/PageNotFound/PageNotFound';
import Profile from './Client/Profile/Profile';
import SingleGig from './Client/SingleGig/SingleGig';
import VendorDetails from './Client/VendorDetails/VendorDetails';
import ProtectedRoutes from './protectedRoutes';
import ReRoute from './reRoute';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<ReRoute><Login /></ReRoute>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/userOtp' element={<UserOtp />} />
          <Route path='/allGigs' element={<AllGigs />} />
          <Route path='/singleGig' element={<ProtectedRoutes><SingleGig /></ProtectedRoutes>} />
          <Route path='/vendorDetails' element={<ProtectedRoutes><VendorDetails /></ProtectedRoutes>} />
          <Route path='/chat' element={<ProtectedRoutes><Chat /></ProtectedRoutes>} />
          <Route path='/profile' element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
          <Route path='*' element={<PageNotFound/>}/> 
        </Routes>
      </Router>
    </div>
  )
}

export default App
