import  React, { useState , useEffect} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

import { FaRegAddressCard } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { BsBox } from 'react-icons/bs';
import { MdOutlineSell } from 'react-icons/md';
import { FaPowerOff } from 'react-icons/fa';

import UserNavbar from './Navbar/UserNavbar';
import MiniNavBar from './Navbar/MiniNavBar';
import MiniNavbarFooter from './Navbar/MiniNavbarFooter';

import DarkMode from '../DarkMode';


export default function Profile() {

    const authid= localStorage.getItem('authid');
    const authrole = localStorage.getItem('authrole');
    const isMobile = useMediaQuery({ query: '(max-width: 980px)' });
    const [userName, setUserName] = useState('');
    const [mailid, setMailId] = useState('');
    const navigate=useNavigate()
    
    if(authrole!='user'){
      navigate('*')
    }

  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);
  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };

  const logout = () => {
    console.log("button clicked")
    setShowLogoutOverlay(true); 
  }

    

    /*const handleChange = (e) => {
      const { name, value, type } = e.target;
      setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      if (formData.mobile1===formData.mobile2){
        alert("use different mobile number as secondary")
        }
      else{
        console.log(formData)
        await axios.post('https://shophubbackend.onrender.com/api/profile/profile', formData);
        setFormData({ name: '', mobile1: '', pincode: '', place: '', address: '', city: '',state: '',landmark: '',mobile2: '' });
        alert(" successfully")
      }
    }
     catch{
      alert("can't insert address")
    }

    };*/

  useEffect(() => {
        const fetchUserName = async () => {
          try {
            console.log("user id : ",localStorage.getItem('authid'))
            const res = await axios.get(`https://shophubbackend.onrender.com/api/user/getdetail/${localStorage.getItem('authid')}`);
            const userData = res.data;
            console.log("data : ",userData)
            if (userData && userData.name) {
              setUserName(userData.name);
              setMailId(userData.email)
            }
          } catch (error) {
            console.error('Error fetching user:', error);
          }
        };
    
        fetchUserName();
      }, []);

      const handleLogoutOrder = () => {
        localStorage.removeItem('authid')
        navigate('/')
      };
    
  return (
    <div>
        <div>
          {isMobile ? <MiniNavBar /> : <UserNavbar />} 
        </div>
        <div className='profile-div' style={{minHeight:'100vh'}}>
            <div className='container'>
                <div className='d-flex justify-content-between'>
                  <div className='mt-5'>
                    <div className='d-flex'>
                      <p className='h2 profile-acc'>Account</p>
                      <DarkMode/>
                    </div>
                    <div className='d-flex justify-content-between'>
                      <div className='mt-2 col-lg-9'>
                        <p className='h4 text-left '> {userName} , {mailid} </p>
                      </div>
                      <div className='button-logout-container col-lg-3 d-flex justify-content-end align-items-right'>
                          <button className='align-items-center button-logout' onClick={handleLogoutOrder}>
                            <FaPowerOff/> Logout
                          </button>
                        </div>
                    </div>  
                  </div>
                </div>
                <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-lg-5 mt-5 profile-box'>
          <Link to="/shippingaddress" className='box-link'>
            <div className='box'>
              <FaRegAddressCard size={35} />
              <br />
              <p className='box-title'>Shipping Address</p>
              <p className='box-description'>Where should we send your orders? Keep your address updated for accurate deliveries.</p>
            </div>
          </Link>
        </div>

        <div className='col-lg-5 mt-5 profile-box'>
          <Link to="/cart" className='box-link'>
            <div className='box'>
              <FaRegAddressCard size={35} />
              <br />
              <p className='box-title'>Cart</p>
              <p className='box-description'>View and manage items in your shopping cart.</p>
            </div>
          </Link>
        </div>

        {/* <div className='col-lg-3 ms-5 mt-5 profile-box'>
          <Link to="/LoginAndSecurity" className='box-link'>
            <div className='box'>
              <MdSecurity size={35} className='box-icon'/>
              <br />
              <p className='box-title'>Login & Security</p>
              <p className='box-description'>Update your password and secure your account.</p>
            </div>
          </Link>
        </div> */}
      </div>

      <div className='row mt-5 justify-content-center'>
        <div className='col-lg-5 mt-5 profile-box'>
          <Link to="/order" className='box-link'>
            <div className='box'>
              <BsBox size={35} />
              <br />
              <p className='box-title'>Orders</p>
              <p className='box-description'>Track your purchase history and view order details.</p>
            </div>
          </Link>
        </div>

        <div className='col-lg-5 mt-5 profile-box'>
          <Link to="/wishlists" className='box-link'>
            <div className='box'>
              <MdOutlineSell size={35} />
              <br />
              <p className='box-title'>Wishlist</p>
              <p className='box-description'>Keep track of products you want to buy later.</p>
            </div>
          </Link>
        </div>

        {/* <div className='col-lg-3 ms-5 mt-5 profile-box'>
          <Link to='/ContactUs' className='box-link'>
            <div className='box'>
              <MdOutlineConnectWithoutContact size={35} />
              <br />
              <p className='box-title'>Contact Us</p>
              <p className='box-description'>Get in touch with our team.</p>
            </div>
          </Link>
        </div> */}
      </div>
    </div>

                <div>
                  
                </div>  
            </div>
            
          </div>
          <div>
        {isMobile && <MiniNavbarFooter />}      
      </div>
    </div>
  );
};
