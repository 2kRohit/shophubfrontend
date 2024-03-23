import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FaSearch } from 'react-icons/fa';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import { FaShoppingCart } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';

function Navbar2() {

    const [userName, setUserName] = useState('');
  const [searchData, setSearchData] = useState('');

  useEffect(() => {
    const authid= localStorage.getItem('authid')
    if(!authid){
      navigate('/login')
    }
  },[])

    const logout = () => {
      localStorage.removeItem('authid')
      navigate('/')
    }
    const navigate=useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

      const freshProduct = () => {
        const productType = 'fresh';
        navigate(`/productype?productType=${productType}`);
      };
    
      const usedProduct = () => {
        const productType = 'used';
        navigate(`/productype?productType=${productType}`);
      };

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

      const searchProduct =  () => {
        navigate(`/SearchPro?searchdata=${searchData}`);
      }

      const profile = async () => {
        try {
          const response = await axios.get(`https://shophubbackend.onrender.com/api/user/getTrade/${localStorage.getItem('authid')}`);
          
          if (!response.data) {
            console.error('Empty response from server');
            return;
          }
          
          const userData = response.data.trade;
          
          if (userData === 'buy') {
            navigate('/BuyProfile');
          } else if (userData === 'both') {
            navigate('/Profile');
          } else {
            navigate('/UserHome');
          }
        } catch (error) {
          console.error('Error fetching user trade:', error);
        }
      }

  return (
    <div>
        <Navbar bg="light" expand="lg">
    <div className="container">
      <Navbar.Brand as={Link} to="/" style={{ fontWeight: 'bold', fontSize: '30px' }}>
        ShopHub
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="ml-auto">
          <Nav.Link onClick={freshProduct}>Fresh</Nav.Link>
          <Nav.Link onClick={usedProduct}>Refurbished</Nav.Link>
          <Nav.Link onClick={() => navigate('/UserHome')}>Both</Nav.Link>
          <Form inline className="search-bar">
            <FormControl
              type="text"
              placeholder="Search your products"
              className="mr-sm-2 navtext"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
            <Button variant="outline-success" className="navbutton" onClick={searchProduct}>
              <FaSearch />
            </Button>
          </Form>
          <Nav.Link style={{ fontWeight: 'bold', fontSize: '20px' }} className='pnav' href="/Cart">
            <FaShoppingCart size={22} className='pnav-icon' /> Cart
          </Nav.Link>

          <Nav.Link style={{ paddingLeft: '25px', fontWeight: 'bold', fontSize: '20px' }} className='pnav' href="/Wishlist">
            <AiFillHeart size={24} className='pnav-icon' /> Wishlist
          </Nav.Link>

          <Nav.Link style={{ paddingLeft: '25px', fontWeight: 'bold', fontSize: '20px' }} className='pnav' onClick={profile}>
            <FaUser size={22} className='pnav-icon' /> {userName}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </div>
  </Navbar>
    </div>
  )
}

export default Navbar2