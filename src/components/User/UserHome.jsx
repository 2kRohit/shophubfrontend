import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import UserNavbar from './Navbar/UserNavbar';
import MiniNavBar from './Navbar/MiniNavBar';
import NavbarCategory from './Navbar/NavbarCategory';
import MiniNavbarFooter from './Navbar/MiniNavbarFooter';
import UserHomeBody from './UserHomeBody';

function UserHome() {
  //const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const navigate= useNavigate();
  const authrole = localStorage.getItem('authrole');
    if(authrole!='user'){
      navigate('*')
    }
  const isMobile = useMediaQuery({ query: '(max-width: 980px)' });
  return (
    <div>
      <div>
        {isMobile ? <MiniNavBar /> : <UserNavbar />}
      </div>
      <div>
        <NavbarCategory/>
      </div>
      <div>
        <UserHomeBody />
      </div>
      <div>
        {isMobile && <MiniNavbarFooter />}      
      </div>
    </div>
  );
}

export default UserHome;
