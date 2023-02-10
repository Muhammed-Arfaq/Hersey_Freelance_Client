import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Home from './Client/Home/Home';

function ProtectedRoutes() {

    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
      const token = document.cookie
      console.log(token);
      axios.post('http://localhost:3500/protect', {
        token: token
      }).then((response) => {
        setIsLogin(response.data.user)
      })
    }, [])
  return (
    isLogin ? <Outlet/> : <Home/>
  )
}

export default ProtectedRoutes