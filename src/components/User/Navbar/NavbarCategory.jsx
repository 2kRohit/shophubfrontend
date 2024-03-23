import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FaSearch } from 'react-icons/fa';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/style.css';
import { CiMobile3 } from 'react-icons/ci';
import {MdHeadset} from 'react-icons/md' ;
import {CgSmartHomeRefrigerator} from 'react-icons/cg' ;
import {CgSmartHomeWashMachine} from 'react-icons/cg' ;
import {FiWatch} from 'react-icons/fi' ;
import {AiOutlineLaptop} from 'react-icons/ai';
import {MdSportsSoccer} from 'react-icons/md' ;

function NavbarCategory() {

    const selectedTheme = localStorage.getItem("selectedTheme");
  const authid= localStorage.getItem('authid')
  const [userName, setUserName] = useState('');
  const [searchData, setSearchData] = useState('');
  const [isInputClicked, setIsInputClicked] = useState(false);


  // useEffect(() => {
  //   if(!authid){
  //     navigate('/login')
  //   }
  // },[])

  const handleInputClick = () => {
    setIsInputClicked(true);
  };

  const handleInputBlur = () => {
    setIsInputClicked(false);
  };

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
          
          if (!authid) {
            navigate('/login');
          }
          
           else {
            navigate('/profile');
           }
      }

  return (
    <div className='nav-bar-lg' data-theme={selectedTheme}>
<div className='container' >
<div className='d-flex align-items-center overflow-auto navbar-category' style={{ borderBottom: '1px solid rgb(214, 206, 206)!important' }}>
    <div style={{ paddingLeft: '25px' }}>
      <a onClick={() => { navigate(`/category?category=${'mobile'}`); }} className='homeicon'>
        <CiMobile3 size={28} />
        <br></br>
        <span>Mobile</span>
      </a>
    </div>
          <a onClick={()=>{navigate(`/category?category=${'headset'}`)}} children="nav-item" className='homeicon2'>
            <MdHeadset size={28}/>
            <br></br>
            <span>Headphone</span>
          </a>    
          <a onClick={()=>{navigate(`/category?category=${'refridgerator'}`)}} className='homeicon2'>
            <CgSmartHomeRefrigerator size={28}/>
            <br></br>
            <span>Refridgerator</span>
          </a>

          <a onClick={()=>{navigate(`/category?category=${'washing machine'}`)}} className='homeicon2'>
            <CgSmartHomeWashMachine size={28}/>
            <br></br>
            <span>Washing machine</span>
          </a>

          <a onClick={()=>{navigate(`/category?category=${'watches'}`)}} className='homeicon2'>
            <FiWatch size={28}/>
            <br></br>
            <span>Watches</span>
          </a>

          <a onClick={()=>{navigate(`/category?category=${'computer'}`)}} className='homeicon2'>
            <AiOutlineLaptop size={28}/>
            <br></br>
            <span>Computer</span>
          </a>

          <a onClick={()=>{navigate(`/category?category=${'tv'}`)}} className='homeicon2'>
            <AiOutlineLaptop size={28}/>
            <br></br>
            <span>Television</span>
          </a>

          <a onClick={()=>{navigate(`/category?category=${'sports'}`)}} className='homeicon2'>
            <MdSportsSoccer size={28}/>
            <br></br>
            <span className="text">Sports</span>
          </a>

          </div>
        </div>
    </div>
  )
}

export default NavbarCategory