import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { FaTag } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { GrUserManager } from "react-icons/gr";
import { FaShoppingCart, FaStore } from 'react-icons/fa';
import CountUp from 'react-countup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/style.css';

function AdminHome() {

  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(null);
  const authrole = localStorage.getItem('authrole');
  if(authrole!='admin'){
    navigate('*')
  }
  else{
    toast.success("Welcome back Admin!");
  }
  const [sellerCount, setSellerCount] = useState(null);
  const [completedOrdersCount, setCompletedOrdersCount] = useState(0);
  const [completedOrdersCountLastWeek, setCompletedOrdersCountLastWeek] = useState(0);


  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('https://shophubbackend.onrender.com/api/user/countUsers');
        setUserCount(response.data.count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchUserCount();
  }, []);

  useEffect(() => {
    const fetchSellerCount = async () => {
      try {
        const response = await axios.get('https://shophubbackend.onrender.com/api/user/countSeller');
        setSellerCount(response.data.count);
      } catch (error) {
        console.error('Error fetching seller count:', error);
      }
    };

    fetchSellerCount();
  }, []);

  useEffect(() => {
    const fetchCompletedOrdersCount = async () => {
      try {
        const response = await axios.get('https://shophubbackend.onrender.com/api/order/countCompletedOrders');
        setCompletedOrdersCount(response.data.count);
      } catch (error) {
        console.error('Error fetching completed orders count:', error);
      }
    };

    fetchCompletedOrdersCount();
  }, []);

  useEffect(() => {
    const fetchCompletedOrdersCountLastWeek = async () => {
      try {
        const response = await axios.get('https://shophubbackend.onrender.com/api/order/countOrdersLastWeek');
        setCompletedOrdersCountLastWeek(response.data.count);
      } catch (error) {
        console.error('Error fetching completed orders count last week:', error);
      }
    };

    fetchCompletedOrdersCountLastWeek();
  }, []);

  const logout = () => {
    localStorage.removeItem('authid')
    navigate('/')
  }


  return (
    <div className='parent-container d-flex'>
      <div className='admin-home' style={{ height: '100vh'}}>
        <div className='admin-nav'>
          <a href='/adminhome'>
            <img src='/logo2.png' alt='ShopHub Logo' className='admin-nav-logo' />
          </a>
          <div className='mt-3'>
            <div className='admin-option'>
              <div className='admin-option-active ms-5 d-flex' onClick={()=>{navigate('/adminhome')}}>
                <p className='option-p mt-3'>
                  <AiOutlineHome style={{fontSize:'25'}} className='me-3'/>HOME
                </p>
              </div>
            </div>
            <div className='admin-option'>
              <div className='admin-option2 ms-5 d-flex' onClick={()=>{navigate('/manageuser')}}>
                <p className='option-p mt-3'>
                  <FaUsers style={{fontSize: '25'}} className='me-3'/>MANAGE USER
                </p>
              </div>
            </div>
            <div className='admin-option'>
              <div className='admin-option2 ms-5 d-flex' onClick={()=>{navigate('/manageseller')}}>
                <p className='option-p mt-3'>
                  <GrUserManager style={{fontSize: '25'}} className='me-3'/>MANAGE SELLER
                </p>
              </div>
            </div>
            <div className='admin-option'>
              <div className='admin-option3 ms-5' onClick={()=>{navigate('/manageproduct')}}>
                <p className='option-p mt-3'>
                  <FaTag style={{fontSize: '15'}} className='me-3'/>MANAGE PRODUCT
                </p>
              </div>
            </div>
            <div className='admin-option'>
              <div className='admin-option4 ms-5' onClick={()=>{navigate('/vieworder')}}>
                <p className='option-p mt-3'>
                  <FaEye style={{fontSize: '25'}} className='me-3'/>VIEW ORDER
                </p>
              </div>
            </div>
            <div className='admin-option'>
              <div className='admin-option5 ms-5' onClick={logout}>
                <p className='option-p mt-3'>
                  <BiLogOut style={{fontSize: '25'}} className='me-3'/>LOGOUT
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="admin-responsive">
        <div className="container" style={{backgroundColor:'transparent'}}>
  <div className="row count-info-row">
    <div className="col-lg-6 col-sm-4 col-md-6">
      <div className="count-info card-container">
        <h2 className="count-title">
          <FaShoppingCart className="count-icon" />Finished Orders
        </h2>
        <div className="count-value-container">
          <CountUp start={0} end={completedOrdersCount} duration={2} separator="," className="count-value" />
        </div>
      </div>
    </div>
    <div className="col-lg-6 col-sm-4 col-md-6 count-info-col">
      <div className="count-info card-container">
        <h2 className="count-title">
          <FaShoppingCart className="count-icon" />Recent Orders
        </h2>
        <div className="count-value-container">
          <CountUp start={0} end={completedOrdersCountLastWeek} duration={2} separator="," className="count-value" />
        </div>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-lg-6 col-sm-4 col-md-6">
      <div className="count-info card-container">
        <h2 className="count-title">
          <FaStore className="count-icon" />Sellers
        </h2>
        <div className="count-value-container">
          <CountUp start={0} end={sellerCount} duration={2} separator="," className="count-value" />
        </div>
      </div>
    </div>
    <div className="col-lg-6 col-sm-4 col-md-6 count-info-col">
      <div className="count-info card-container">
        <h2 className="count-title">
          <FaUsers className="count-icon" />Users
        </h2>
        <div className="count-value-container">
          <CountUp start={0} end={userCount} duration={2} separator="," className="count-value" />
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>
    </div>
  );
}

export default AdminHome;