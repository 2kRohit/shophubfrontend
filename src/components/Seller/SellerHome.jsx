import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import CountUp from 'react-countup';
import axios from 'axios';
import { FaUsers } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';
import { FaTag } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { IoIosListBox } from "react-icons/io";
import '../Styles/style.css';
import { BsDatabaseFillAdd } from 'react-icons/bs';


function SellerHome() {

    const navigate=useNavigate()
    const sellerid = localStorage.getItem('authid')
    const authrole = localStorage.getItem('authrole');
   if(authrole!='seller'){
     navigate('*')
   }
    const logout = () => {
      localStorage.removeItem('authid')
      navigate('/')      
  }

  const [productCount, setProductCount] = useState(null);
  const [completedOrdersCount, setCompletedOrdersCount] = useState(null);
  const [newOrdersCount, setNewOrdersCount] = useState(null);
  const [shippingOrdersCount, setShippingOrdersCount] = useState(null);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get(`https://shophubbackend.onrender.com/api/products/countProducts/${sellerid}`);
        setProductCount(response.data.count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchProductCount();
  }, []);

  useEffect(() => {
    const fetchCompletedOrdersCount = async () => {
      try {
        const response = await axios.get(`https://shophubbackend.onrender.com/api/order/countCompletedOrders/${sellerid}`);
        setCompletedOrdersCount(response.data.count);
      } catch (error) {
        console.error('Error fetching completed orders count:', error);
      }
    };

    fetchCompletedOrdersCount();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newOrdersResponse = await axios.get(`https://shophubbackend.onrender.com/api/order/neworders/${sellerid}`);
        setNewOrdersCount(newOrdersResponse.data.count);

        const shippingOrdersResponse = await axios.get(`https://shophubbackend.onrender.com/api/order/Shipping/${sellerid}`);
        setShippingOrdersCount(shippingOrdersResponse.data.count);
      } catch (error) {
        console.error('Error fetching order counts:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <div className='admin-home'>
        <div className='admin-nav'>
          <a href='/sellerhome'>
            <img src='/logo2.png' alt='ShopHub Logo' className='admin-nav-logo' />
          </a>
          <div className='mt-3'>
            <div className='admin-option'>
              <div className='admin-option-active ms-5 d-flex' onClick={()=>{navigate('/sellerhome')}}>
                <p className='option-p mt-3'>
                  <AiOutlineHome style={{fontSize:'25'}} className='me-3'/>HOME
                </p>
              </div>
            </div>
            <div className='admin-option'>
              <div className='admin-option2 ms-5' onClick={() => { navigate('/addproduct') }}>
                <p className='option-p mt-3'>
                  <BsDatabaseFillAdd style={{ fontSize: '15' }} className='me-3' />ADD PRODUCT
                </p>
              </div>
            </div>
            <div className='admin-option'>
              <div className='admin-option2 ms-5 d-flex' onClick={()=>{navigate('/updateorder')}}>
                <p className='option-p mt-3'>
                  <IoIosListBox style={{fontSize: '25'}} className='me-3'/>UPDATE ORDER
                </p>
              </div>
            </div>
            <div className='admin-option'>
              <div className='admin-option3 ms-5' onClick={()=>{navigate('/productmanagement')}}>
                <p className='option-p mt-3'>
                  <FaTag style={{fontSize: '15'}} className='me-3'/>MANAGE PRODUCT
                </p>
              </div>
            </div>
            <div className='admin-option'>
              <div className='admin-option4 ms-5' onClick={()=>{navigate('/orderview')}}>
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
              <FaShoppingCart className="count-icon" />Completed Orders
            </h2>
            <div className="count-value-container">
              <CountUp start={0} end={completedOrdersCount} duration={2} separator="," className="count-value" />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-sm-4 col-md-6 count-info-col">
      <div className="count-info card-container">            
            <h2 className="count-title">
              <FaUsers className="count-icon" />Products
            </h2>
            <div className="count-value-container">
              <CountUp start={0} end={productCount} duration={2} separator="," className="count-value" />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
    <div className="col-lg-6 col-sm-4 col-md-6">
      <div className="count-info card-container">            
      <h2 className="count-title">
              <FaUsers className="count-icon" />New Order
            </h2>
            <div className="count-value-container">
              <CountUp start={0} end={newOrdersCount} duration={2} separator="," className="count-value" />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-sm-4 col-md-6 count-info-col">
      <div className="count-info card-container">            
      <h2 className="count-title">
              <FaUsers className="count-icon" />Shipping
            </h2>
            <div className="count-value-container">
              <CountUp start={0} end={shippingOrdersCount} duration={2} separator="," className="count-value" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
  )
}

export default SellerHome