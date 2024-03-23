import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from "react-router-dom";
import axios from 'axios';
import { AiOutlineHome } from 'react-icons/ai';
import { FaTag } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { GrUserManager } from "react-icons/gr";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../Styles/style.css'

function ViewOrderDetails() {

    const navigate=useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get('orderId');
    const [orderDetails, setOrderDetails] = useState(null);
    const authrole = localStorage.getItem('authrole');
    if(authrole!='admin'){
      navigate('*')
    }


    useEffect(() => {
        const fetchOrderDetails = async () => {
          console.log('orderid : ',orderId)
          try {
            const response = await axios.get(`https://shophubbackend.onrender.com/api/order/orderdetails/${orderId}`);
            setOrderDetails(response.data);
          } catch (error) {
            console.error('Error fetching order details:', error);
          }
        };

        fetchOrderDetails();
    }, [orderId]);

    const logout = () => {
        localStorage.removeItem('authid')
        navigate('/')
      };

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };
      
  return (
    <div className='admin-home'>
        <div className='admin-nav'>
          <a href='/adminhome'>
            <img src='/logo2.png' alt='ShopHub Logo' className='admin-nav-logo' />
          </a>
          <div className='mt-3'>
            <div className='admin-option'>
              <div className='admin-option2 ms-5 d-flex' onClick={()=>{navigate('/adminhome')}}>
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
              <div className='admin-option-active ms-5' onClick={()=>{navigate('/vieworder')}}>
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
    <div style={{ width:'90%'}}>
    <h2 className="icon mt-5">&#128722; Order Details</h2>
    <div className="order-details-container">
  
  {orderDetails && (
    <div className="order-details">
      <div className="customer-info">
        <h2><span className="icon">&#128100;</span> Customer</h2>
        <p className='order-details-p mt-5'> User Name: {orderDetails.username}</p>
       <p className='order-details-p'> Address: {orderDetails.address}</p>
       <p className='order-details-p'> Contact No: {orderDetails.mobile}</p>
       <p className='order-details-p'> City: {orderDetails.city}</p>
      </div>
      <div className="product-info">
        <h2><span className="icon">&#128736;</span> Product info</h2>
       <p className='order-details-p mt-5'> Product: {orderDetails.productName}</p>
        <img src={`${orderDetails.image}`} alt="Product" className='order-img'/>
       <p className='order-details-p mt-3'> Price: {orderDetails.price}</p>
      </div>
      <div className="payment-info">
        <h2><span className="icon">&#128640;</span> Payment info</h2>
       <p className='order-details-p mt-5'> Status: {orderDetails.payementstatus}</p>
       <p className='order-details-p'> Transaction Mode: {orderDetails.transactionMode}</p>
      </div>
      <div className="order-info">
        <h2><span className="icon">&#9875;</span> Order info</h2>
       <p className='order-details-p mt-5'> Total: {orderDetails.total}</p>
       <p className='order-details-p'> Quantity: {orderDetails.quantity}</p>
       <p className='order-details-p'> Status: {orderDetails.orderstatus}</p>
       <p className='order-details-p'> Delivery Date: {formatDate(orderDetails.deliveryDate)}</p>
      </div>
    </div>
  )}
</div>

    </div>
    <ToastContainer />
  </div>
  )
}


export default ViewOrderDetails