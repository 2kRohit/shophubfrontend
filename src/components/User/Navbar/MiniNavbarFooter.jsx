import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';



function MiniNavbarFooter() {
  const selectedTheme = localStorage.getItem("selectedTheme");
  const authid= localStorage.getItem('authid')
  const [userName, setUserName] = useState('');

  const navigate=useNavigate()


  useEffect(() => {
    const fetchUserName = async () => {
      try {
        console.log("user id : ",localStorage.getItem('authid'))
        const res = await axios.get(`https://shophubbackend.onrender.com/api/user/getname/${localStorage.getItem('authid')}`);
        const userData = res.data;

        if (userData && userData.username) {
          setUserName(userData.username);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserName();
  }, []);

  const profile = async () => {
          
    if (!authid) {
      navigate('/login');
    }
    
     else {
      navigate('/profile');
     }
}
  return (
    <div className='mini-navbar-footer' data-theme={selectedTheme}>
      <div className='container'>
      <div className='col-lg-4 mt-1 d-flex justify-content-center nav-profile'>    
        <a className='pnav' href="/Cart">
          <FaShoppingCart size={22} className='pnav-icon'/>  Cart</a>

        <a className='pnav' href="/Wishlists">
          <AiFillHeart size={24} className='pnav-icon'/> Wishlist
        </a>
              <a className='pnav' onClick={profile}>
                <FaUser size={22} className='pnav-icon' style={{ color: 'initial' }} /> {authid ? userName : 'Login'}
              </a>

      </div>
      </div>
      
    </div>
  )
}

export default MiniNavbarFooter