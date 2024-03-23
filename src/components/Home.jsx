import React from 'react'
import './Styles/style.css'
import { useMediaQuery } from 'react-responsive';
import UserNavbar from './User/Navbar/UserNavbar';
import MiniNavBar from './User/Navbar/MiniNavBar';
import UserHomeBody from './User/UserHomeBody';
import Category from './User/Navbar/NavbarCategory';
import MiniNavbarFooter from './User/Navbar/MiniNavbarFooter';


function Home() {

  const isMobile = useMediaQuery({ query: '(max-width: 980px)' });

  return (
    <div>
      <div>
        {isMobile ? <MiniNavBar /> : <UserNavbar />} 
      </div>
      <div>
        <Category/>
      </div>
      <div>
          <UserHomeBody/>
      </div>
      <div>
        {isMobile && <MiniNavbarFooter />}      
      </div>
    </div>
  )
}

export default Home